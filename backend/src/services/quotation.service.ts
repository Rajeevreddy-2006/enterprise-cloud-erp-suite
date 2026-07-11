// import crypto from "crypto";

// import quotationRepository from "../repositories/quotation.repository";
// import customerRepository from "../repositories/customer.repository";
// import opportunityRepository from "../repositories/opportunity.repository";
// import tenantRepository from "../repositories/tenant.repository";

// import notificationService from "./notification.service";

// import { safeSendEmail } from "../utils/safeEmail";

// import AppError from "../utils/AppError";

// import {
//     CreateQuotationDto,
//     UpdateQuotationDto,
// } from "../types/quotation.types";

// class QuotationService {

//     async getAllQuotations(
//         tenantId: string
//     ) {
//         return quotationRepository.getAllQuotations(
//             tenantId
//         );
//     }

//     async getQuotationById(
//         id: string,
//         tenantId: string
//     ) {

//         const quotation =
//             await quotationRepository.getQuotationById(
//                 id,
//                 tenantId
//             );

//         if (!quotation) {
//             throw new AppError(
//                 "Quotation not found",
//                 404
//             );
//         }

//         return quotation;
//     }

//     async createQuotation(
//         data: CreateQuotationDto
//     ) {

//         const customer =
//             await customerRepository.getCustomerById(
//                 data.customerId
//             );

//         if (!customer) {
//             throw new AppError(
//                 "Customer not found",
//                 404
//             );
//         }

//         if (data.opportunityId) {

//             const opportunity =
//                 await opportunityRepository.getOpportunityById(
//                     data.opportunityId
//                 );

//             if (!opportunity) {
//                 throw new AppError(
//                     "Opportunity not found",
//                     404
//                 );
//             }

//         }

//         if (data.validUntil <= new Date()) {
//             throw new AppError(
//                 "Valid Until must be a future date",
//                 400
//             );
//         }

//         return quotationRepository.createQuotation(
//             data
//         );
//     }

//     async updateQuotation(
//         id: string,
//         tenantId: string,
//         data: UpdateQuotationDto
//     ) {

//         await this.getQuotationById(
//             id,
//             tenantId
//         );

//         return quotationRepository.updateQuotation(
//             id,
//             tenantId,
//             data
//         );
//     }

//     async deleteQuotation(
//         id: string,
//         tenantId: string
//     ) {

//         await this.getQuotationById(
//             id,
//             tenantId
//         );

//         return quotationRepository.deleteQuotation(
//             id,
//             tenantId
//         );
//     }

//     // =====================================================
//     // SEND QUOTATION EMAIL
//     // =====================================================

//     async sendQuotation(
//         id: string,
//         tenantId: string
//     ) {

//         const quotation =
//             await this.getQuotationById(
//                 id,
//                 tenantId
//             );

//         if (quotation.status !== "DRAFT") {
//             throw new AppError(
//                 "Only draft quotations can be sent",
//                 400
//             );
//         }

//         if (quotation.validUntil < new Date()) {
//             throw new AppError(
//                 "Quotation has expired",
//                 400
//             );
//         }

//         const tenant =
//             await tenantRepository.getTenantById(
//                 tenantId
//             );

//         if (!tenant) {
//             throw new AppError(
//                 "Tenant not found",
//                 404
//             );
//         }

//         const token =
//             crypto.randomBytes(32).toString("hex");

//         await quotationRepository.sendQuotation(
//             quotation.id,
//             token
//         );

//         const quotationLink =
//             `${process.env.FRONTEND_URL}/quotation/review/${token}`;

//         await safeSendEmail(
//             quotation.customer.email!,
//             `Quotation from ${tenant.name}`,
//             `
//             <h2>${tenant.name}</h2>

//             <p>Hello ${quotation.customer.name},</p>

//             <p>
//                 We have prepared a quotation for you.
//             </p>

//             <p>
//                 <strong>Quotation Number:</strong>
//                 ${quotation.quotationNumber}
//             </p>

//             <p>
//                 <strong>Amount:</strong>
//                 ₹${quotation.amount}
//             </p>

