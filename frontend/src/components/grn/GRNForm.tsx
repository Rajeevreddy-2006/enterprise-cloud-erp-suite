import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    grnSchema,
    type GRNFormData
} from "@/schemas/grn.schema";
import type { GRNStatus } from "@/types/grn.types";
import { usePurchaseOrders } from "@/hooks/purchaseOrder_hooks/usePurchaseOrders";
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
    onSubmit:(data:GRNFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<GRNFormData>;
}

function GRNForm({ onSubmit, loading, defaultValues }:Props){
    const { data } = usePurchaseOrders();
    const orders = data || [];
    const { register, handleSubmit, setValue } = useForm<GRNFormData>({resolver:zodResolver(grnSchema) as any,defaultValues});
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="GRN Number" { ...register("grnNumber") }/>
        <Input type="number" placeholder="Quantity Received" { ...register("quantityReceived",{valueAsNumber:true}) }/>
        <Input placeholder="Remarks" { ...register("remarks") }/>
        <Select onValueChange={(value)=>{ setValue("purchaseOrderId",value) }}>
        <SelectTrigger>
            <SelectValue placeholder="Purchase Order"/>
        </SelectTrigger>
        <SelectContent> 
        {
            orders.map((order:any)=>(
                <SelectItem key={order.id} value={order.id}> { order.orderNumber } </SelectItem>
            ))
        }
        </SelectContent>
        </Select>
        <Select onValueChange={(value)=>{ setValue("status",value as GRNStatus) }}>
            <SelectTrigger>
                <SelectValue placeholder="Status"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PENDING"> Pending </SelectItem>
                <SelectItem value="RECEIVED"> Received </SelectItem>
                <SelectItem value="REJECTED"> Rejected </SelectItem>
            </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default GRNForm;