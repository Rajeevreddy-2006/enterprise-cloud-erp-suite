export interface AuditLog{
    id:string;
    action:string;
    entity:string;
    entityId:string;
    userId:string;
    tenantId:string;
    createdAt:string;
    user?:{
        id:string;
        firstName:string;
        lastName:string;
    };
}