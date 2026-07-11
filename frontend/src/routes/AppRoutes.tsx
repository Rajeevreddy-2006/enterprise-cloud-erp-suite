// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "@/pages/auth/LoginPage";
// import DashboardPage from "@/pages/dashboard/DashboardPage";
// import EmployeePage from "@/pages/employees/EmployeePage";
// import ProtectedRoute from "@/routes/ProtectedRoute"
// import RegisterPage from "@/pages/auth/RegisterPage";
// import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage"
// import ResetPasswordPage from "@/pages/auth/ResetPasswordPage"
// import DepartmentPage from "@/pages/departments/DepartmentPage";
// import AttendancePage from "@/pages/attendance/AttendancePage";
// import LeavePage from "@/pages/leave/LeavePage";
// import SalaryStructurePage from "@/pages/salary/SalaryStructurePage";
// import PayrollPage from "@/pages/payroll/PayrollPage";
// import AccountsPage from "@/pages/accounts/AccountsPage";
// import TransactionsPage from "@/pages/transaction/TransactionsPage"
// import JournalEntriesPage from "@/pages/JournalEntry/JournalEntriesPage"
// import InventoryPage from "@/pages/inventory/InventoryPage"
// import PurchaseOrdersPage from "@/pages/purchaseOrder/PurchaseOrdersPage"
// import SuppliersPage from "@/pages/supplier/SuppliersPage";
// import GRNPage from "@/pages/grn/GRNPage";
// import PurchaseRequestPage from "@/pages/purchaseRequest/PurchaseRequestPage";
// import StockMovementPage from "@/pages/stockMovement/StockMovementPage";
// import SalesOrderPage from "@/pages/salesOrder/SalesOrderPage";
// import CustomerPage from "@/pages/customer/CustomerPage"
// import InvoicePage from "@/pages/invoice/InvoicePage"
// import PaymentPage from "@/pages/payment/PaymentPage";
// import ReportsPage from "@/pages/reports/ReportsPage";
// import NotificationPage from "@/pages/notifications/NotificationPage";
// import AuditPage from "@/pages/auditlog/AuditPage"
// import SettingsPage from "@/pages/SettingsPage";
// import TenantPage from "@/pages/TenantPage";
// import LeadPage from "@/pages/lead/LeadPage"
// import OpportunityPage from "@/pages/opportunity/OpportunityPage";
// import InteractionPage from "@/pages/interaction/InteractionPage";
// import QuotationPage from "@/pages/quotation/QuotationPage";
// import ExpensePage from "@/pages/expense/ExpensePage";
// import HomePage from "@/pages/HomePage";
// import ProfilePage from "@/pages/profile/ProfilePage";
// import AcceptInvitePage from "@/pages/auth/AcceptInvitePage";
// import EmployeeProfilePage from "@/pages/EmployeeProfilePage";
// import LeaveApprovalPage from "@/pages/LeaveApprovalPage";
// import PayrollApprovalPage from "@/pages/PayrollApprovalPage";
// import AssetPage from "@/pages/asset/AssetPage";
// import CustomerInvitationPage from "@/pages/customer/CustomerInvitationPage";
// import CustomerRegisterPage from "@/pages/customer/CustomerRegisterPage";
// import QuotationReviewPage from "@/pages/quotation/QuotationReviewPage";
// import QuotationResultPage from "@/pages/quotation/QuotationResultPage";
// import InvoiceReviewPage from "@/pages/invoice/InvoiceReviewPage";
// import InvoicePaymentResult from "@/pages/invoice/InvoicePaymentResult";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={< LoginPage />} />
//         <Route path="/dashboard" element={< DashboardPage />} />
//         <Route path="/employees" element={ <ProtectedRoute> <EmployeePage/> </ProtectedRoute> } />
//         <Route path="/register" element={ <RegisterPage/> }/>
//         <Route path="/forgot-password" element={ <ForgotPasswordPage/> }/>
//         <Route path="/reset-password/:token" element={ <ResetPasswordPage/> }/>
//         <Route path="/departments" element={ <DepartmentPage/> } />
//         <Route path="/attendance" element={ <AttendancePage/> } />
//         <Route path="/leave" element={<LeavePage/>} />
//         <Route path="/payroll" element={<PayrollPage/>} />
//         <Route path="/salary-structure" element={ <SalaryStructurePage/> }/>
//         <Route path="/accounts" element={<AccountsPage/>} />
//         <Route path="/transactions" element={<TransactionsPage/>}/>
//         <Route path="/journal-entries" element={<JournalEntriesPage/>}/>
//         <Route path="/inventory" element={<InventoryPage/>}/>
//         <Route path="/purchase-orders" element={<PurchaseOrdersPage/>}/>
//         <Route path="/suppliers" element={<SuppliersPage/>}/>
//         <Route path="/grn" element={<GRNPage/>}/>
//         <Route path="/purchase-requests" element={<PurchaseRequestPage/>}/>
//         <Route path="/stock-movements" element={<StockMovementPage/>} />
//         <Route path="/sales-orders" element={<SalesOrderPage/>}/>
//         <Route path="/customers" element={<CustomerPage/>}/>
//         <Route path="/invoices" element={<InvoicePage/>}/>
//         <Route path="/payments" element={<PaymentPage />} />
//         <Route path="/reports" element={<ReportsPage/>}/>
//         <Route path="/notifications" element={<NotificationPage/>}/>
//         <Route path="/audit-logs" element={<AuditPage/>}/>
//         <Route path="/settings" element={<SettingsPage/>}/>
//         <Route path="/tenants" element={<TenantPage/>}/>
//         <Route path="/leads" element={<LeadPage/>}/>
//         <Route path="/opportunities" element={<OpportunityPage/>}/>
//         <Route path="/interactions" element={<InteractionPage/>}/>
//         <Route path="/quotations" element={<QuotationPage/>}/>
//         <Route path="/expenses" element={<ExpensePage/>} />
//         <Route path="/" element={<HomePage/>}/>
//         <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> }/>
//         <Route path="/accept-invite/:token" element={ <AcceptInvitePage/> }/>
//         <Route path="/employees/:id" element={ <EmployeeProfilePage/> }/>
//         <Route path="/leave-approvals"element={<LeaveApprovalPage/>} />
//         <Route path="/payroll-approvals" element={<PayrollApprovalPage/>}/>
//         <Route path="/assets" element={ <AssetPage/> }/>
//         <Route path="/customer-invitations" element={<CustomerInvitationPage />}/>
//         <Route path="/customer/register/:token" element={<CustomerRegisterPage />}/>
//         <Route path="/quotation/review/:token" element={<QuotationReviewPage />}/>
//         <Route path="/quotation/result/accepted" element={<QuotationResultPage />}/>
//         <Route path="/quotation/result/rejected" element={<QuotationResultPage />}/>
//         <Route path="/invoice/review/:token" element={<InvoiceReviewPage />}/>
//         <Route path="/invoice/pay/:token" element={<InvoiceReviewPage />}/>
//         <Route path="/invoice/payment/success" element={<InvoicePaymentResult success={true}/>}/>
//         <Route path="/invoice/payment/failed" element={<InvoicePaymentResult success={false}/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import AcceptInvitePage from "@/pages/auth/AcceptInvitePage";