//             <p>
//                 <strong>Valid Until:</strong>
//                 ${quotation.validUntil.toDateString()}
//             </p>

//             <p>
//                 Click below to review your quotation.
//             </p>

//             <a href="${quotationLink}">
//                 Review Quotation
//             </a>

//             <br><br>

//             <p>
//                 Regards,<br/>
//                 ${tenant.name}
//             </p>
//             `
//         );

//         await notificationService.createNotification({
//             title: "Quotation Sent",
//             message: `Quotation ${quotation.quotationNumber} has been emailed to ${quotation.customer.name}.`,
//             tenantId,
//         });

//         return {
//             message: "Quotation sent successfully",
//         };
//     }

//     async reviewQuotation(token: string) {

//         const quotation =
//             await quotationRepository.reviewQuotation(token);

//         if (!quotation) {
//             throw new AppError("Invalid quotation link", 404);
//         }

//         if (quotation.status !== "SENT") {
//             throw new AppError(
//                 "Quotation has already been processed",
//                 400
//             );
//         }

//         if (quotation.validUntil < new Date()) {

//             await quotationRepository.expireQuotation(
//                 quotation.id
//             );

//             throw new AppError(
//                 "Quotation has expired",
//                 400
//             );
//         }

//         return quotation;
//     }

//     async acceptQuotation(token: string) {

//         const quotation =
//             await this.reviewQuotation(token);

//         const updated =
//             await quotationRepository.acceptQuotation(token);

//         await notificationService.createNotification({
//             title: "Quotation Accepted",
//             message: `${quotation.customer.name} accepted quotation ${quotation.quotationNumber}.`,
//             tenantId: quotation.tenantId,
//         });

//         return updated;
//     }

//     async rejectQuotation(token: string) {

//         const quotation =
//             await this.reviewQuotation(token);

//         const updated =
//             await quotationRepository.rejectQuotation(token);

//         await notificationService.createNotification({
//             title: "Quotation Rejected",
//             message: `${quotation.customer.name} rejected quotation ${quotation.quotationNumber}.`,
//             tenantId: quotation.tenantId,
//         });

//         return updated;
//     }

// }

// export default new QuotationService();
import crypto from "crypto";

import quotationRepository from "../repositories/quotation.repository";
import customerRepository from "../repositories/customer.repository";
import tenantRepository from "../repositories/tenant.repository";

import notificationService from "./notification.service";

import { safeSendEmail } from "../utils/safeEmail";

import AppError from "../utils/AppError";

import {
    CreateQuotationDto,
    UpdateQuotationDto,
} from "../types/quotation.types";

class QuotationService {

    async getAllQuotations(
        tenantId: string
    ) {
        return quotationRepository.getAllQuotations(
            tenantId
        );
    }

    async getQuotationById(
        id: string,
        tenantId: string
    ) {

        const quotation =
            await quotationRepository.getQuotationById(
                id,
                tenantId
            );

        if (!quotation) {
            throw new AppError(
                "Quotation not found",
                404
            );
        }

        return quotation;
    }

    async createQuotation(
        data: CreateQuotationDto
    ) {

        const customer =
            await customerRepository.getCustomerById(
                data.customerId
            );

        if (!customer) {
            throw new AppError(
                "Customer not found",
                404
            );
        }

        if (data.validUntil <= new Date()) {
            throw new AppError(
                "Valid Until must be a future date",
                400
            );
        }

        return quotationRepository.createQuotation(
            data
        );
    }

    async updateQuotation(
        id: string,
        tenantId: string,
        data: UpdateQuotationDto
    ) {

        await this.getQuotationById(
            id,
            tenantId
        );

        return quotationRepository.updateQuotation(
            id,
            tenantId,
            data
        );
    }

    async deleteQuotation(
        id: string,
        tenantId: string
    ) {

        await this.getQuotationById(
            id,
            tenantId
        );

        return quotationRepository.deleteQuotation(
            id,
            tenantId
        );
    }

    // =====================================================
    // SEND QUOTATION
    // =====================================================

