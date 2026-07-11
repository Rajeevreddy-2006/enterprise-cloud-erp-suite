import AppLayout from "@/components/layout/AppLayout";

import { toast } from "sonner";

import { useLeaves } from "@/hooks/leave_hooks/useLeaves";
import { useApproveLeave } from "@/hooks/leave_hooks/useApproveLeave";
import { useRejectLeave } from "@/hooks/leave_hooks/useRejectLeave";

import LeaveTable from "@/components/leave/LeaveTable";

function LeaveApprovalPage() {

    const { data = [] } = useLeaves();

    const approve = useApproveLeave();

    const reject = useRejectLeave();

    return (

        <AppLayout>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        Leave Approval

                    </h1>

                    <p className="text-slate-400">

                        Review employee leave requests

                    </p>

                </div>

                <div
                    className="
                    rounded-xl
                    border
                    border-slate-800
                    bg-slate-900/60
                    overflow-hidden
                "
                >

                    <LeaveTable

                        leaves={data}

                        showActions

                        onApprove={(id:string)=>{

                            approve.mutate(

                                id,

                                {

                                    onSuccess(){

                                        toast.success(

                                            "Leave Approved"

                                        );

                                    }

                                }

                            );

                        }}

                        onReject={(id:string)=>{

                            reject.mutate(

                                id,

                                {

                                    onSuccess(){

                                        toast.success(

                                            "Leave Rejected"

                                        );

                                    }

                                }

                            );

                        }}

                    />

                </div>

            </div>

        </AppLayout>

    );

}

export default LeaveApprovalPage;