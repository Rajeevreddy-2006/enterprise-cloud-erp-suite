import crypto from "crypto";

import customerInvitationRepository from "../repositories/customerInvitation.repository";
import customerRepository from "../repositories/customer.repository";

import notificationService from "./notification.service";
import { safeSendEmail } from "../utils/safeEmail";

import AppError from "../utils/AppError";

import {
    InviteCustomerDto,
    CompleteCustomerRegistrationDto,
} from "../types/customerInvitation.types";
import tenantRepository from "../repositories/tenant.repository";

class CustomerInvitationService {

    async getAllInvitations(tenantId: string) {
        return customerInvitationRepository.getAllInvitations(tenantId);
    }

    async getInvitationById(id: string) {
        const invitation =
            await customerInvitationRepository.getInvitationById(id);

        if (!invitation) {
            throw new AppError(
                "Customer invitation not found",
                404
            );
        }

        return invitation;
    }

    async verifyInvitation(token: string) {

        const invitation =
            await customerInvitationRepository.verifyInvitation(token);

        if (!invitation) {
            throw new AppError(
                "Invalid invitation link",
                404
            );
        }

        if (invitation.status === "ACCEPTED") {
            throw new AppError(
                "Invitation already used",
                400
            );
        }

        if (invitation.expiresAt < new Date()) {
            throw new AppError(
                "Invitation has expired",
                400
            );
        }

        return {
            email: invitation.email,
            tenantId: invitation.tenantId,
        };
    }

    async completeRegistration(
        token: string,
        data: CompleteCustomerRegistrationDto
    ) {

        const invitation =
            await customerInvitationRepository.verifyInvitation(token);

        if (!invitation) {
            throw new AppError(
                "Invalid invitation",
                404
            );
        }

        if (invitation.status === "ACCEPTED") {
            throw new AppError(
                "Invitation already used",
                400
            );
        }

        if (invitation.expiresAt < new Date()) {
            throw new AppError(
                "Invitation expired",
                400
            );
        }

        const existingCustomer =
            await customerRepository.getCustomerByEmail(
                data.email
            );

        if (existingCustomer) {
            throw new AppError(
                "Customer already exists",
                400
            );
        }

        const customer =
            await customerRepository.createCustomerFromInvitation({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                tenantId: invitation.tenantId,
            });

        await customerInvitationRepository.acceptInvitation(
            token
        );

        return customer;
    }

    async inviteCustomer(data: InviteCustomerDto) {
        const tenant = await tenantRepository.getTenantById(data.tenantId);
        if (!tenant) {
            throw new AppError("Tenant not found", 404);
        }
        console.log("Incoming email:", data.email);

        const existingCustomer =
            await customerRepository.getCustomerByEmail(data.email);

        console.log("Existing customer:", existingCustomer);
        if (existingCustomer) {
            throw new AppError(
                "Customer already exists",
                400
            );
        }
        const existingInvitation =
            await customerInvitationRepository.getInvitationByEmail(
                data.email
            );
        if (
            existingInvitation &&
            existingInvitation.status === "PENDING"
        ) {
            throw new AppError(
                "Customer invitation already sent",
                400
            );
        }
        const token =
            crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(
            Date.now() + 1000 * 60 * 60 * 24
        ); // 24 Hours
        const invitation =
            await customerInvitationRepository.createInvitation({
                ...data,
                token,
                expiresAt,
            });
        const invitationLink =
            `${process.env.FRONTEND_URL}/customer/register/${token}`;
        await safeSendEmail(
            data.email,
            `Welcome to ${tenant.name}`,
            `<h2>Welcome to ${tenant.name}</h2>
                <p>Hello,</p>
                <p>
                You have been invited to join <strong>${tenant.name}</strong> as a customer on the Amdox ERP platform.
                </p>
                <p>
                Please complete your customer registration using the secure link below.
                </p>
                <p>
                <a href="${invitationLink}">
                Complete Customer Registration
                </a>
                </p>

                <p>
                This invitation is valid for <strong>24 hours</strong>.
                </p>

                <p>
                If you did not expect this invitation, you may safely ignore this email.
                </p>

                <br>

                <p>
                Regards,<br>
                ${tenant.name}
                </p>
            `
        );
        await notificationService.createNotification({
            title: "Customer Invitation Sent",
            message: data.email,
            tenantId: data.tenantId,
        });
        return invitation;
    }

    async resendInvitation(id: string, tenantId: string) {
        const tenant = await tenantRepository.getTenantById(tenantId);
        if (!tenant) {
            throw new AppError("Tenant not found", 404);
        }
        const invitation =
            await this.getInvitationById(id);
        if (invitation.status === "ACCEPTED") {
            throw new AppError(
                "Customer has already registered",
                400
            );
        }
        const token =
            crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(
            Date.now() + 1000 * 60 * 60 * 24
        );
        const updated =
            await customerInvitationRepository.resendInvitation(
                id,
                token,
                expiresAt
            );
        const invitationLink =
            `${process.env.FRONTEND_URL}/customer/register/${token}`;
        await safeSendEmail(
            invitation.email,
            `Welcome to ${tenant.name}`,
            `<h2>Welcome to ${tenant.name}</h2>
                <p>Hello,</p>
                <p>
                You have been invited to join <strong>${tenant.name}</strong> as a customer on the Amdox ERP platform.
                </p>
                <p>
                Please complete your customer registration using the secure link below.
                </p>
                <p>
                <a href="${invitationLink}">
                Complete Customer Registration
                </a>
                </p>
                <p>
                This invitation is valid for <strong>24 hours</strong>.
                </p>
                <p>
                If you did not expect this invitation, you may safely ignore this email.
                </p>
                <br>
                <p>
                Regards,<br>
                ${tenant.name}
                </p>
            `
        );
        return updated;
    }

    async deleteInvitation(id: string) {

        await this.getInvitationById(id);

        return customerInvitationRepository.deleteInvitation(id);
    }
}

export default new CustomerInvitationService();