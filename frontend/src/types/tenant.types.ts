export interface Tenant{
id:string;
name:string;
slug:string;
isActive:boolean;
createdAt:string;
updatedAt:string;
users?:number;
employees?:number;
departments?:number;
projects?:number;
customers?:number;
salesOrders?:number;
payments?:number;
invoices?:number;
inventoryItems?:number;
}