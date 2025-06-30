import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { EvaluationProvider } from './contexts/EvaluationContenxt'
import { Layout } from './components/common/Layout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

// Employee Components
import { MyEvaluation } from './components/employee/evalution';
import { EvaluationHistory } from './components/employee/history';
import { MyProfile } from './components/employee/profile';

// Appraiser Components
import { EmployeeEvaluations } from './components/appraiser/evaluation';
import { PendingReviews } from './components/appraiser/pending';
import { CompletedReviews } from './components/appraiser/complited';
import StaffManagements from './components/hod/StaffManagement';
import DepartmentReports from './components/hod/DepartmentReports';
import PendingApprovals from './components/hod/PendingApprovals';
import DepartmentEvaluations from './components/hod/DepartmentEvaluations';
import SystemSettings from './components/hr/SystemSettings';
import Analytics from './components/hr/Analytics';
import PerfomanceReports from './components/hr/PerfomanceReports';
import { EmployeeManagement } from './components/hr/EmployeeManagement';
import EvaluationCycle from './components/hr/EvaluationCycle';
import ExecutiveReports from './components/head/ExecutiveReports';
import InstitutionOverview from './components/head/InstitutionOverview';
import FinalApprovals from './components/head/FinalApprovals';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Employee Routes */}
        <Route
          path="/employee/evaluation"
          element={
            <ProtectedRoute>
              <MyEvaluation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/history"
          element={
            <ProtectedRoute>
              <EvaluationHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

        {/* Appraiser Routes */}
        <Route
          path="/appraiser/evaluations"
          element={
            <ProtectedRoute>
              <EmployeeEvaluations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appraiser/pending"
          element={
            <ProtectedRoute>
              <PendingReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appraiser/completed"
          element={
            <ProtectedRoute>
              <CompletedReviews />
            </ProtectedRoute>
          }
        />

        {/* HoD Routes */}
        <Route
          path="/hod/evaluations"
          element={
            <ProtectedRoute>
              <DepartmentEvaluations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hod/approvals"
          element={
            <ProtectedRoute>
              <PendingApprovals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hod/reports"
          element={
            <ProtectedRoute>
              <DepartmentReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hod/staff"
          element={
            <ProtectedRoute>
              <StaffManagements />
            </ProtectedRoute>
          }
        />

        {/* HR Routes */}
        <Route
          path="/hr/cycles"
          element={
            <ProtectedRoute>
              <EvaluationCycle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <ProtectedRoute>
              <EmployeeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/reports"
          element={
            <ProtectedRoute>
              <PerfomanceReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/settings"
          element={
            <ProtectedRoute>
              <SystemSettings />
            </ProtectedRoute>
          }
        />

        {/* Institution Head Routes */}
        <Route
          path="/head/approvals"
          element={
            <ProtectedRoute>
              <FinalApprovals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/head/overview"
          element={
            <ProtectedRoute>
              <InstitutionOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/head/reports"
          element={
            <ProtectedRoute>
              <ExecutiveReports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EvaluationProvider>
        <Router>
          <AppRoutes />
        </Router>
      </EvaluationProvider>
    </AuthProvider>
  );
}
