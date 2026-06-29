import { useForm  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentSchema, type DepartmentFormData } from "@/schemas/department.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props{
    onSubmit: (data:DepartmentFormData) =>void;
    defaultValues?:DepartmentFormData;
    loading?:boolean;
}

function DepartmentForm({ onSubmit,defaultValues,loading }:Props){
    const { register,handleSubmit,formState:{ errors } } = useForm<DepartmentFormData>({ resolver: zodResolver( departmentSchema ), defaultValues });
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
        <Input placeholder="Department Name" { ...register("name") }/>
        <p className="text-red-500 text-sm"> { errors.name?.message } </p>
        <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    )
}

export default DepartmentForm;