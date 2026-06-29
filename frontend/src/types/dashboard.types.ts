export interface DashboardData {
  totalEmployees:number;
  totalDepartments:number;
  totalInventory:number;
  pendingLeavesCount:number;
  revenue:number;
  lowStock:number;
  recentEmployees:any[];
  pendingLeaves:any[];
  transactions:any[];
  notifications:any[];
  approvals:any[];
}

export interface DashboardResponse{
  success:boolean;
  data:DashboardData;
}