import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import EmployeePage from "@/pages/employees/EmployeePage";
import ProtectedRoute from "@/routes/ProtectedRoute"
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage"
import DepartmentPage from "@/pages/departments/DepartmentPage";
import AttendancePage from "@/pages/attendance/AttendancePage";
import LeavePage from "@/pages/leave/LeavePage";
import SalaryStructurePage from "@/pages/salary/SalaryStructurePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={< LoginPage />} />
        <Route path="/dashboard" element={< DashboardPage />} />
        <Route path="/employees" element={ <ProtectedRoute> <EmployeePage/> </ProtectedRoute> } />
        <Route path="/register" element={ <RegisterPage/> }/>
        <Route path="/forgot-password" element={ <ForgotPasswordPage/> }/>
        <Route path="/reset-password/:token" element={ <ResetPasswordPage/> }/>
        <Route path="/departments" element={ <DepartmentPage/> } />
        <Route path="/attendance" element={ <AttendancePage/> } />
        <Route path="/leave" element={<LeavePage/>} />
        <Route path="/salary-structure" element={ <SalaryStructurePage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;