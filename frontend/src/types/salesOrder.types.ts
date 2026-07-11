export enum SalesOrderStatus{
    PENDING="PENDING",
    CONFIRMED="CONFIRMED",
    COMPLETED="COMPLETED",
    CANCELLED="CANCELLED"
}

export interface SalesOrder{
    id:string;
    orderNumber:string;
    quantity:number;
    unitPrice:number;
    totalAmount:number;
    status:SalesOrderStatus;
    customerId:string;
    inventoryItemId:string;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
    customer?:{
        id:string;
        name:string;
    };
    inventoryItem?:{
        id:string;
        name:string;
    };
}

export interface SalesOrderFormData{
    orderNumber:string;
    quantity:number;
    unitPrice:number;
    totalAmount:number;
    status:SalesOrderStatus;
    customerId:string;
    inventoryItemId:string;
}