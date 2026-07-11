export enum LeadStatus{
    NEW="NEW",
   CONTACTED="CONTACTED",
    QUALIFIED="QUALIFIED",
    LOST="LOST",
    WON="WON"
}

export interface Lead{
    id:string;
    title:string;
    status:LeadStatus;
    customerId:string;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
    customer?:{
        id:string;
        name:string;
    };
}

export interface LeadFormData{
    title:string;
    status:LeadStatus;
    customerId:string;
}