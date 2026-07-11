export type StockMovementType =

    | "PURCHASE"

    | "GRN"

    | "SALE"

    | "ASSET_ASSIGNMENT"

    | "ADJUSTMENT";

export interface StockMovement {

    id: string;

    movementType: StockMovementType;

    quantity: number;

    remarks?: string;

    inventoryItemId: string;

    inventoryItem?: {

        id: string;

        name: string;

        sku: string;

    };

    createdAt: string;

}

export interface CreateStockMovementDto {

    movementType: StockMovementType;

    quantity: number;

    remarks?: string;

    inventoryItemId: string;

}