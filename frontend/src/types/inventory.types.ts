export interface Inventory{
    id:string;
    name:string;
    sku:string;
    quantity:number;
    unitPrice:number;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
}

export interface InventoryFormData{
    name:string;
    sku:string;
    quantity:number;
    unitPrice:number;
}