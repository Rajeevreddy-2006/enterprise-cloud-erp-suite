import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:any)=>void;
    defaultValues?:any;
}

function EmployeeForm({ onSubmit,defaultValues }:Props){
    const { register,handleSubmit } = useForm({ defaultValues });
    return(
        <Card>
        <CardContent className="space-y-4 pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="First Name" { ...register( "firstName" ) } />
            <Input placeholder="Last Name" { ...register( "lastName" ) } />
            <Input placeholder="Email" { ...register( "email" ) } />
            <Input placeholder="Phone" { ...register( "phone" ) } />
            <Input placeholder="Designation" { ...register( "designation" ) } />
            <Button className="w-full"> Save Employee </Button>
        </form>
        </CardContent>
        </Card>
    )
}

export default EmployeeForm;