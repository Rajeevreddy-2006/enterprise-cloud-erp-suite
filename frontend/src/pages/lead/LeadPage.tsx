import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import LeadTable from "@/components/lead/LeadTable";
import LeadDialog from "@/components/lead/LeadDialog";
import LeadStats from "@/components/lead/LeadStats";

import { useLeads } from "@/hooks/lead_hooks/useLeads";
import { useCreateLead } from "@/hooks/lead_hooks/useCreateLead";
import { useUpdateLead } from "@/hooks/lead_hooks/useUpdateLead";
import { useDeleteLead } from "@/hooks/lead_hooks/useDeleteLead";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

function LeadPage() {
    const { data, isLoading, isError } = useLeads();
    const createLead = useCreateLead();
    const updateLead = useUpdateLead();
    const deleteLead = useDeleteLead();
    const leads = data?.data || [];
    const [open, setOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const filteredLeads = useMemo(() => {
        return leads.filter((lead: any) => lead.title.toLowerCase().includes(search.toLowerCase()));
    },
        [
            leads,
            search
        ]
    );
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedLeads = filteredLeads.slice(
        start,
        end
    );
    const handleCreate = () => {
        setSelectedLead(null);
        setOpen(true);
    };
    const handleEdit = (lead: any) => {
        setSelectedLead(lead);
        setOpen(true);
    };
    const handleDelete = (id: string) => {
        deleteLead.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Lead deleted successfully"
                    );
                },
                onError() {
                    toast.error(
                        "Unable to delete lead"
                    );
                }
            }
        );
    };
    const handleSubmit = (values: any) => {
        if (selectedLead) {
            updateLead.mutate(
                {
                    id: selectedLead.id,
                    data: values
                },
                {
                    onSuccess() {
                        toast.success(
                            "Lead updated successfully"
                        );
                    },
                    onError() {
                        toast.error(
                            "Unable to update lead"
                        );
                    }
                }
            );
        }
        else {
            createLead.mutate(
                values,
                {
                    onSuccess() {
                        toast.success(
                            "Lead created successfully"
                        );
                    },
                    onError() {
                        toast.error(
                            "Unable to create lead"
                        );
                    }
                }
            );
        }
        setOpen(false);
        setSelectedLead(null);
    };
    if (isLoading) {
        return (
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Leads...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load leads
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white"> Leads </h1>
                    <Button className="test-white" onClick={handleCreate}> Add Lead </Button>
                </div>
                <LeadStats leads={leads}/>
                <Input
                    placeholder="Search Lead"
                    value={search}
                    onChange={
                        (e) =>
                            setSearch(
                                e.target.value
                            )
                    }
                />
                {
                    filteredLeads.length === 0 ?
                        (
                            <div className="text-center text-slate-400 py-10">
                                No Leads Found
                            </div>
                        ):
                        (
                            <LeadTable
                                leads={paginatedLeads}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={page === 1} onClick={() => setPage(page - 1)}> Previous </Button>
                    <Button className="text-white" disabled={end >= filteredLeads.length} onClick={() => setPage(page + 1)}> Next </Button>
                </div>
                <LeadDialog
                    open={open}
                    onOpenChange={setOpen}
                    loading={
                        createLead.isPending ||
                        updateLead.isPending
                    }
                    defaultValues={selectedLead}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default LeadPage;