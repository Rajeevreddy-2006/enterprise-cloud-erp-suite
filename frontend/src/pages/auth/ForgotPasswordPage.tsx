import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { toast } from "sonner";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ForgotPasswordPage(){
    const mutation = useForgotPassword();
    const { register,handleSubmit,formState:{errors} } =
        useForm<ForgotPasswordFormData>({ resolver:zodResolver(forgotPasswordSchema) });
    const onSubmit=(data:ForgotPasswordFormData )=>{
        mutation.mutate(
            data,
            {
            onSuccess(){
                toast.success("Reset link sent");
            },
            onError(error:any){
                toast.error(error.response?.data?.message || "Something went wrong");
            }
            }
        )
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="w-[450px] bg-slate-800 border border-slate-700 shadow-xl">
        <CardHeader>
            <CardTitle className="text-3xl text-white font-bold text-center"> Forgot Password </CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
            <Input placeholder="Email" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                { ...register("email") } />
            <p className="text-red-500 text-sm"> { errors.email?.message} </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                disabled={ mutation.isPending }> { mutation.isPending?"Sending...":"Send Reset Link" } </Button>
            <p className="text-center text-slate-400">
                Remember Password?
                <Link to="/login" className="ml-2 text-blue-500"> Login </Link>
            </p>
            </form>
        </CardContent>
        </Card>
        </div>
    )
}

export default ForgotPasswordPage;