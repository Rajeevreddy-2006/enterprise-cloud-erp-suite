import {
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

interface Props {
    open:boolean;
    onOpenChange:(v:boolean)=>void;
    loading?:boolean;
    suppliers?:any[];
    onSubmit:(data:any)=>void;
}

function CreateAssetDialog({
    open,
    onOpenChange,
    loading,
    suppliers=[],
    onSubmit
}:Props){
    const [
        form,
        setForm
    ] =
    useState({
        assetCode:"",
        name:"",
        serialNumber:"",
        category:"LAPTOP",
        purchaseDate:"",
        purchaseCost:0,
        currentValue:0,
        supplierId:""
    });
    return(
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Asset
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        placeholder="Asset Code"
                        value={form.assetCode}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                assetCode:
                                e.target.value
                            })
                        }
                    />
                    <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                name:
                                e.target.value
                            })
                        }
                    />
                    <Input
                        placeholder="Serial Number"
                        value={form.serialNumber}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                serialNumber:
                                e.target.value
                            })
                        }
                    />
                    <Select
                        value={form.category}
                        onValueChange={(value)=>
                            setForm({
                                ...form,
                                category:value
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
                    <Input
                        type="date"
                        value={form.purchaseDate}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                purchaseDate:
                                e.target.value
                            })
                        }
                    />
                    <Input
                        type="number"
                        placeholder="Purchase Cost"
                        value={form.purchaseCost}
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
                    <Input
                        type="number"
                        placeholder="Current Value"
                        value={form.currentValue}
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
                        value={form.supplierId}
                        onValueChange={(value)=>
                            setForm({
                                ...form,
                                supplierId:value
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Supplier"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                suppliers.map((supplier:any)=>(
                                        <SelectItem
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {
                                                supplier.name
                                            }
                                        </SelectItem>
                                    )
                                )
                            }
                        </SelectContent>
                    </Select>
                    <Button
                        className="w-full"
                        disabled={loading}
                        onClick={()=>{
                            onSubmit(
                                form
                            );
                        }}
                    >
                        Create Asset
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CreateAssetDialog;