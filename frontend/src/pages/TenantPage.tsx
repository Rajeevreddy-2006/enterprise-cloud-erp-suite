import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import TenantTable from "@/components/tenant/TenantTable";
import TenantDialog from "@/components/tenant/TenantDialog";
import TenantStats from "@/components/tenant/TenantStats";
import TenantOverview from "@/components/tenant/TenantOverview";

import { useTenants } from "@/hooks/tenant_hooks/useTenants";
import { useCreateTenant } from "@/hooks/tenant_hooks/useCreateTenant";
import { useUpdateTenant } from "@/hooks/tenant_hooks/useUpdateTenant";
import { useDeleteTenant } from "@/hooks/tenant_hooks/useDeleteTenant";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/auth_hooks/useAuth";

function TenantPage(){
    const { data,isLoading,isError } = useTenants();
    const createTenant = useCreateTenant();
    const updateTenant = useUpdateTenant();
    const deleteTenant = useDeleteTenant();
    const tenants = data?.data || [];
    const [open,setOpen] = useState(false);
    const [selectedTenant,setSelectedTenant] = useState<any>(null);
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const limit = 10;
    const filteredTenants = useMemo(() => {
        return tenants.filter(
            (tenant:any) =>
                tenant.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );
    },
    [
        tenants,
        search
    ]);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTenants = filteredTenants.slice(
        start,
        end
    );
    const handleCreate = () => {
        setSelectedTenant(null);
        setOpen(true);
    };
    const handleEdit = (tenant:any) => {
        setSelectedTenant(tenant);
        setOpen(true);
    };
    const handleDelete = (id:string) => {
        deleteTenant.mutate(
            id,
            {
                onSuccess(){
                    toast.success(
                        "Tenant deleted successfully"
                    );
                },
                onError(){
                    toast.error(
                        "Unable to delete tenant"
                    );
                }
            }
        );
    };
    const handleSubmit = (values: any) => {
        const payload = {
            ...values,
            isActive:
                values.isActive === true ||
                values.isActive === "true"
        };
        if (selectedTenant) {
            updateTenant.mutate(
                {
                    id: selectedTenant.id,
                    data: payload
                },
                {
                    onSuccess() {
                        toast.success(
                            "Tenant updated successfully"
                        );
                        setOpen(false);
                        setSelectedTenant(null);
                    },
                    onError() {
                        toast.error(
                            "Unable to update tenant"
                        );
                    }
                }
            );
        } else {
            createTenant.mutate(
                payload,
                {
                    onSuccess() {
                        toast.success(
                            "Tenant created successfully"
                        );
                        setOpen(false);
                        setSelectedTenant(null);
                    },
                    onError() {
                        toast.error(
                            "Unable to create tenant"
                        );
                    }
                }
            );
        }
    };
    if(isLoading){
        return(
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Tenants...
                </div>
            </AppLayout>
        );
    }
    if(isError){
        return(
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load tenants
                </div>
            </AppLayout>
        );
    }
    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Tenants
                    </h1>
                </div>
                <TenantStats tenants={tenants}/>
                <TenantOverview tenant={selectedTenant}/>
                <Input
                    placeholder="Search Tenant"
                    value={search}
                    onChange={
                        (e)=>
                            setSearch(
                                e.target.value
                            )
                    }
                />
                {
                    filteredTenants.length === 0?
                    (
                        <div className="text-center text-slate-400 py-10">
                            No Tenants Found
                        </div>
                    ):
                    (
                        <TenantTable
                            tenants={paginatedTenants}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={page === 1} onClick={() => setPage(page - 1)}> Previous </Button>
                    <Button className="text-white" disabled={end >= filteredTenants.length} onClick={() =>setPage(page + 1)}> Next </Button>
                </div>
                <TenantDialog
                    open={open}
                    onOpenChange={setOpen}
                    loading={
                        createTenant.isPending ||
                        updateTenant.isPending
                    }
                    defaultValues={selectedTenant}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default TenantPage;