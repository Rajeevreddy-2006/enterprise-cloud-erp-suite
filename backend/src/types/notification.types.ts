export interface CreateNotificationDto {
  title: string;
  message: string;
  tenantId: string;
}

export interface UpdateNotificationDto {
  isRead?: boolean;
}