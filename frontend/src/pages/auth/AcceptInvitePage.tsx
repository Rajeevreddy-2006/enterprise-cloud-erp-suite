import { useState } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useAcceptInvite } from "@/hooks/auth_hooks/useAcceptInvite";

function AcceptInvitePage(){
    const { token } = useParams();
    const navigate = useNavigate();
    const acceptInvite = useAcceptInvite();
    const [ password,setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const handleSubmit=()=>{
        if(password!==confirmPassword){
            toast.error(
                "Passwords do not match"
            );
            return;
        }
        acceptInvite.mutate(
            {
                token:token!,
                password
            },
            {
                onSuccess(){
                    toast.success(
                        "Account activated"
                    );
                    navigate(
                        "/login"
                    );
                },
                onError(){
                    toast.error(
                        "Unable to activate account"
                    );
                }
            }
        );
    };
    return(
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="w-full max-w-md bg-slate-900 rounded-xl p-8 border border-slate-800 space-y-5">
                <h1 className="text-3xl font-bold text-white">
                    Create Account
                </h1>
                <Input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <Input type="password" placeholder="Confirm Password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                <Button className="w-full" onClick={handleSubmit}>
                    Create Account
                </Button>
            </div>
        </div>
    );
}

export default AcceptInvitePage;