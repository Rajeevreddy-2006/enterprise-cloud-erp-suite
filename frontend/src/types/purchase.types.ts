export type PurchaseOrderStatus =

    | "PENDING"

    | "APPROVED"

    | "RECEIVED"

    | "CANCELLED";

export interface PurchaseOrder {

    id: string;

    orderNumber: string;

    quantity: number;

    unitPrice: number;

    status: PurchaseOrderStatus;

    inventoryItemId: string;

    supplierId?: string;

    inventoryItem?: {

        id: string;

        name: string;

        sku: string;

    };

    supplier?: {

        id: string;

        name: string;

    };

    createdAt: string;

    updatedAt: string;

}

export interface CreatePurchaseOrderDto {

    quantity: number;

    unitPrice: number;

    inventoryItemId: string;

    supplierId?: string;

}

export interface UpdatePurchaseOrderDto {

    quantity?: number;

    unitPrice?: number;

    inventoryItemId?: string;

    supplierId?: string;

    status?: PurchaseOrderStatus;

}