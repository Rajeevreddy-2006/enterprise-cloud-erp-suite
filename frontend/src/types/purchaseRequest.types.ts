export type PurchaseRequestStatus =

    | "PENDING"

    | "APPROVED"

    | "REJECTED";

export interface PurchaseRequest {

    id: string;

    title: string;

    description?: string;

    quantity: number;

    status: PurchaseRequestStatus;

    requestedById: string;

    tenantId: string;

    inventoryItemId: string;

    purchaseOrderId?: string;

    requestedBy?: {

        id: string;

        name?: string;

        email: string;

    };

    inventoryItem?: {

        id: string;

        name: string;

        sku: string;

    };

    purchaseOrder?: {

        id: string;

        poNumber?: string;

    };

    createdAt: string;

    updatedAt: string;

}

export interface CreatePurchaseRequestDto {

    title: string;

    description?: string;

    quantity: number;

    inventoryItemId: string;

}

export interface UpdatePurchaseRequestDto {

    title?: string;

    description?: string;

    quantity?: number;

    inventoryItemId?: string;

}