    async sendQuotation(
        id: string,
        tenantId: string
    ) {

        const quotation =
            await this.getQuotationById(
                id,
                tenantId
            );

        if (quotation.status !== "DRAFT") {
            throw new AppError(
                "Only draft quotations can be sent",
                400
            );
        }

        if (quotation.validUntil < new Date()) {
            throw new AppError(
                "Quotation has expired",
                400
            );
        }

        const tenant =
            await tenantRepository.getTenantById(
                tenantId
            );

        if (!tenant) {
            throw new AppError(
                "Tenant not found",
                404
            );
        }

        const token =
            crypto.randomBytes(32).toString("hex");

        await quotationRepository.sendQuotation(
            quotation.id,
            token
        );

        const quotationLink =
            `${process.env.FRONTEND_URL}/quotation/review/${token}`;

        await safeSendEmail(
            quotation.customer.email!,
            `Quotation from ${tenant.name}`,
            `
            <div style="font-family:Arial,sans-serif;padding:20px">

                <h2>${tenant.name}</h2>

                <p>Hello <strong>${quotation.customer.name}</strong>,</p>

                <p>
                    A quotation has been prepared for you.
                    Please review it and enter the quantity you would like to purchase before accepting.
                </p>

                <table cellpadding="8" cellspacing="0">

                    <tr>
                        <td><strong>Quotation No</strong></td>
                        <td>${quotation.quotationNumber}</td>
                    </tr>

                    <tr>
                        <td><strong>Price Per Unit</strong></td>
                        <td>₹${quotation.amount}</td>
                    </tr>

                    <tr>
                        <td><strong>Quantity</strong></td>
                        <td>
                            You will enter the required quantity after opening the quotation.
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Valid Until</strong></td>
                        <td>${quotation.validUntil.toDateString()}</td>
                    </tr>

                </table>

                <br>

                <a
                    href="${quotationLink}"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:12px 24px;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Review Quotation
                </a>

                <br><br>

                <p>
                    Regards,<br/>
                    ${tenant.name}
                </p>

            </div>
            `
        );

        await notificationService.createNotification({

            title: "Quotation Sent",

            message:
                `Quotation ${quotation.quotationNumber} sent to ${quotation.customer.name}.`,

            tenantId,

        });

        return {
            message: "Quotation sent successfully",
        };
    }

    // =====================================================
    // REVIEW
    // =====================================================

    async reviewQuotation(
        token: string
    ) {

        const quotation =
            await quotationRepository.findByApprovalToken(
                token
            );

        if (!quotation) {
            throw new AppError(
                "Invalid quotation link",
                404
            );
        }

        if (quotation.status !== "SENT") {
            throw new AppError(
                "Quotation has already been processed",
                400
            );
        }

        if (quotation.validUntil < new Date()) {

            await quotationRepository.expireQuotation(
                quotation.id
            );

            throw new AppError(
                "Quotation has expired",
                400
            );
        }

        return quotation;
    }

    // =====================================================
    // ACCEPT
    // =====================================================

    async acceptQuotation(
        token: string,
        requestedQuantity: number
    ) {
        if (requestedQuantity <= 0) {
            throw new AppError(
                "Quantity must be greater than zero",
                400
            );
        }
        const quotation =
            await this.reviewQuotation(token);
        const updated =
            await quotationRepository.acceptQuotation(
                token,
                requestedQuantity
            );
        await notificationService.createNotification({
            title: "Quotation Accepted",
            message:
                `${quotation.customer.name} accepted quotation ${quotation.quotationNumber} for ${requestedQuantity} unit(s).`,
            tenantId:
                quotation.tenantId,
        });

        return updated;
    }

    // =====================================================
    // REJECT
    // =====================================================

    async rejectQuotation(
        token: string
    ) {

        const quotation =
            await this.reviewQuotation(
                token
            );

        const updated =
            await quotationRepository.rejectQuotation(
                token
            );

        await notificationService.createNotification({

            title: "Quotation Rejected",

            message:
                `${quotation.customer.name} rejected quotation ${quotation.quotationNumber}. Ordered Quantity: 0.`,

            tenantId:
                quotation.tenantId,

        });

        return updated;
    }

}

export default new QuotationService();