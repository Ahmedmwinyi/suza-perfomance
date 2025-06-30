import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  ClipboardList,
  UserCheck,
  Building,
  Crown,
  Award,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, hasRole } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [{ to: "/dashboard", icon: Home, label: "Dashboard" }];

    if (hasRole("employee")) {
      return [
        ...baseItems,
        { to: "/employee/evaluation", icon: FileText, label: "My Evaluation" },
        {
          to: "/employee/history",
          icon: ClipboardList,
          label: "Evaluation History",
        },
        { to: "/employee/profile", icon: Users, label: "My Profile" },
      ];
    }

    if (hasRole("appraiser")) {
      return [
        ...baseItems,
        {
          to: "/appraiser/evaluations",
          icon: UserCheck,
          label: "Employee Evaluations",
        },
        {
          to: "/appraiser/pending",
          icon: ClipboardList,
          label: "Pending Reviews",
        },
        { to: "/appraiser/completed", icon: Award, label: "Completed Reviews" },
      ];
    }

    if (hasRole("hod")) {
      return [
        ...baseItems,
        {
          to: "/hod/evaluations",
          icon: FileText,
          label: "Department Evaluations",
        },
        { to: "/hod/approvals", icon: UserCheck, label: "Pending Approvals" },
        { to: "/hod/reports", icon: BarChart3, label: "Department Reports" },
        { to: "/hod/staff", icon: Users, label: "Staff Management" },
      ];
    }

    if (hasRole("hr")) {
      return [
        ...baseItems,
        { to: "/hr/cycles", icon: ClipboardList, label: "Evaluation Cycles" },
        { to: "/hr/employees", icon: Users, label: "Employee Management" },
        { to: "/hr/reports", icon: BarChart3, label: "Performance Reports" },
        { to: "/hr/analytics", icon: BarChart3, label: "Analytics" },
        { to: "/hr/settings", icon: Settings, label: "System Settings" },
      ];
    }

    if (hasRole("institution_head")) {
      return [
        ...baseItems,
        { to: "/head/approvals", icon: Crown, label: "Final Approvals" },
        { to: "/head/overview", icon: Building, label: "Institution Overview" },
        { to: "/head/reports", icon: BarChart3, label: "Executive Reports" },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-navy-900 lg:text-white lg:z-40 lg:flex lg:flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <h2 className="text-lg font-bold">SUZA</h2>
              <p className="text-sm text-gray-300">Performance System</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 flex-1">
          <div className="px-6 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {user?.role.replace("_", " ")} Menu
            </p>
          </div>

          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-navy-800 text-gold-400 border-r-2 border-gold-400"
                      : "text-gray-300 hover:text-white hover:bg-navy-800"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-6">
          <div className="bg-navy-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-navy-900 text-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <h2 className="text-lg font-bold">SUZA</h2>
              <p className="text-sm text-gray-300">Performance System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 flex-1">
          <div className="px-6 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              {user?.role.replace("_", " ")} Menu
            </p>
          </div>

          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-navy-800 text-gold-400 border-r-2 border-gold-400"
                      : "text-gray-300 hover:text-white hover:bg-navy-800"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-6">
          <div className="bg-navy-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
