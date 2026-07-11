import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    loginSchema,
    type LoginFormData
} from "@/schemas/auth.schema";

import authService from "@/services/auth.service";
import { useAuth } from "@/hooks/auth_hooks/useAuth";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Link,
    useNavigate
} from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState:{
            errors,
            isSubmitting
        }
    } = useForm<LoginFormData>({
        resolver:
            zodResolver(
                loginSchema
            )
    });
    const onSubmit = async(data:LoginFormData)=>{
        try{
            const response = await authService.login(data);
            auth.login(
                response.accessToken,
                response.refreshToken,
                response.user
            );
            toast.success(
              `Welcome back ${response.user.name}`
            );
            navigate("/dashboard");
        }
        catch(error:any){
            toast.error(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        }
    };
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
            <Card className=" w-[450px] bg-slate-800 border-slate-700 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl text-white font-bold text-center">
                      Amdox ERP
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
                        <div>
                            <Input
                                placeholder="Email"
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                {...register("email")}
                            />
                            {
                                errors.email &&
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                      errors.email.message
                                    }
                                </p>
                            }
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                { ...register("password") }
                            />
                            {
                                errors.password &&
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                      errors.password.message
                                    }
                                </p>
                            }
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting}>
                            {
                                isSubmitting?
                                "Signing In...":
                                "Login"
                            }
                        </Button>
                        <p className="text-center text-slate-400">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="ml-2 text-blue-500 hover:text-blue-400">
                                Register
                            </Link>
                        </p>
                        <div className="text-center">
                            <Link
                                to="/forgot-password"
                                className="text-blue-500 hover:text-blue-400 text-sm">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;