import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useAuth } from "@/hooks/auth_hooks/useAuth";

function CompanyCard() {
    const { user } = useAuth();
    return (
        <Card className="bg-slate-900 border-slate-800 p-6">
            <div className="flex items-center gap-3">
                <Building2 className="text-blue-400" />
                <h2 className="text-white font-semibold text-xl">
                    Workspace
                </h2>
            </div>
            <div className="mt-6 space-y-4">
                <div>
                    <p className="text-slate-500">
                        Company
                    </p>
                    <p className="text-white">
                        {user?.companyName || "Amdox Technologies"}
                    </p>
                </div>
                {/* <div>
                    <p className="text-slate-500">
                        Slug
                    </p>
                    <p className="text-white">
                        {user?.companySlug || "-"}
                    </p>
                </div> */}
            </div>
        </Card>
    );
}

export default CompanyCard;