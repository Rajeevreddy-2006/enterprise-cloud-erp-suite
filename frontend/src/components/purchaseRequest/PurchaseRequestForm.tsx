import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseRequestSchema, type PurchaseRequestFormData } from "@/schemas/purchaseRequest.schema";
import { PurchaseRequestStatus } from "@/types/purchaseRequest.types";
// import { useInventory } from "@/hooks/inventory_hooks/useInventoryItems";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:PurchaseRequestFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<PurchaseRequestFormData>;
}

function PurchaseRequestForm({ onSubmit, loading, defaultValues }:Props){
    // const {data} = useInventory();
    // const inventory = data?.data || [];
    const { register, handleSubmit, setValue } = useForm<PurchaseRequestFormData>({resolver: zodResolver(purchaseRequestSchema) as any,defaultValues });
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
        <Input placeholder="Title" { ...register("title") }/>
        <Input placeholder="Description" { ...register("description") }/>
        <Input type="number" placeholder="Quantity" { ...register("quantity",{valueAsNumber:true}) }/>
        <Select onValueChange={ (value)=>{setValue("inventoryItemId",value)} }>
            <SelectTrigger>
                <SelectValue placeholder="Inventory Item"/>
            </SelectTrigger>
            {/* <SelectContent>
                { inventory.map((item:any)=>( <SelectItem key={item.id} value={item.id}> {item.name} </SelectItem> )) }
            </SelectContent> */}
        </Select>
        <Select onValueChange={(value)=>{setValue("status",value as PurchaseRequestStatus)}}>
            <SelectTrigger>
                <SelectValue placeholder="Status"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PENDING"> Pending </SelectItem>
                <SelectItem value="APPROVED"> Approved </SelectItem>
                <SelectItem value="REJECTED"> Rejected </SelectItem>
            </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default PurchaseRequestForm;