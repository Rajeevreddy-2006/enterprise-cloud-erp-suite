import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth_hooks/useAuth";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

function ProfilePage() {
    const {user} = useAuth();
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">
                    Profile
                </h1>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">
                            User Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Name
                                </p>
                                <p className="text-white">
                                    {user?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Email
                                </p>
                                <p className="text-white">
                                    {user?.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Role
                                </p>
                                <p className="text-white">
                                    {user?.role}
                                </p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Company
                                </p>
                                <p className="text-white">
                                    { user?.tenant?.name || user?.companyName || "—" } </p>
                            </div>
                            {/* <div>
                                <p className="text-slate-400 text-sm">
                                    Tenant ID
                                </p>
                                <p className="text-white">
                                    {user?.tenantId}
                                </p>
                            </div> */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default ProfilePage;