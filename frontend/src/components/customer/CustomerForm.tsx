import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    customerSchema,
    type CustomerFormData
} from "@/schemas/customer.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:CustomerFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<CustomerFormData>;
}

function CustomerForm({
    onSubmit,
    loading,
    defaultValues
}:Props){
const { register,handleSubmit } = useForm<CustomerFormData>({resolver: zodResolver(customerSchema),defaultValues});
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Customer Name" { ...register("name") }/>
            <Input placeholder="Email" { ...register("email") } />
            <Input placeholder="Phone" { ...register("phone") } />
            <Input placeholder="Address" { ...register("address") } />
            <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save"} </Button>
        </form>
    );
}

export default CustomerForm;