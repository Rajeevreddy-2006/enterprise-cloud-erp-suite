import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import NotificationTable from "@/components/notifications/NotificationTable";
import NotificationStats from "@/components/notifications/NotificationStats";

import { useNotifications } from "@/hooks/notification_hooks/useNotifications";
import { useMarkNotificationRead } from "@/hooks/notification_hooks/useMarkNotificationRead";
import { useDeleteNotification } from "@/hooks/notification_hooks/useDeleteNotification";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

function NotificationPage() {
    const {
        data,
        isLoading,
        isError
    } = useNotifications();
    const markRead = useMarkNotificationRead();
    const deleteNotification = useDeleteNotification();
    const notifications = data || [];
    const [ search,setSearch ] = useState("");
    const [ page,setPage ] = useState(1);
    const limit = 10;
    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification: any) => notification.title.toLowerCase().includes(search.toLowerCase()));
    },
    [ notifications,search ]);
    const start = (page - 1)*limit;
    const end = start + limit;
    const paginatedNotifications = filteredNotifications.slice(start,end);
    const handleRead = (id: string) => {
        markRead.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Notification marked as read"
                    );
                },
                onError() {
                    toast.error(
                        "Unable to update notification"
                    );
                }
            }
        );
    };
    const handleDelete = (id: string) => {
        deleteNotification.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Notification deleted"
                    );
                },
                onError() {
                    toast.error(
                        "Unable to delete notification"
                    );
                }
            }
        );
    };
    if (isLoading) {
        return (
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Notifications...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load Notifications
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white"> Notifications </h1>
                </div>
                <NotificationStats notifications={notifications}/>
                <Input placeholder="Search Notification" value={search} onChange={(e) => setSearch(e.target.value) }/>
                {
                    filteredNotifications.length === 0?
                        (
                            <div className="text-center text-slate-400 py-10">
                                No Notifications Found
                            </div>
                        ):
                        (
                            <NotificationTable notifications={paginatedNotifications} onRead={handleRead} onDelete={handleDelete}/>
                        )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={ page === 1 } onClick={() => setPage(page - 1)}> Previous </Button>
                    <Button className="text-white" disabled={end >= filteredNotifications.length} onClick={() => setPage(page + 1)}> Next </Button>
                </div>
            </div>
        </AppLayout>
    );
}

export default NotificationPage;