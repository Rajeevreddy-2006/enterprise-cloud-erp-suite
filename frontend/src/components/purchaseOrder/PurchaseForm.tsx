import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
purchaseSchema,
type PurchaseFormData
} from "@/schemas/purchase.schema";
import type { PurchaseOrderStatus } from "@/types/purchase.types";
// import { useInventory } from "@/hooks/inventory_hooks/useInventoryItems";
import { Input } from "@/components/ui/input";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:PurchaseFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<PurchaseFormData>;
}

function PurchaseForm({ onSubmit,loading,defaultValues }:Props){
    // const {data}=useInventory();
    // const inventory=data || [];
    const { register,handleSubmit,setValue } = useForm<PurchaseFormData>({resolver:zodResolver(purchaseSchema) as any,defaultValues});
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Order Number" {...register("orderNumber")}/>
        <Select onValueChange={(value) => {setValue("inventoryItemId",value)}}>
        <SelectTrigger>
            <SelectValue placeholder="Inventory Item"/>
        </SelectTrigger>
        {/* <SelectContent>
            { inventory.map((item:any)=>(<SelectItem key={item.id} value={item.id}> {item.name} </SelectItem>)) }
        </SelectContent> */}
        </Select>
        <Input type="number" placeholder="Quantity" {...register("quantity",{valueAsNumber:true})}/>
        <Input type="number" step="0.01" placeholder="Unit Price" {...register("unitPrice",{valueAsNumber:true})}/>
        <Select onValueChange={(value)=>{setValue("status",value as PurchaseOrderStatus)}}>
        <SelectTrigger>
            <SelectValue placeholder="Status"/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="PENDING"> Pending </SelectItem>
            <SelectItem value="APPROVED"> Approved </SelectItem>
            <SelectItem value="RECEIVED"> Received </SelectItem>
            <SelectItem value="CANCELLED"> Cancelled </SelectItem>
        </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> {loading?"Saving...":"Save"} </Button>
        </form>
    )
}

export default PurchaseForm;