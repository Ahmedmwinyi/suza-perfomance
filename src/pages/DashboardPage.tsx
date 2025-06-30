import { useAuth } from '../contexts/AuthContext';
import { EmployeeDashboard } from '../components/dashboards/EmployeeDashboard';
import { AppraiserDashboard } from '../components/dashboards/AppraiserDashboard';
import { HoDDashboard } from '../components/dashboards/HoDDashboard';
import { HRDashboard } from '../components/dashboards/HRDashboard';
import { InstitutionHeadDashboard } from '../components/dashboards/InstitutionHeadDashboard';

export default function DashboardPage() {
      const { user } = useAuth();

      if (!user) return null;
      switch (user.role) {
        case "employee":
          return <EmployeeDashboard />;
        case "appraiser":
          return <AppraiserDashboard />;
        case "hod":
          return <HoDDashboard />;
        case "hr":
          return <HRDashboard />;
        case "institution_head":
          return <InstitutionHeadDashboard />;
          default:
      return <div>Invalid role</div>;
      }
}
