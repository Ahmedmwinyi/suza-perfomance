import {
  Users,
  TrendingUp,
  FileText,
  Settings,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Card } from "../common/Card";
import { StatCard } from "../common/StatCard";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function HRDashboard() {
  const { dashboardStats } = useEvaluation();

  const departmentData = dashboardStats.departmentPerformance.map((dept) => ({
    name: dept.department,
    score: dept.averageScore,
    completed: dept.completedCount,
    total: dept.totalCount,
  }));

  const gradeData = Object.entries(dashboardStats.gradeDistribution).map(
    ([grade, count]) => ({
      name: grade,
      value: count,
    })
  );

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">HR Dashboard</h1>
        <p className="text-indigo-100">
          Manage evaluation cycles, monitor institution-wide performance, and
          generate comprehensive reports.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Completed Evaluations"
          value={dashboardStats.completedEvaluations}
          icon={FileText}
          color="green"
        />
        <StatCard
          title="Pending Evaluations"
          value={dashboardStats.pendingEvaluations}
          icon={Calendar}
          color="yellow"
        />
        <StatCard
          title="Average Score"
          value={`${dashboardStats.averageScore.toFixed(1)}%`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Department Performance
            </h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Performance Grade Distribution
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Calendar className="w-8 h-8 text-blue-600 mb-3" />
            <p className="font-medium text-gray-900">Create Evaluation Cycle</p>
            <p className="text-sm text-gray-600">Start new performance cycle</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Users className="w-8 h-8 text-green-600 mb-3" />
            <p className="font-medium text-gray-900">Manage Employees</p>
            <p className="text-sm text-gray-600">
              Add or update employee records
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <FileText className="w-8 h-8 text-purple-600 mb-3" />
            <p className="font-medium text-gray-900">Generate Reports</p>
            <p className="text-sm text-gray-600">Create performance reports</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Settings className="w-8 h-8 text-gray-600 mb-3" />
            <p className="font-medium text-gray-900">System Settings</p>
            <p className="text-sm text-gray-600">Configure system parameters</p>
          </button>
        </div>
      </Card>

      {/* Recent Activities */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent System Activities
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                2024 Annual Performance Review cycle started
              </p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                15 new employees added to Computer Science department
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Performance report generated for Q3 2024
              </p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Department Overview */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Department Overview
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Total Staff
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Completed
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Average Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {dashboardStats.departmentPerformance.map((dept) => (
                <tr key={dept.department}>
                  <td className="py-3 text-sm text-gray-900">
                    {dept.department}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.totalCount}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.completedCount}
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {dept.averageScore.toFixed(1)}%
                  </td>
                  <td className="py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (dept.completedCount / dept.totalCount) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