import HomePage from "@/pages/HomePage";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import EmployeePage from "@/pages/employees/EmployeePage";
import DepartmentPage from "@/pages/departments/DepartmentPage";
import AttendancePage from "@/pages/attendance/AttendancePage";
import LeavePage from "@/pages/leave/LeavePage";
import SalaryStructurePage from "@/pages/salary/SalaryStructurePage";
import PayrollPage from "@/pages/payroll/PayrollPage";
import AccountsPage from "@/pages/accounts/AccountsPage";
import TransactionsPage from "@/pages/transaction/TransactionsPage";
import JournalEntriesPage from "@/pages/JournalEntry/JournalEntriesPage";
import InventoryPage from "@/pages/inventory/InventoryPage";
import PurchaseOrdersPage from "@/pages/purchaseOrder/PurchaseOrdersPage";
import SuppliersPage from "@/pages/supplier/SuppliersPage";
import GRNPage from "@/pages/grn/GRNPage";
import PurchaseRequestPage from "@/pages/purchaseRequest/PurchaseRequestPage";
import StockMovementPage from "@/pages/stockMovement/StockMovementPage";
import SalesOrderPage from "@/pages/salesOrder/SalesOrderPage";
import CustomerPage from "@/pages/customer/CustomerPage";
import InvoicePage from "@/pages/invoice/InvoicePage";
import PaymentPage from "@/pages/payment/PaymentPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import NotificationPage from "@/pages/notifications/NotificationPage";
import AuditPage from "@/pages/auditlog/AuditPage";
import SettingsPage from "@/pages/SettingsPage";
import TenantPage from "@/pages/TenantPage";
import LeadPage from "@/pages/lead/LeadPage";
import OpportunityPage from "@/pages/opportunity/OpportunityPage";
import InteractionPage from "@/pages/interaction/InteractionPage";
import QuotationPage from "@/pages/quotation/QuotationPage";
import ExpensePage from "@/pages/expense/ExpensePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import EmployeeProfilePage from "@/pages/EmployeeProfilePage";
import LeaveApprovalPage from "@/pages/LeaveApprovalPage";
import PayrollApprovalPage from "@/pages/PayrollApprovalPage";
import AssetPage from "@/pages/asset/AssetPage";
import CustomerInvitationPage from "@/pages/customer/CustomerInvitationPage";

