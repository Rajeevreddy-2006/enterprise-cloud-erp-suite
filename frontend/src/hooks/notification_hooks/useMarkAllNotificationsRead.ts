import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import notificationService from "@/services/notification.service";

export function useMarkAllRead() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn:
            notificationService.markAllRead,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [
                    "notifications",
                ],

            });

        },

    });

}