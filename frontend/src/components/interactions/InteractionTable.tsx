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
import type { Interaction } from "@/types/interaction.types";

interface Props {
    interactions: Interaction[];
    onEdit: (interaction: Interaction) => void;
    onDelete: (id: string) => void;
}

function InteractionTable({
    interactions,
    onEdit,
    onDelete
}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Subject </TableHead>
                    <TableHead> Customer </TableHead>
                    <TableHead> Lead </TableHead>
                    <TableHead> Opportunity </TableHead>
                    <TableHead> Type </TableHead>
                    <TableHead> Date </TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    interactions.map(interaction => (
                            <TableRow key={interaction.id}>
                                <TableCell> {interaction.subject} </TableCell>
                                <TableCell> {interaction.customer?.name} </TableCell>
                                <TableCell> {interaction.lead?.title} </TableCell>
                                <TableCell> {interaction.opportunity?.title} </TableCell>
                                <TableCell> {interaction.interactionType} </TableCell>
                                <TableCell> { new Date(interaction.interactionDate).toLocaleDateString() } </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button className="text-white" variant="ghost" size="icon" onClick={() => onEdit(interaction)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button className="text-white" variant="ghost" size="icon" onClick={() => onDelete(interaction.id)}>
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

export default InteractionTable;