export type GRNStatus =

    | "PENDING"

    | "RECEIVED"

    | "REJECTED";

export interface GRN {

    id: string;

    grnNumber: string;

    quantityReceived: number;

    remarks?: string;

    status: GRNStatus;

    purchaseOrderId: string;

    purchaseOrder?: {

        id: string;

        orderNumber: string;

        quantity: number;

        unitPrice: number;

    };

    createdAt: string;

    updatedAt: string;

}

export interface CreateGRNDto {

    quantityReceived: number;

    remarks?: string;

    purchaseOrderId: string;

}

export interface UpdateGRNDto {

    quantityReceived?: number;

    remarks?: string;

    purchaseOrderId?: string;

    status?: GRNStatus;

}