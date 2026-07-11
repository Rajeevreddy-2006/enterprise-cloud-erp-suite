export enum OpportunityStatus{
    OPEN="OPEN",
    WON="WON",
    LOST="LOST"
}

export interface Opportunity{
    id:string;
    title:string;
    value:number;
    status:OpportunityStatus;
    customerId:string;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
    customer?:{
        id:string;
        name:string;
    };
}

export interface OpportunityFormData{
    title:string;
    value:number;
    status:OpportunityStatus;
    customerId:string;
}