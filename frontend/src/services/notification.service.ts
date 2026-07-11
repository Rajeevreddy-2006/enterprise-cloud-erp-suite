import api from "./api";

class NotificationService {

    async getNotifications() {

        const response =
            await api.get(
                "/notifications"
            );

        return response.data.data;

    }

    async markRead(
        id: string
    ) {

        const response =
            await api.patch(
                `/notifications/${id}/read`
            );

        return response.data.data;

    }

    async markAllRead() {

        const response =
            await api.patch(
                "/notifications/read-all"
            );

        return response.data.data;

    }

    async deleteNotification(
        id: string
    ) {

        const response =
            await api.delete(
                `/notifications/${id}`
            );

        return response.data.data;

    }

}

export default new NotificationService();