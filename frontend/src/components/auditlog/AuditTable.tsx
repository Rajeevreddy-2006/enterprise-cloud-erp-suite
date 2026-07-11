import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import type { AuditLog } from "@/types/audit.types";

interface Props {
    logs: AuditLog[];
}

function AuditTable({
    logs
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Action </TableHead>
                    <TableHead> Entity </TableHead>
                    <TableHead> Entity ID </TableHead>
                    <TableHead> User </TableHead>
                    <TableHead> Date </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    logs.map(log => (
                            <TableRow key={log.id}>
                                <TableCell> {log.action} </TableCell>
                                <TableCell> {log.entity} </TableCell>
                                <TableCell> {log.entityId} </TableCell>
                                <TableCell>
                                    { log.user?`${log.user.firstName}${log.user.lastName}`:"-" }
                                </TableCell>
                                <TableCell>
                                    { new Date(log.createdAt).toLocaleString() }
                                </TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    );
}

export default AuditTable;