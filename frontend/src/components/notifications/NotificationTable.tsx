import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import type {
    Notification
} from "@/types/notification.types";

interface Props {
    notifications: Notification[];
    onRead: (id: string) => void;
    onDelete: (id: string) => void;
}

function NotificationTable({
    notifications,
    onRead,
    onDelete
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Title </TableHead>
                    <TableHead> Message </TableHead>
                    <TableHead> Status </TableHead>
                    <TableHead> Date </TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    notifications.map(notification => (
                            <TableRow key={notification.id}>
                                <TableCell> {notification.title} </TableCell>
                                <TableCell> {notification.message} </TableCell>
                                <TableCell>
                                    <span className={ notification.isRead?"text-green-400":"text-yellow-400" }>
                                        { notification.isRead?"Read":"Unread" }
                                    </span>
                                </TableCell>
                                <TableCell> { new Date(notification.createdAt).toLocaleDateString() } </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" disabled={notification.isRead} onClick={() => onRead(notification.id)}>
                                            <Check size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => onDelete(notification.id)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    );
}

export default NotificationTable;