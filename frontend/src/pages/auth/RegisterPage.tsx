import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";
import { useRegister } from "@/hooks/auth_hooks/useRegister";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const registerMutation = useRegister();
    const { register, handleSubmit, watch, setValue, formState:{ errors } } =
        useForm<RegisterFormData>({ resolver: zodResolver( registerSchema ) });
    const companyName = watch("companyName");
    useEffect(()=>{
        if(companyName){
            setValue("companySlug", companyName .toLowerCase() .trim() .replace(/\s+/g,"-") .replace(/[^a-z0-9-]/g, "" ));
        }
    },[ companyName, setValue ]);
    const onSubmit=(data:RegisterFormData)=>{
        registerMutation.mutate(data,
        {
            onSuccess(){
                toast.success("Workspace created successfully");
                navigate("/login");
            },
            onError(error:any){
                toast.error(error?.response?.data?.message || "Registration failed");
            }
        })
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="w-[450px] bg-slate-800 border border-slate-700 shadow-xl">
        <CardHeader>
            <CardTitle className="text-3xl text-white font-bold text-center"> Create Workspace </CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                <Input placeholder="Company Name" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" 
                    { ...register("companyName") } />
                <p className="text-red-500 text-sm"> { errors.companyName?.message } </p>
                <Input placeholder="Company Slug" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" 
                    { ...register("companySlug") }/>
                <p className="text-red-500 text-sm"> { errors.companySlug?.message } </p>
                <Input placeholder="Admin Name" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" 
                    { ...register("adminName") }/>
                <p className="text-red-500 text-sm"> { errors.adminName?.message} </p>
                <Input placeholder="Email" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    { ...register("email") }/>
                <p className="text-red-500 text-sm"> { errors.email?.message } </p> 
                <Input type="password" placeholder="Password" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    { ...register("password") }/>
                <p className="text-red-500 text-sm"> { errors.password?.message } </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={ registerMutation.isPending }> 
                    {registerMutation.isPending?"Creating Workspace...":"Create Workspace"} </Button>
                <p className="text-center text-slate-400">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 ml-2"> Login </Link>
                </p>
            </form>
        </CardContent>
        </Card>
        </div>
    )
}

export default RegisterPage;
