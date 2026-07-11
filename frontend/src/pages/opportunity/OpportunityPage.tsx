import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import OpportunityTable from "@/components/opportunities/OpportunityTable";
import OpportunityDialog from "@/components/opportunities/OpportunityDialog";
import OpportunityStats from "@/components/opportunities/OpportunityStats";

import { useOpportunities } from "@/hooks/opportunity_hooks/useOpportunities";
import { useCreateOpportunity } from "@/hooks/opportunity_hooks/useCreateOpportunity";
import { useUpdateOpportunity } from "@/hooks/opportunity_hooks/useUpdateOpportunity";
import { useDeleteOpportunity } from "@/hooks/opportunity_hooks/useDeleteOpportunity";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

function OpportunityPage(){
    const { data,isLoading,isError } = useOpportunities();
    const createOpportunity = useCreateOpportunity();
    const updateOpportunity = useUpdateOpportunity();
    const deleteOpportunity = useDeleteOpportunity();
    const opportunities = data?.data || [];
    const [open,setOpen] = useState(false);
    const [selectedOpportunity,setSelectedOpportunity] = useState<any>(null);
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const limit = 10;
    const filteredOpportunities = useMemo(() => {
            return opportunities.filter(
                (opportunity:any) => opportunity.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        },
        [
            opportunities,
            search
        ]
    );
    const start = (page - 1)*limit;
    const end = start + limit;
    const paginatedOpportunities = filteredOpportunities.slice(start,end);
    const handleCreate = () => {
        setSelectedOpportunity(null);
        setOpen(true);
    };
    const handleEdit = (opportunity:any) => {
        setSelectedOpportunity(opportunity);
        setOpen(true);
    };
    const handleDelete = (id:string) => {
        deleteOpportunity.mutate(
            id,
            {
                onSuccess(){
                    toast.success(
                        "Opportunity deleted successfully"
                    );
                },
                onError(){
                    toast.error(
                        "Unable to delete opportunity"
                    );
                }
            }
        );
    };
    const handleSubmit = (values:any) => {
        if(selectedOpportunity){
            updateOpportunity.mutate(
                {
                    id: selectedOpportunity.id,
                    data: values
                },
                {
                    onSuccess(){
                        toast.success(
                            "Opportunity updated successfully"
                        );
                    },
                    onError(){
                        toast.error(
                            "Unable to update opportunity"
                        );
                    }
                }
            );
        }else{
            createOpportunity.mutate(
                values,
                {
                    onSuccess(){
                        toast.success(
                            "Opportunity created successfully"
                        );
                    },
                    onError(){
                        toast.error(
                            "Unable to create opportunity"
                        );
                    }
                }
            );
        }
        setOpen(false);
        setSelectedOpportunity(null);
    };
    if(isLoading){
        return(
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Opportunities...
                </div>
            </AppLayout>
        );
    }
    if(isError){
        return(
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load opportunities
                </div>
            </AppLayout>
        );
    }
    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white"> Opportunities </h1>
                    <Button className="text-white" onClick={handleCreate}> Add Opportunity </Button>
                </div>
                <OpportunityStats opportunities={opportunities}/>
                <Input placeholder="Search Opportunity" value={search}
                    onChange={ (e)=> setSearch(e.target.value)} />
                {
                    filteredOpportunities.length === 0?
                    (
                        <div className="text-center text-slate-400 py-10">
                            No Opportunities Found
                        </div>
                    ):
                    (
                        <OpportunityTable
                            opportunities={paginatedOpportunities}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                }

                <div className="flex gap-4">
                    <Button className="text-white" disabled={ page === 1 } onClick={() => setPage(page - 1)}>
                        Previous
                    </Button>
                    <Button className="text-white" disabled={end >= filteredOpportunities.length} onClick={() => setPage(page + 1)}>
                        Next
                    </Button>
                </div>
                <OpportunityDialog
                    open={open}
                    onOpenChange={setOpen}
                    loading={
                        createOpportunity.isPending ||
                        updateOpportunity.isPending
                    }
                    defaultValues={selectedOpportunity}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default OpportunityPage;