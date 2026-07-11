import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    inventorySchema,
    type InventoryFormData,
    type InventoryFormInput
}
from "@/schemas/inventory.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:InventoryFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<InventoryFormInput>;
}

function InventoryForm({ onSubmit,loading,defaultValues }:Props){
    const { register,handleSubmit }=useForm<InventoryFormInput>({ resolver:zodResolver(inventorySchema),defaultValues });
    return(
        <form className="space-y-4" onSubmit={ handleSubmit((values)=>onSubmit(values as InventoryFormData)) }>
            <Input placeholder="Name" { ...register("name") }/>
            <Input placeholder="SKU"{ ...register("sku") } />
            <Input type="number" placeholder="Quantity" { ...register("quantity",{valueAsNumber:true}) }/>
            <Input type="number" step="0.01" placeholder="Unit Price" { ...register("unitPrice",{valueAsNumber:true}) } />
            <Button className="w-full" disabled={loading}> {loading?"Saving...":"Save"} </Button>
        </form>
    );
}

export default InventoryForm;