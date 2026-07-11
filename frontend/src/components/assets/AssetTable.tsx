import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Button
} from "@/components/ui/button";
import {
    Badge
} from "@/components/ui/badge";

interface Props {
    assets:any[];
    onAssign:(asset:any)=>void;
    onHistory:(asset:any)=>void;
    onEdit:(asset:any)=>void;
    onReturn:(assignmentId:string)=>void;
    onDelete:(assetId:string)=>void;
}

function AssetTable({
    assets,
    onAssign,
    onHistory,
    onEdit,
    onReturn,
    onDelete
}:Props){
    const getStatusVariant=(status:string)=>{
        switch(status){
            case "AVAILABLE":
                return "default";
            case "ASSIGNED":
                return "secondary";
            case "UNDER_MAINTENANCE":
                return "outline";
            case "RETIRED":
                return "destructive";
            default:
                return "outline";
        }
    };
    return(
        <div className="rounded-xl border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Asset Code
                        </TableHead>
                        <TableHead>
                            Name
                        </TableHead>
                        <TableHead>
                            Category
                        </TableHead>
                        <TableHead>
                            Supplier
                        </TableHead>
                        <TableHead>
                            Purchase Cost
                        </TableHead>
                        <TableHead>
                            Current Value
                        </TableHead>
                        <TableHead>
                            Purchase Date
                        </TableHead>
                        <TableHead>
                            Status
                        </TableHead>
                        <TableHead>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        assets.length===0?
                        (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="text-center py-10"
                                >
                                    No Assets Found
                                </TableCell>
                            </TableRow>
                        )
                        :
                        (
                            assets.map((asset:any)=>(
                                    <TableRow key={asset.id}>
                                        <TableCell>
                                            {
                                                asset.assetCode
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                asset.name
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                asset.category
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                asset.supplier?.name || "—"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            ₹{
                                                Number(asset.purchaseCost).toLocaleString()
                                            }
                                        </TableCell>
                                        <TableCell>
                                            ₹{
                                                Number(asset.currentValue).toLocaleString()
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                new Date(asset.purchaseDate).toLocaleDateString()
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    getStatusVariant(
                                                        asset.status
                                                    )
                                                }
                                            >
                                                {
                                                    asset.status
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-2">
                                                {
                                                    asset.status === "AVAILABLE"
                                                    &&
                                                    (
                                                        <Button
                                                            size="sm"
                                                            onClick={()=>
                                                                onAssign(
                                                                    asset
                                                                )
                                                            }
                                                        >
                                                            Assign
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    asset.status === "ASSIGNED"
                                                    &&
                                                    asset.assignments?.[0]
                                                    &&
                                                    (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={()=>
                                                                onReturn(
                                                                    asset
                                                                    .assignments[0]
                                                                    .id
                                                                )
                                                            }
                                                        >
                                                            Return
                                                        </Button>
                                                    )
                                                }
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={()=>
                                                        onHistory(
                                                            asset
                                                        )
                                                    }
                                                >
                                                    History
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={()=>
                                                        onEdit(
                                                            asset
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                {
                                                    asset.status !== "ASSIGNED"
                                                    &&
                                                    (
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={()=>
                                                                onDelete(
                                                                    asset.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AssetTable;