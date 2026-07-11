import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import AuditStats from "@/components/auditlog/AuditStats";
import AuditTable from "@/components/auditlog/AuditTable";

import { useAuditLogs } from "@/hooks/auditlog_hooks/useAuditLogs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AuditPage() {
    const {
        data,
        isLoading,
        isError
    } = useAuditLogs();
    const logs = data?.data || [];
    const [ search,setSearch ] = useState("");
    const [ page,setPage ] = useState(1);
    const limit = 10;
    const filteredLogs = useMemo(() => {
            return logs.filter(
                (log: any) => log.action.toLowerCase().includes(search.toLowerCase()) || log.entity.toLowerCase().includes(search.toLowerCase())
            );
        },
        [ logs,search ]
    );
    const start = (page - 1)*limit;
    const end = start + limit;
    const paginatedLogs = filteredLogs.slice(start,end);
    if (isLoading) {
        return (
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Audit Logs...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load Audit Logs
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Audit Logs
                    </h1>
                </div>
                <AuditStats logs={logs}/>
                <Input placeholder="Search Audit Logs" value={search} onChange={(e) => setSearch(e.target.value)}/>
                {
                    filteredLogs.length === 0?
                        (
                            <div className="text-center text-slate-400 py-10">
                                No Audit Logs Found
                            </div>
                        ):
                        (
                            <AuditTable logs={paginatedLogs}/>
                        )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={page === 1} onClick={() => setPage(page - 1)}> Previous </Button>
                    <Button className="text-white" disabled={end >= filteredLogs.length} onClick={() => setPage(page + 1)}> Next </Button>
                </div>
            </div>
        </AppLayout>
    );
}

export default AuditPage;