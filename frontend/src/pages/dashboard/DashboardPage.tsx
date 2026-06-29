import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentEmployees from "@/components/dashboard/RecentEmployees";
import PendingLeaves from "@/components/dashboard/PendingLeaves";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import InventorySummary from "@/components/dashboard/InventorySummary";
import NotificationsWidget from "@/components/dashboard/NotificationsWidget";
import Charts from "@/components/dashboard/Charts";
import Analytics from "@/components/dashboard/Analytics";
import ApprovalQueue from "@/components/dashboard/ApprovalQueue";
import { useDashboard } from "@/hooks/useDashboard";

function DashboardPage(){
  const { data, isLoading, isError } = useDashboard();

  if(isLoading){
    return( <AppLayout> Loading... </AppLayout> )
  }
  if(isError){
    return( <AppLayout> Something went wrong </AppLayout> )
  }
  const dashboard = data?.data;
  return(
    <AppLayout>
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white"> Dashboard </h1>
        <p className="text-slate-400"> Welcome back to Amdox ERP </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2lg:grid-cols-4 gap-6">
        <StatCard title="Employees" value={(dashboard?.totalEmployees ?? 0).toString()} />
        <StatCard title="Departments" value={(dashboard?.totalDepartments ?? 0).toString()} />
        <StatCard title="Inventory" value={(dashboard?.totalInventory ?? 0).toString()} />
        <StatCard title="Revenue" value={`₹${dashboard?.revenue ?? 0}`} />
      </div>
      <QuickActions/>
        <div className="gridgrid-cols-1 lg:grid-cols-2 gap-6">
          <RecentEmployees employees={ dashboard?.recentEmployees || [] } />
          <PendingLeaves leaves={ dashboard?.pendingLeaves || [] } />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions transactions={ dashboard?.transactions || [] } />
          <InventorySummary total={ dashboard?.totalInventory || 0 } lowStock={ dashboard?.lowStock || 0 } />
        </div>
        <NotificationsWidget notifications={ dashboard?.notifications || [] } />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Charts/>
          <Analytics/>
        </div>
        <ApprovalQueue approvals={ dashboard?.approvals || [] } />
    </div>
    </AppLayout>
  )
}

export default DashboardPage;