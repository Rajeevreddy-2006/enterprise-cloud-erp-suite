import {
    useMemo,
    useState
} from "react";

import AppLayout from "@/components/layout/AppLayout";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    toast
} from "sonner";

import JournalEntryTable from "@/components/journal/JournalTable";
import CreateJournalEntryDialog from "@/components/journal/CreateJournalEntryDialog";
import EditJournalEntryDialog from "@/components/journal/EditJournalEntryDialog";

import {
    useJournalEntries
} from "@/hooks/journal_hooks/useJournalEntries";

import {
    useCreateJournalEntry
} from "@/hooks/journal_hooks/useCreateJournalEntry";

import {
    useUpdateJournalEntry
} from "@/hooks/journal_hooks/useUpdateJournalEntry";

import {
    useDeleteJournalEntry
} from "@/hooks/journal_hooks/useDeleteJournalEntry";

function JournalEntryPage() {

    const [
        createOpen,
        setCreateOpen
    ] = useState(false);

    const [
        editOpen,
        setEditOpen
    ] = useState(false);

    const [
        selectedJournalEntry,
        setSelectedJournalEntry
    ] = useState<any>(null);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        page,
        setPage
    ] = useState(1);

    const pageSize = 10;

    const {
        data,
        isLoading,
        isError,
        refetch
    } = useJournalEntries();

    const createMutation =
        useCreateJournalEntry();

    const updateMutation =
        useUpdateJournalEntry();

    const deleteMutation =
        useDeleteJournalEntry();

    const journalEntries =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                journalEntries.filter(

                    (entry: any) =>

                        entry.debitAccount?.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||

                        entry.creditAccount?.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||

                        entry.transaction?.description
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                ),

            [

                journalEntries,

                search

            ]

        );

    const totalPages =
        Math.ceil(

            filtered.length /

            pageSize

        );

    const paginated =
        filtered.slice(

            (page - 1) * pageSize,

            page * pageSize

        );

    const handleCreate = (

        data: any

    ) => {

        createMutation.mutate(

            data,

            {

                onSuccess() {

                    toast.success(

                        "Journal Entry Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Create Journal Entry"

                    );

                }

            }

        );

    };

    const handleUpdate = (

        data: any

    ) => {

        updateMutation.mutate(

            {

                id: selectedJournalEntry.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Journal Entry Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Update Journal Entry"

                    );

                }

            }

        );

    };

    const handleDelete = (

        id: string

    ) => {

        if (

            !window.confirm(

                "Delete this journal entry?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Journal Entry Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Delete Journal Entry"

                    );

                }

            }

        );

    };

    if (isLoading) {

        return (

            <AppLayout>

                <div className="py-10 text-center">

                    Loading...

                </div>

            </AppLayout>

        );

    }

    if (isError) {

        return (

            <AppLayout>

                <div className="py-10 text-center text-red-500">

                    Failed to load journal entries.

                </div>

            </AppLayout>

        );

    }

    return (

        <AppLayout>

            <div className="space-y-6">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-white">

                            Journal Entries

                        </h1>

                        <p className="text-slate-400">

                            Manage Journal Entries

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Journal Entry

                    </Button>

                </div>

                <Input

                    placeholder="Search Journal Entries..."

                    value={search}

                    onChange={(e) => {

                        setSearch(e.target.value);

                        setPage(1);

                    }}

                />

                <JournalEntryTable

                    journalEntries={paginated}

                    onEdit={(entry) => {

                        setSelectedJournalEntry(entry);

                        setEditOpen(true);

                    }}

                    onDelete={handleDelete}

                />

                {

                    totalPages > 1 && (

                        <div className="flex justify-end gap-2">

                            <Button

                                variant="outline"

                                disabled={page === 1}

                                onClick={() =>

                                    setPage(page - 1)

                                }

                            >

                                Previous

                            </Button>

                            <Button

                                variant="outline"

                                disabled={page === totalPages}

                                onClick={() =>

                                    setPage(page + 1)

                                }

                            >

                                Next

                            </Button>

                        </div>

                    )

                }

                <CreateJournalEntryDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedJournalEntry && (

                        <EditJournalEntryDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            journalEntry={selectedJournalEntry}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default JournalEntryPage;