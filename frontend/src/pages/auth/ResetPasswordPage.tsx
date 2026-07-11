import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormData} from "@/schemas/auth.schema";
import { useResetPassword } from "@/hooks/auth_hooks/useResetPassword";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ResetPasswordPage(){
    const navigate = useNavigate();
    const { token } = useParams();
    const mutation = useResetPassword();
    const { register,handleSubmit,formState:{errors} } =
        useForm<ResetPasswordFormData>({ resolver:zodResolver(resetPasswordSchema) });
    const onSubmit = (data: ResetPasswordFormData) => {
        if (!token) {
            toast.error("Invalid reset token");
            return;
        }
        mutation.mutate({ token, password: data.password },
            {
                onSuccess() {
                    toast.success("Password reset successful");
                    navigate("/login");
                },
                onError(error: any) {
                    toast.error(error.response?.data?.message || "Reset failed");
                }
            }
        );
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="w-[450px] bg-slate-800 border border-slate-700 shadow-xl">
        <CardHeader>
            <CardTitle className="text-3xl text-white font-bold text-center"> Reset Password </CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                <Input type="password" placeholder="New Password" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" 
                    { ...register("password") }/>
                <p className="text-red-500 text-sm"> { errors.password?.message } </p>
                <Input type="password" placeholder="Confirm Password" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" 
                    { ...register("confirmPassword") } />
                <p className="text-red-500 text-sm"> { errors.confirmPassword?.message } </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={ mutation.isPending }> { mutation.isPending?"Resetting...":"Reset Password"} </Button>
            </form>
        </CardContent>
        </Card>
        </div>
    )
}

export default ResetPasswordPage;