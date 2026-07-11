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
import type { Tenant } from "@/types/tenant.types";
import { useAuth } from "@/hooks/auth_hooks/useAuth";

interface Props {
    tenants: Tenant[];
    onEdit: (tenant: Tenant) => void;
    onDelete: (id: string) => void;
}

function TenantTable({
    tenants,
    onEdit,
    onDelete
}: Props) {
    const { user } = useAuth();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Name </TableHead>
                    <TableHead> Slug </TableHead>
                    <TableHead> Status </TableHead>
                    <TableHead> Created At </TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    tenants.map(tenant => (
                            <TableRow key={tenant.id}>
                                <TableCell>
                                    {tenant.name}
                                </TableCell>
                                <TableCell>
                                    {tenant.slug}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={tenant.isActive?"text-green-400":"text-red-400"}>
                                        { tenant.isActive?"Active":"Inactive" }
                                    </span>
                                </TableCell>
                                <TableCell>
                                    { new Date(tenant.createdAt).toLocaleDateString() }
                                </TableCell>
                                <TableCell>
                                {
                                    user?.role === "SUPER_ADMIN" &&
                                        tenant.id === user?.tenantId ? (
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => onEdit(tenant)}>
                                                <Pencil size={16} />
                                            </Button>
                                            {/* <Button variant="ghost" size="icon" onClick={() => onDelete(tenant.id)}>
                                                <Trash2 size={16} />
                                            </Button> */}
                                        </div>
                                    ) : (
                                        <div className="ml-3">
                                            --
                                        </div>
                                    )
                                }
                                </TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    );
}

export default TenantTable;