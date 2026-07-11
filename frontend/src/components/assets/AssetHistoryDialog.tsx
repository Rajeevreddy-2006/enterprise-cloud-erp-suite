import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Badge
} from "@/components/ui/badge";
import {
    useAssetHistory
} from "@/hooks/asset_hooks/useAssetHistory";

interface Props{
    open:boolean;
    onOpenChange:(v:boolean)=>void;
    assetId:string;
}

function AssetHistoryDialog({
    open,
    onOpenChange,
    assetId
}:Props){
    const {
        data,
        isLoading
    } = useAssetHistory(assetId);
    const history= data?.data || [];
    return(
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DialogContent
                className="max-w-5xl"
            >
                <DialogHeader>
                    <DialogTitle>
                        Asset History
                    </DialogTitle>
                </DialogHeader>
                {
                    isLoading?
                    (
                        <div className="py-12 text-center">
                            Loading...
                        </div>
                    ):
                    (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Employee
                                    </TableHead>
                                    <TableHead>
                                        Assigned
                                    </TableHead>
                                    <TableHead>
                                        Returned
                                    </TableHead>
                                    <TableHead>
                                        Remarks
                                    </TableHead>
                                    <TableHead>
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    history.length===0?
                                    (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="text-center py-8"
                                            >
                                                No History Found
                                            </TableCell>
                                        </TableRow>
                                    ):
                                    (
                                        history.map((item:any)=>(
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        {
                                                            item.employee?.firstName
                                                        }
                                                        {
                                                            " "
                                                        }
                                                        {
                                                            item.employee?.lastName
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            new Date(item.assignedAt)
                                                            .toLocaleDateString()
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            item.returnedAt?
                                                            new Date(item.returnedAt).toLocaleDateString():"—"
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            item.remark || "—"
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            item.returnedAt?
                                                            (
                                                                <Badge>
                                                                    Returned
                                                                </Badge>
                                                            )
                                                            :
                                                            (
                                                                <Badge variant="secondary">
                                                                    Active
                                                                </Badge>
                                                            )
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    )
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </DialogContent>
        </Dialog>
    );
}

export default AssetHistoryDialog;