import {
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Card } from "../common/Card";
import { StatCard } from "../common/StatCard";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";

export function AppraiserDashboard() {
  const { evaluations } = useEvaluation();

  // Mock data for appraiser's assigned employees
  const pendingReviews = evaluations.filter((e) => e.status === "submitted");
  const completedReviews = evaluations.filter(
    (e) =>
      e.status === "reviewed" ||
      e.status === "approved" ||
      e.status === "finalized"
  );
  const totalAssigned = 8; // Mock number

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "warning";
      case "reviewed":
        return "info";
      case "approved":
        return "success";
      case "finalized":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Appraiser Dashboard</h1>
        <p className="text-green-100">
          Review and evaluate your team members' performance assessments.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Employees"
          value={totalAssigned}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingReviews.length}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Completed Reviews"
          value={completedReviews.length}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Completion Rate"
          value={`${Math.round(
            (completedReviews.length / totalAssigned) * 100
          )}%`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reviews */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Reviews
            </h2>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>

          <div className="space-y-4">
            {pendingReviews.length > 0 ? (
              pendingReviews.slice(0, 5).map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      Employee #{evaluation.employeeId}
                    </h3>
                    <Badge
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      variant={getStatusColor(evaluation.status) as any}
                      size="sm"
                    >
                      {evaluation.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Period: {evaluation.evaluationPeriod}</span>
                    <span>
                      Submitted: {evaluation.submittedAt?.toLocaleDateString()}
                    </span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Review Evaluation
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">All evaluations reviewed!</p>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  Completed review for Amina Hassan
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  New evaluation received from Mohamed Ali
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  Reminder: 3 evaluations due this week
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Review Evaluations</p>
              <p className="text-sm text-gray-600">
                Review pending evaluations
              </p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Team Overview</p>
              <p className="text-sm text-gray-600">
                View all assigned employees
              </p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Performance Reports</p>
              <p className="text-sm text-gray-600">Generate team reports</p>
            </div>
          </button>
        </div>
      </Card>

      {/* Team Performance Overview */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Team Performance Overview
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
                  Employee
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Position
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 text-sm text-gray-900">Amina Hassan</td>
                <td className="py-3 text-sm text-gray-600">Lecturer</td>
                <td className="py-3">
                  <Badge variant="warning" size="sm">
                    SUBMITTED
                  </Badge>
                </td>
                <td className="py-3 text-sm text-gray-900">-</td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    Review
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-900">Said Mwalimu</td>
                <td className="py-3 text-sm text-gray-600">
                  Assistant Lecturer
                </td>
                <td className="py-3">
                  <Badge variant="success" size="sm">
                    REVIEWED
                  </Badge>
                </td>
                <td className="py-3 text-sm text-gray-900">78.5%</td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    View
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
