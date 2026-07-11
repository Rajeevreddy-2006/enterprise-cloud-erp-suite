export interface Document {
    id:string;
    name:string;
    fileUrl:string;
    category:string;
    employeeId?:string;
    uploadedById?:string;
    createdAt:string;
}

export interface CreateDocumentDto {
    name:string;
    fileUrl:string;
    category:string;
    employeeId?:string;
}