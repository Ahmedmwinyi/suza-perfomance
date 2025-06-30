import {
  Users,
  TrendingUp,
  Clock,
  FileText,
} from "lucide-react";
import { Card } from "../common/Card";
import { StatCard } from "../common/StatCard";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";

export function HoDDashboard() {
  const { dashboardStats } = useEvaluation();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Head of Department Dashboard
        </h1>
        <p className="text-purple-100">
          Monitor and approve performance evaluations across your department.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Department Staff"
          value={dashboardStats.totalEmployees}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={dashboardStats.pendingEvaluations}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Completed Evaluations"
          value={dashboardStats.completedEvaluations}
          icon={FileText}
          color="green"
        />
        <StatCard
          title="Department Average"
          value={`${dashboardStats.averageScore.toFixed(1)}%`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Approvals
            </h2>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Amina Hassan</h3>
                <Badge variant="info" size="sm">
                  REVIEWED
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Lecturer - Computer Science</span>
                <span>Score: 83.5%</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Approve
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Review
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Mohamed Ali</h3>
                <Badge variant="info" size="sm">
                  REVIEWED
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Senior Lecturer - Computer Science</span>
                <span>Score: 76.2%</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Approve
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Review
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Department Performance */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Department Performance
            </h2>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">
                  Excellent Performance
                </p>
                <p className="text-sm text-green-700">Nzuri Sana (81-100%)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-900">
                  {dashboardStats.gradeDistribution["Very Good"]}
                </p>
                <p className="text-sm text-green-700">employees</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Good Performance</p>
                <p className="text-sm text-blue-700">Nzuri (65-80%)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">
                  {dashboardStats.gradeDistribution["Good"]}
                </p>
                <p className="text-sm text-blue-700">employees</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-yellow-900">Satisfactory</p>
                <p className="text-sm text-yellow-700">Inaridhisha (50-64%)</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-900">
                  {dashboardStats.gradeDistribution["Fair"]}
                </p>
                <p className="text-sm text-yellow-700">employees</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Department Activities
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
                Approved evaluation for Amina Hassan
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                New evaluation received for review
              </p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Department performance report generated
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Staff Overview */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Staff Overview
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Manage Staff
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Employee
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Position
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Last Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 text-sm text-gray-900">Dr. Amina Hassan</td>
                <td className="py-3 text-sm text-gray-600">Lecturer</td>
                <td className="py-3">
                  <Badge variant="info" size="sm">
                    REVIEWED
                  </Badge>
                </td>
                <td className="py-3 text-sm text-gray-900">83.5%</td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Dr. Mohamed Ali</td>
                <td className="py-3 text-sm text-gray-600">Senior Lecturer</td>
                <td className="py-3">
                  <Badge variant="success" size="sm">
                    APPROVED
                  </Badge>
                </td>
                <td className="py-3 text-sm text-gray-900">76.2%</td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
