import {
    useEffect,
    useState
} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Button
} from "@/components/ui/button";
import {
    Input
} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Props{
    open:boolean;
    onOpenChange:(v:boolean)=>void;
    asset:any;
    loading?:boolean;
    onSubmit:(data:any)=>void;
}

function EditAssetDialog({
    open,
    onOpenChange,
    asset,
    loading,
    onSubmit
}:Props){
    const [
        form,
        setForm
    ] =
    useState({
        name:"",
        category:"LAPTOP",
        purchaseCost:0,
        currentValue:0,
        status:"AVAILABLE",
        supplierId:""
    });
    useEffect(()=>{
        if(asset){
            setForm({
                name:
                    asset.name,
                category:
                    asset.category,
                purchaseCost:
                    Number(
                        asset.purchaseCost
                    ),
                currentValue:
                    Number(
                        asset.currentValue
                    ),
                status:
                    asset.status,
                supplierId:
                    asset.supplierId || ""
            });
        }
    },
    [
        asset
    ]);
    return(
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Asset
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Name"
                        value={
                            form.name
                        }
                        onChange={(e)=>
                            setForm({
                                ...form,
                                name:
                                e.target.value
                            })
                        }
                    />
                    <Select
                        value={
                            form.category
                        }
                        onValueChange={(v)=>
                            setForm({
                                ...form,
                                category:v
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="COMPUTER">
                                Computer
                            </SelectItem>
                            <SelectItem value="LAPTOP">
                                Laptop
                            </SelectItem>
                            <SelectItem value="MOBILE">
                                Mobile
                            </SelectItem>
                            <SelectItem value="FURNITURE">
                                Furniture
                            </SelectItem>
                            <SelectItem value="VEHICLE">
                                Vehicle
                            </SelectItem>
                            <SelectItem value="MACHINERY">
                                Machinery
                            </SelectItem>
                            <SelectItem value="NETWORK_DEVICE">
                                Network Device
                            </SelectItem>
                            <SelectItem value="OTHER">
                                Other
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    Purchase Cost:
                    <Input
                        type="number"
                        placeholder="Purchase Cost"
                        value={
                            form.purchaseCost
                        }
                        onChange={(e)=>
                            setForm({
                                ...form,
                                purchaseCost:
                                Number(
                                    e.target.value
                                )
                            })
                        }
                    />
                    Current Value:
                    <Input
                        type="number"
                        placeholder="Current Value"
                        value={
                            form.currentValue
                        }
                        onChange={(e)=>
                            setForm({
                                ...form,
                                currentValue:
                                Number(
                                    e.target.value
                                )
                            })
                        }
                    />
                    <Select
                        value={
                            form.status
                        }
                        onValueChange={(v)=>
                            setForm({
                                ...form,
                                status:v
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="AVAILABLE">
                                Available
                            </SelectItem>
                            <SelectItem value="ASSIGNED">
                                Assigned
                            </SelectItem>
                            <SelectItem value="UNDER_MAINTENANCE">
                                Maintenance
                            </SelectItem>
                            <SelectItem value="RETIRED">
                                Retired
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        className="w-full"
                        disabled={
                            loading
                        }
                        onClick={()=>
                            onSubmit(
                                form
                            )
                        }
                    >
                        Update Asset
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditAssetDialog;