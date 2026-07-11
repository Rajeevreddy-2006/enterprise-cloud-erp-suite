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
import type { Opportunity } from "@/types/opportunity.types";

interface Props {
    opportunities: Opportunity[];
    onEdit: (opportunity: Opportunity) => void;
    onDelete: (id: string) => void;
}

function OpportunityTable({
    opportunities,
    onEdit,
    onDelete
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Title </TableHead>
                    <TableHead> Customer </TableHead>
                    <TableHead> Value </TableHead>
                    <TableHead> Status </TableHead>
                    <TableHead> Created At </TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    opportunities.map(opportunity => (
                            <TableRow key={opportunity.id}>
                                <TableCell> {opportunity.title} </TableCell>
                                <TableCell> { opportunity.customer?.name } </TableCell>
                                <TableCell> ₹ {opportunity.value} </TableCell>
                                <TableCell> {opportunity.status} </TableCell>
                                <TableCell>
                                    { new Date(opportunity.createdAt).toLocaleDateString() }
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                       <Button className="text-white" variant="ghost" size="icon" onClick={() => onEdit(opportunity)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button className="text-white" variant="ghost" size="icon" onClick={() => onDelete(opportunity.id)}>
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

export default OpportunityTable;