import CustomerRegisterPage from "@/pages/customer/CustomerRegisterPage";
import QuotationReviewPage from "@/pages/quotation/QuotationReviewPage";
import QuotationResultPage from "@/pages/quotation/QuotationResultPage";
import InvoiceReviewPage from "@/pages/invoice/InvoiceReviewPage";
import InvoicePaymentResult from "@/pages/invoice/InvoicePaymentResult";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================= Public ================= */}

                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/accept-invite/:token" element={<AcceptInvitePage />} />

                <Route
                    path="/customer/register/:token"
                    element={<CustomerRegisterPage />}
                />

                <Route
                    path="/quotation/review/:token"
                    element={<QuotationReviewPage />}
                />

                <Route
                    path="/quotation/result/accepted"
                    element={<QuotationResultPage />}
                />

                <Route
                    path="/quotation/result/rejected"
                    element={<QuotationResultPage />}
                />

                <Route
                    path="/invoice/review/:token"
                    element={<InvoiceReviewPage />}
                />

                <Route
                    path="/invoice/pay/:token"
                    element={<InvoiceReviewPage />}
                />

                <Route
                    path="/invoice/payment/success"
                    element={<InvoicePaymentResult success={true} />}
                />

                <Route
                    path="/invoice/payment/failed"
                    element={<InvoicePaymentResult success={false} />}
                />

                {/* ================= Protected ERP ================= */}

                <Route
                    path="/dashboard"
                    element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
                />

                <Route
                    path="/employees"
                    element={<ProtectedRoute><EmployeePage /></ProtectedRoute>}
                />

                <Route
                    path="/employees/:id"
                    element={<ProtectedRoute><EmployeeProfilePage /></ProtectedRoute>}
                />

                <Route
                    path="/departments"
                    element={<ProtectedRoute><DepartmentPage /></ProtectedRoute>}
                />

                <Route
                    path="/attendance"
                    element={<ProtectedRoute><AttendancePage /></ProtectedRoute>}
                />

                <Route
                    path="/leave"
                    element={<ProtectedRoute><LeavePage /></ProtectedRoute>}
                />

                <Route
                    path="/leave-approvals"
                    element={<ProtectedRoute><LeaveApprovalPage /></ProtectedRoute>}
                />

                <Route
                    path="/salary-structure"
                    element={<ProtectedRoute><SalaryStructurePage /></ProtectedRoute>}
                />

                <Route
                    path="/payroll"
                    element={<ProtectedRoute><PayrollPage /></ProtectedRoute>}
                />

                <Route
                    path="/payroll-approvals"
                    element={<ProtectedRoute><PayrollApprovalPage /></ProtectedRoute>}
                />

                <Route
                    path="/accounts"
                    element={<ProtectedRoute><AccountsPage /></ProtectedRoute>}
                />

                <Route
                    path="/transactions"
                    element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>}
                />

                <Route
                    path="/journal-entries"
                    element={<ProtectedRoute><JournalEntriesPage /></ProtectedRoute>}
                />

                <Route
                    path="/inventory"
                    element={<ProtectedRoute><InventoryPage /></ProtectedRoute>}
                />

                <Route
                    path="/purchase-orders"
                    element={<ProtectedRoute><PurchaseOrdersPage /></ProtectedRoute>}
                />

                <Route
                    path="/purchase-requests"
                    element={<ProtectedRoute><PurchaseRequestPage /></ProtectedRoute>}
                />

                <Route
                    path="/suppliers"
                    element={<ProtectedRoute><SuppliersPage /></ProtectedRoute>}
                />

                <Route
                    path="/grn"
                    element={<ProtectedRoute><GRNPage /></ProtectedRoute>}
                />

                <Route
                    path="/stock-movements"
                    element={<ProtectedRoute><StockMovementPage /></ProtectedRoute>}
                />

                <Route
                    path="/customers"
                    element={<ProtectedRoute><CustomerPage /></ProtectedRoute>}
                />

                <Route
                    path="/customer-invitations"
                    element={<ProtectedRoute><CustomerInvitationPage /></ProtectedRoute>}
                />

                <Route
                    path="/sales-orders"
                    element={<ProtectedRoute><SalesOrderPage /></ProtectedRoute>}
                />

                <Route
                    path="/quotations"
                    element={<ProtectedRoute><QuotationPage /></ProtectedRoute>}
                />

                <Route
                    path="/invoices"
                    element={<ProtectedRoute><InvoicePage /></ProtectedRoute>}
                />

                <Route
                    path="/payments"
                    element={<ProtectedRoute><PaymentPage /></ProtectedRoute>}
                />

                <Route
                    path="/expenses"
                    element={<ProtectedRoute><ExpensePage /></ProtectedRoute>}
                />

                <Route
                    path="/assets"
                    element={<ProtectedRoute><AssetPage /></ProtectedRoute>}
                />

                <Route
                    path="/reports"
                    element={<ProtectedRoute><ReportsPage /></ProtectedRoute>}
                />

                <Route
                    path="/notifications"
                    element={<ProtectedRoute><NotificationPage /></ProtectedRoute>}
                />

                <Route
                    path="/audit-logs"
                    element={<ProtectedRoute><AuditPage /></ProtectedRoute>}
                />

                <Route
                    path="/settings"
                    element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
                />

                <Route
                    path="/profile"
                    element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
                />

                <Route
                    path="/tenants"
                    element={<ProtectedRoute><TenantPage /></ProtectedRoute>}
                />

                <Route
                    path="/leads"
                    element={<ProtectedRoute><LeadPage /></ProtectedRoute>}
                />

                <Route
                    path="/opportunities"
                    element={<ProtectedRoute><OpportunityPage /></ProtectedRoute>}
                />

                <Route
                    path="/interactions"
                    element={<ProtectedRoute><InteractionPage /></ProtectedRoute>}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;