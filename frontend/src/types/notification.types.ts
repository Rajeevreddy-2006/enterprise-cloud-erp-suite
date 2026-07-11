export interface Notification{
    id:string;
    title:string;
    message:string;
    isRead:boolean;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
}

export interface NotificationFormData{
    title:string;
    message:string;
}