import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import InteractionTable from "@/components/interactions/InteractionTable";
import InteractionDialog from "@/components/interactions/InteractionDialog";
import InteractionStats from "@/components/interactions/InteractionStats";

import { useInteractions } from "@/hooks/interaction_hooks/useInteractions";
import { useCreateInteraction } from "@/hooks/interaction_hooks/useCreateInteraction";
import { useUpdateInteraction } from "@/hooks/interaction_hooks/useUpdateInteraction";
import { useDeleteInteraction } from "@/hooks/interaction_hooks/useDeleteInteraction";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

function InteractionPage(){
    const {
        data,
        isLoading,
        isError
    } = useInteractions();
    const createInteraction = useCreateInteraction();
    const updateInteraction = useUpdateInteraction();
    const deleteInteraction = useDeleteInteraction();
    const interactions = data?.data || [];
    const [ open,setOpen ] = useState(false);
    const [ selectedInteraction,setSelectedInteraction ] = useState<any>(null);
    const [ search,setSearch ] = useState("");
    const [ page,setPage ] = useState(1);
    const limit = 10;
    const filteredInteractions = useMemo(() => {
        return interactions.filter((interaction:any) => interaction.subject.toLowerCase().includes(search.toLowerCase()));
    },
    [ interactions, search ]);
    const start = (page - 1)*limit;
    const end = start + limit;
    const paginatedInteractions = filteredInteractions.slice(start,end);
    const handleCreate = () => {
        setSelectedInteraction(null);
        setOpen(true);
    };
    const handleEdit = (interaction:any) => {
        setSelectedInteraction(interaction);
        setOpen(true);
    };
    const handleDelete = (id:string) => {
        deleteInteraction.mutate(
            id,
            {
                onSuccess(){
                    toast.success(
                        "Interaction deleted successfully"
                    );
                },
                onError(){
                    toast.error(
                        "Unable to delete interaction"
                    );
                }
            }
        );
    };
    const handleSubmit = (values:any) => {
        if(selectedInteraction){
            updateInteraction.mutate(
                {
                    id: selectedInteraction.id,
                    data: values
                },
                {
                    onSuccess(){
                        toast.success(
                            "Interaction updated successfully"
                        );
                    },
                    onError(){
                        toast.error(
                            "Unable to update interaction"
                        );
                    }
                }
            );
        }else{
            createInteraction.mutate(
                values,
                {
                    onSuccess(){
                        toast.success(
                            "Interaction created successfully"
                        );
                    },
                    onError(){
                        toast.error(
                            "Unable to create interaction"
                        );
                    }
                }
            );
        }
        setOpen(false);
        setSelectedInteraction(null);
    };
    if(isLoading){
        return(
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Interactions...
                </div>
            </AppLayout>
        );
    }
    if(isError){
        return(
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load interactions
                </div>
            </AppLayout>
        );
    }
    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white"> Interactions </h1>
                    <Button className="text-white" onClick={handleCreate}> Add Interaction </Button>
                </div>
                <InteractionStats interactions={interactions}/>
                <Input placeholder="Search Interaction" value={search} onChange={(e)=> setSearch(e.target.value)} />
                {
                    filteredInteractions.length === 0?
                    (
                        <div className="text-center text-slate-400 py-10">
                            No Interactions Found
                        </div>
                    ):
                    (
                        <InteractionTable
                            interactions={paginatedInteractions}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={page === 1} onClick={() => setPage(page - 1)}> Previous </Button>
                    <Button className="text-white" disabled={end >= filteredInteractions.length} onClick={()=> setPage(page + 1)}> Next </Button>
                </div>
                <InteractionDialog
                    open={open}
                    onOpenChange={setOpen}
                    loading={
                        createInteraction.isPending ||
                        updateInteraction.isPending
                    }
                    defaultValues={selectedInteraction}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default InteractionPage;