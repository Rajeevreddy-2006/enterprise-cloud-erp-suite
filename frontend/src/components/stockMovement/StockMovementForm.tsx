import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    stockMovementSchema,
    type StockMovementFormData
} from "@/schemas/stockMovement.schema";
import {
    StockMovementType
} from "@/types/stockMovement.types";
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
    onSubmit:(data:StockMovementFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<StockMovementFormData>;
}

function StockMovementForm({ onSubmit, loading, defaultValues }:Props){
    // const { data } = useInventory();
    // const inventory = data?.data || [];
    const { register, handleSubmit, setValue } = useForm<StockMovementFormData>({resolver:zodResolver(stockMovementSchema) as any,defaultValues});
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select onValueChange={(value)=>{setValue("inventoryItemId",value);}}>
            <SelectTrigger>
                <SelectValue placeholder="Inventory Item"/>
            </SelectTrigger>
            {/* <SelectContent>
                { inventory.map((item:any)=>(<SelectItem key={item.id} value={item.id}> {item.name} </SelectItem>)) }
            </SelectContent> */}
        </Select>
        <Select onValueChange={(value)=>{setValue("movementType",value as StockMovementType);}}>
            <SelectTrigger>
                <SelectValue placeholder="Movement Type"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PURCHASE"> Purchase </SelectItem>
                <SelectItem value="GRN"> GRN </SelectItem>
                <SelectItem value="SALE"> Sale </SelectItem>
                <SelectItem value="ASSET_ASSIGNMENT"> Asset Assignment </SelectItem>
                <SelectItem value="ADJUSTMENT"> Adjustment </SelectItem>
            </SelectContent>
        </Select>
        <Input type="number" placeholder="Quantity" { ...register("quantity",{valueAsNumber:true}) } />
        <Input placeholder="Remarks" { ...register("remarks") }/>
        <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save"} </Button> 
        </form>
    );
}

export default StockMovementForm;