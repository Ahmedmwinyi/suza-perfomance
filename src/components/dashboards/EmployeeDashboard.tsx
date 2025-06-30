import {
  FileText,
  Clock,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card } from "../common/Card";
import { StatCard } from "../common/StatCard";
import { Badge } from "../common/Badge";
import { useAuth } from "../../contexts/AuthContext";
import { useEvaluation } from "../../contexts/EvaluationContenxt";

export function EmployeeDashboard() {
  const { user } = useAuth();
  const { getEvaluationsByUser } = useEvaluation();

  const userEvaluations = getEvaluationsByUser(user?.id || "");
  const currentEvaluation = userEvaluations.find(
    (e) => e.status === "draft" || e.status === "submitted"
  );
  const completedEvaluations = userEvaluations.filter(
    (e) => e.status === "finalized"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "warning";
      case "submitted":
        return "info";
      case "reviewed":
        return "primary";
      case "approved":
        return "success";
      case "finalized":
        return "success";
      default:
        return "secondary";
    }
  };

  const averageScore =
    completedEvaluations.length > 0
      ? completedEvaluations.reduce(
          (sum, evaluation) => sum + evaluation.finalScore,
          0
        ) / completedEvaluations.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-blue-100">
          Track your performance evaluations and career development progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Status"
          value={
            currentEvaluation
              ? currentEvaluation.status.replace("_", " ")
              : "No Active"
          }
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Completed Evaluations"
          value={completedEvaluations.length}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Average Score"
          value={averageScore > 0 ? `${averageScore.toFixed(1)}%` : "N/A"}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Performance Grade"
          value={
            completedEvaluations.length > 0
              ? completedEvaluations[0].finalGrade
              : "N/A"
          }
          icon={Award}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Evaluation */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Evaluation
            </h2>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>

          {currentEvaluation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Period:</span>
                <span className="font-medium">
                  {currentEvaluation.evaluationPeriod}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  variant={getStatusColor(currentEvaluation.status) as any}
                >
                  {currentEvaluation.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress:</span>
                <span className="font-medium">
                  {currentEvaluation.status === "draft"
                    ? "0%"
                    : currentEvaluation.status === "submitted"
                    ? "25%"
                    : currentEvaluation.status === "reviewed"
                    ? "50%"
                    : currentEvaluation.status === "approved"
                    ? "75%"
                    : "100%"}
                </span>
              </div>

              <div className="pt-4 border-t">
                {currentEvaluation.status === "draft" ? (
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Continue Self-Assessment
                  </button>
                ) : (
                  <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg cursor-not-allowed">
                    Waiting for Review
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No active evaluation cycle</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Start New Evaluation
              </button>
            </div>
          )}
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
            {currentEvaluation ? (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Evaluation created</p>
                    <p className="text-xs text-gray-500">
                      {currentEvaluation.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {currentEvaluation.submittedAt && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        Self-assessment submitted
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentEvaluation.submittedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Evaluation History */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Evaluation History
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>

        {completedEvaluations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Period
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Final Score
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Grade
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="pb-3 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {completedEvaluations.slice(0, 5).map((evaluation) => (
                  <tr key={evaluation.id}>
                    <td className="py-3 text-sm text-gray-900">
                      {evaluation.evaluationPeriod}
                    </td>
                    <td className="py-3 text-sm text-gray-900">
                      {evaluation.finalScore.toFixed(1)}%
                    </td>
                    <td className="py-3">
                      <Badge variant="success" size="sm">
                        {evaluation.finalGrade}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        variant={getStatusColor(evaluation.status) as any}
                        size="sm"
                      >
                        {evaluation.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No completed evaluations yet</p>
          </div>
        )}
      </Card>
    </div>
  );
}
