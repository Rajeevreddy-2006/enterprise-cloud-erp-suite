import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    salesOrderSchema,
    type SalesOrderFormData
} from "@/schemas/salesOrder.schema";
import {
    SalesOrderStatus
} from "@/types/salesOrder.types";
import { useInventory } from "@/hooks/inventory_hooks/useInventoryItems";
import { useCustomers } from "@/hooks/customer_hooks/useCustomers";
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
    onSubmit:(data:SalesOrderFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<SalesOrderFormData>;
}

function SalesOrderForm({
    onSubmit,
    loading,
    defaultValues
}:Props){
    const { data:inventoryData } = useInventory();
    const { data:customerData } = useCustomers();
    const inventory = inventoryData?.data||[];
    const customers = customerData?.data||[];
    const { register,handleSubmit,setValue,watch } = useForm<SalesOrderFormData>({ resolver:zodResolver(salesOrderSchema) as any,defaultValues });
    const quantity = watch("quantity");
    const unitPrice = watch("unitPrice");
    const total = (quantity||0)*(unitPrice||0);
    return(
        <form onSubmit={handleSubmit(onSubmit) } className="space-y-4">
        <Input placeholder="Order Number" { ...register("orderNumber") }/>
        <Select onValueChange={(value)=>{ setValue("customerId",value); }}>
            <SelectTrigger>
                <SelectValue placeholder="Customer"/>
            </SelectTrigger>
            <SelectContent>
                { customers.map((customer:any) => (<SelectItem key={customer.id} value={customer.id}> {customer.name} </SelectItem>)) }
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => {setValue("inventoryItemId",value); }}>
            <SelectTrigger>
                <SelectValue placeholder="Inventory Item"/>
            </SelectTrigger>
            <SelectContent>
                { inventory.map((item:any)=>(<SelectItem key={item.id} value={item.id}> {item.name} </SelectItem>)) }
            </SelectContent>
        </Select>
        <Input type="number" placeholder="Quantity" { ...register("quantity",{valueAsNumber:true}) }/>
        <Input type="number" step="0.01" placeholder="Unit Price" { ...register("unitPrice",{valueAsNumber:true}) }/>
        <Input value={total} readOnly placeholder="Total"/>
        <Select onValueChange={(value)=>{setValue("status",value as SalesOrderStatus); }}>
            <SelectTrigger>
                <SelectValue placeholder="Status"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PENDING"> Pending </SelectItem>
                <SelectItem value="CONFIRMED"> Confirmed </SelectItem>
                <SelectItem value="COMPLETED"> Completed </SelectItem>
                <SelectItem value="CANCELLED"> Cancelled </SelectItem>
            </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default SalesOrderForm;