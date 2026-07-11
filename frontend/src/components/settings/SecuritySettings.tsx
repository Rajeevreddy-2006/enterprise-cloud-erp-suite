import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Shield } from "lucide-react";

import { toast } from "sonner";

import ChangePasswordDialog from "./ChangePasswordDialog";

import { useChangePassword } from "@/hooks/auth_hooks/useChangePassword";

function SecurityCard() {
    const [open, setOpen] = useState(false);
    const changePassword = useChangePassword();
    return (
        <>
            <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                            <Shield className="text-blue-400" />
                            <h2 className="text-white font-semibold text-xl">
                                Security
                            </h2>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div>
                                <p className="text-slate-500">
                                    Password
                                </p>
                                <p className="text-white">
                                    ••••••••••
                                </p>
                                <p className="text-slate-400 text-sm mt-1">
                                    Change your account password securely
                                </p>
                            </div>
                            <div className="mt-6 border-t border-slate-800 pt-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-medium">
                                            Multi-Factor Authentication
                                        </h3>
                                        <p className="text-slate-400 text-sm mt-1">
                                            Add an extra layer of security to your account.
                                            (Right Now MFA Button is not functional)
                                        </p>
                                        <span className="inline-flex mt-3 rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-400">
                                            Disabled
                                        </span>
                                    </div>
                                    <Button variant="outline" className="border-slate-700"> Enable MFA </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(true)}>
                        Change Password
                    </Button>
                </div>
            </Card>
            <ChangePasswordDialog
                open={open}
                onOpenChange={setOpen}
                onSubmit={(values) => {
                    changePassword.mutate(
                        {
                            currentPassword: values.currentPassword,
                            newPassword: values.newPassword
                        },
                        {
                            onSuccess() {
                                toast.success(
                                    "Password updated successfully"
                                );
                                setOpen(false);
                            },
                            onError(error: any) {
                                toast.error(
                                    error?.response?.data?.message ||
                                    "Unable to update password"
                                );
                            }
                        }
                    );
                }}
            />
        </>
    );
}

export default SecurityCard;