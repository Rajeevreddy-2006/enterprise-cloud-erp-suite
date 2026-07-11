import {
    useMemo,
    useState
} from "react";

import AppLayout
from "@/components/layout/AppLayout";

import AssetTable
from "@/components/assets/AssetTable";

import AssetCards
from "@/components/assets/AssetCards";

import CreateAssetDialog
from "@/components/assets/CreateAssetDialog";

import AssignAssetDialog
from "@/components/assets/AssignAssetDialog";

import AssetHistoryDialog
from "@/components/assets/AssetHistoryDialog";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {
    toast
} from "sonner";

import {
    useAssets
} from "@/hooks/asset_hooks/useAssets";

import {
    useCreateAsset
} from "@/hooks/asset_hooks/useCreateAsset";

import {
    useAssignAsset
} from "@/hooks/asset_hooks/useAssignAsset";

import {
    useReturnAsset
} from "@/hooks/asset_hooks/useReturnAsset";

import {
    useDeleteAsset
} from "@/hooks/asset_hooks/useDeleteAsset";

import EditAssetDialog from "@/components/assets/EditAssetDialog";
import { useUpdateAsset } from "@/hooks/asset_hooks/useUpdateAsset";

function AssetPage() {
    const [ open,setOpen ] = useState(false);
    const [ assignOpen,setAssignOpen ] = useState(false);
    const [ historyOpen,setHistoryOpen ] = useState(false);
    const [ selectedAsset,setSelectedAsset ] = useState<any>();
    const [ search,setSearch ] = useState("");
    const [ category,setCategory ] = useState("ALL");
    const [ status,setStatus ] = useState("ALL");
    const [ page,setPage ] = useState(1);
    const PAGE_SIZE = 10;
    const {
        data,
        refetch
    } = useAssets();
    const [ editOpen,setEditOpen ] = useState(false);
    const [ editAsset,setEditAsset ] = useState<any>();
    const create = useCreateAsset();
    const assign = useAssignAsset();
    const ret = useReturnAsset();
    const del = useDeleteAsset();
    const update = useUpdateAsset();
    const assets = data?.data || [];
    const filteredAssets =
        useMemo(
            () =>
                assets.filter(
                    (asset:any) => {
                        const searchMatch =
                            asset.name
                                .toLowerCase()
                                .includes(
                                    search
                                    .toLowerCase()
                                );
                        const categoryMatch =
                            category === "ALL"
                            ||
                            asset.category === category;
                        const statusMatch =
                            status === "ALL"
                            ||
                            asset.status === status;
                        return (
                            searchMatch
                            &&
                            categoryMatch
                            &&
                            statusMatch
                        );
                    }
                ),
            [
                assets,
                search,
                category,
                status
            ]
        );
    const paginatedAssets =
        filteredAssets.slice(
            (
                page - 1
            )
            *
            PAGE_SIZE,
            page
            *
            PAGE_SIZE
        );
    const handleCreate = (
        data:any
    ) => {
        create.mutate(
            data,
            {
                onSuccess(){
                    toast.success(
                        "Asset created"
                    );
                    setOpen(
                        false
                    );
                    refetch();
                },
                onError(
                    error:any
                ){
                    toast.error(
                        error.response?.data?.message
                        ||
                        "Failed"
                    );
                }
            }
        );
    };
    const handleAssign=(
        employeeId:string,
        remarks:string
    )=>{
        assign.mutate(
            {
                assetId:
                    selectedAsset.id,
                employeeId,
                remarks
            },
            {
                onSuccess(){
                    toast.success(
                        "Assigned"
                    );
                    setAssignOpen(
                        false
                    );
                    refetch();
                }
            }
        );
    };
    const handleReturn=(
        assignmentId:string
    )=>{
        ret.mutate(
            assignmentId,
            {
                onSuccess(){
                    toast.success(
                        "Returned"
                    );
                    refetch();
                }
            }
        );
    };
    const handleDelete=(
        assetId:string
    )=>{
        del.mutate(
            assetId,
            {
                onSuccess(){
                    toast.success(
                        "Deleted"
                    );
                    refetch();
                }
            }
        );
    };
    const handleUpdate = (data: any) => {
        if (!selectedAsset) return;
        update.mutate(
            {
                id: selectedAsset.id,
                data
            },
            {
                onSuccess() {
                    toast.success(
                        "Asset updated successfully"
                    );
                    setEditOpen(false);
                    refetch();
                },
                onError(error: any) {
                    toast.error(
                        error.response?.data?.message ||
                        "Failed to update asset"
                    );
                }
            }
        );
    };
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Assets
                        </h1>
                        <p className="text-slate-400">
                            Manage company assets
                        </p>
                    </div>
                    <Button
                        className="text-white"
                        onClick={()=>
                            setOpen(
                                true
                            )
                        }
                    >
                        Add Asset
                    </Button>
                </div>
                <AssetCards
                    assets={assets}
                />
                <div className="flex gap-3">
                    <Input
                        placeholder="Search"
                        value={search}
                        onChange={(e)=>
                            setSearch(
                                e.target.value
                            )
                        }
                    />
                    <Select
                        value={category}
                        onValueChange={
                            setCategory
                        }
                    >
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">
                                All
                            </SelectItem>
                            <SelectItem value="COMPUTER">
                                Computer
                            </SelectItem>
                            <SelectItem value="LAPTOP">
                                Laptop
                            </SelectItem>
                            <SelectItem value="MOBILE">
                                Mobile
                            </SelectItem>
                            <SelectItem value="FURNITURE">
                                Furniture
                            </SelectItem>
                            <SelectItem value="VEHICLE">
                                Vehicle
                            </SelectItem>
                            <SelectItem value="MACHINERY">
                                Machinery
                            </SelectItem>
                            <SelectItem value="NETWORK_DEVICE">
                                Network
                            </SelectItem>
                            <SelectItem value="OTHER">
                                Other
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={status}
                        onValueChange={
                            setStatus
                        }
                    >
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">
                                All
                            </SelectItem>
                            <SelectItem value="AVAILABLE">
                                Available
                            </SelectItem>
                            <SelectItem value="ASSIGNED">
                                Assigned
                            </SelectItem>
                            <SelectItem value="UNDER_MAINTENANCE">
                                Maintenance
                            </SelectItem>
                            <SelectItem value="RETIRED">
                                Retired
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <AssetTable
                    assets={paginatedAssets}
                    onAssign={(asset) => {
                        setSelectedAsset(asset);
                        setAssignOpen(true);
                    }}
                    onHistory={(asset) => {
                        setSelectedAsset(asset);
                        setHistoryOpen(true);
                    }}
                    onEdit={(asset) => {
                        console.log("Edit clicked", asset);
                        setSelectedAsset(asset);
                        setEditOpen(true);
                    }}
                    onReturn={handleReturn}
                    onDelete={handleDelete}
                />
                <div className="flex justify-end gap-3">
                    <Button className="text-white"
                        variant="outline"
                        disabled={
                            page===1
                        }
                        onClick={()=>
                            setPage(
                                page-1
                            )
                        }
                    >
                        Previous
                    </Button>
                    <Button className="text-white"
                        variant="outline"
                        disabled={
                            page
                            *
                            PAGE_SIZE
                            >=
                            filteredAssets.length
                        }
                        onClick={()=>
                            setPage(
                                page+1
                            )
                        }
                    >
                        Next
                    </Button>
                </div>
                <CreateAssetDialog
                    open={open}
                    onOpenChange={
                        setOpen
                    }
                    loading={
                        create.isPending
                    }
                    onSubmit={
                        handleCreate
                    }
                />
                {
                    selectedAsset &&
                    (
                        <AssignAssetDialog
                            open={
                                assignOpen
                            }
                            onOpenChange={
                                setAssignOpen
                            }
                            asset={
                                selectedAsset
                            }
                            loading={
                                assign.isPending
                            }
                            onSubmit={
                                handleAssign
                            }
                        />
                    )
                }
                {
                    selectedAsset &&
                    (
                        <AssetHistoryDialog
                            open={
                                historyOpen
                            }
                            onOpenChange={
                                setHistoryOpen
                            }
                            assetId={
                                selectedAsset.id
                            }
                        />
                    )
                }
                {
                    selectedAsset && (

                        <EditAssetDialog
                            open={editOpen}
                            onOpenChange={setEditOpen}
                            asset={selectedAsset}
                            loading={update.isPending}
                            onSubmit={handleUpdate}
                        />

                    )
                }
            </div>
        </AppLayout>
    );
}

export default AssetPage;