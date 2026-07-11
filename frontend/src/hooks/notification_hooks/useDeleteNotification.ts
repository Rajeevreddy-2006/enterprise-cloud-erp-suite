import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import notificationService from "@/services/notification.service";

export function useDeleteNotification() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            notificationService.deleteNotification,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "notifications",
                ],

            });

        },

    });

}