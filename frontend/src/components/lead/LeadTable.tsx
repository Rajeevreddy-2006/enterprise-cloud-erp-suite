import {
    Pencil,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import type { Lead } from "@/types/lead.types";

interface Props {
    leads: Lead[];
    onEdit: (lead: Lead) => void;
    onDelete: (id: string) => void;
}

function LeadTable({
    leads,
    onEdit,
    onDelete
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Title </TableHead>
                    <TableHead> Customer </TableHead>
                    <TableHead> Status </TableHead>
                    <TableHead> Created At </TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    leads.map(lead => (
                            <TableRow key={lead.id}>
                                <TableCell> {lead.title} </TableCell>
                                <TableCell> {lead.customer?.name} </TableCell>
                                <TableCell> {lead.status} </TableCell>
                                <TableCell> {new Date(lead.createdAt).toLocaleDateString()} </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => onEdit(lead)}> <Pencil size={16} /> </Button>
                                        <Button variant="ghost" size="icon" onClick={() => onDelete(lead.id)}> <Trash2 size={16} /> </Button>
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

export default LeadTable;