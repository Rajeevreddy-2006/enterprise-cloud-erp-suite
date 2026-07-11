import { useState } from "react";
import { useAuth } from "@/hooks/auth_hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    User,
    Pencil
} from "lucide-react";
import EditProfileDialog from "./EditProfileDialog";
import { useUpdateProfile } from "@/hooks/user_hooks/useUpdateProfile";

function ProfileCard() {
    const [open,setOpen] = useState(false);
    const updateProfile = useUpdateProfile();
    const { user, updateUser } = useAuth();
    return (
        <Card className="bg-slate-900 border-slate-800 p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="
                        w-14
                        h-14
                        rounded-full
                        bg-blue-600
                        flex
                        items-center
                        justify-center
                        ">
                        <User
                            className="text-white"
                        />
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-xl">
                            {user?.name}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <Button
                    size="sm"
                    variant="outline"
                    className=" border-slate-700 bg-slate-800 text-white"
                    onClick={() => setOpen(true)}>
                    <Pencil size={14} /> Edit </Button>
            </div>
            <div className="mt-6 space-y-5">
                <div>
                    <p className="text-slate-500 text-sm">
                        Role
                    </p>
                    <p className="text-white">
                        {user?.role}
                    </p>
                </div>
                <div>
                    <p className="text-slate-500 text-sm">
                        Company
                    </p>
                    <p className="text-white">
                        {
                            user?.tenant?.name || user?.companyName || "—"
                        }
                    </p>
                </div>
                <div>
                    <p className="text-slate-500 text-sm">
                        Joined
                    </p>
                    <p className="text-white">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </p>
                </div>
            </div>
            <EditProfileDialog
                open={open}
                onOpenChange={setOpen}
                defaultValues={{ name: user?.name || "" }}
                onSubmit={(values) => {
                    updateProfile.mutate(
                        values,
                        {
                            onSuccess(response){
                                updateUser(response.data.data);
                                toast.success("Profile updated");
                                setOpen(false);
                            },
                            onError(){
                                toast.error("Unable to update profile");
                            }
                        }
                    );
                }}
            />
        </Card>
    );
}

export default ProfileCard;