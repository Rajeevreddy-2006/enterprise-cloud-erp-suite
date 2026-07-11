export interface Supplier{
    id:string;
    name:string;
    email:string;
    phone?:string;
    address?:string;
    isActive:boolean;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
}

export interface SupplierFormData{
    name:string;
    email:string;
    phone?:string;
    address?:string;
    isActive:boolean;
}