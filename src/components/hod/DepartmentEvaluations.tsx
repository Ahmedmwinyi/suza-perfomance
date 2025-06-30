import { useState } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Filter,
  Search,
  Award,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format } from "date-fns";

export default function DepartmentEvaluations() {
  const { evaluations, dashboardStats } = useEvaluation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(
    null
  );

  // Mock department data - in real app, this would be filtered by user's department
  const departmentEvaluations = evaluations.filter((e) => e.employeeId !== "5"); // Exclude institution head

  const filteredEvaluations = departmentEvaluations.filter((evaluation) => {
    const matchesSearch = evaluation.evaluationPeriod
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || evaluation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
      case "draft":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const pendingCount = departmentEvaluations.filter(
    (e) => e.status === "reviewed"
  ).length;
  const completedCount = departmentEvaluations.filter(
    (e) => e.status === "approved" || e.status === "finalized"
  ).length;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Department Evaluations</h1>
        <p className="text-purple-100">
          Monitor and manage performance evaluations in your department
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.totalEmployees}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Approval
              </p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedCount}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dept. Average</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.averageScore.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Department Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(dashboardStats.gradeDistribution).map(
            ([grade, count]) => (
              <div
                key={grade}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">{grade}</p>
                <div className="mt-2">
                  <Badge variant="primary" size="sm">
                    {Math.round((count / dashboardStats.totalEmployees) * 100)}%
                  </Badge>
                </div>
              </div>
            )
          )}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search evaluations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="finalized">Finalized</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Evaluations List */}
      <Card>
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
                  Period
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Last Updated
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {evaluation.employeeId}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Employee #{evaluation.employeeId}
                        </p>
                        <p className="text-sm text-gray-500">
                          Computer Science
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">Lecturer</td>
                  <td className="py-4 text-sm text-gray-900">
                    {evaluation.evaluationPeriod}
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getStatusColor(evaluation.status)}
                      size="sm"
                    >
                      {evaluation.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm text-gray-900">
                    {evaluation.finalScore > 0
                      ? `${evaluation.finalScore.toFixed(1)}%`
                      : "-"}
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {format(evaluation.updatedAt, "MMM dd, yyyy")}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => setSelectedEvaluation(evaluation.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Department Evaluation Details
                </h2>
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">
                    Evaluation Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-700">Employee:</span>{" "}
                      Employee #{selectedEvaluation}
                    </div>
                    <div>
                      <span className="text-purple-700">Status:</span> Under
                      Review
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">
                      B1: Responsibilities
                    </p>
                    <p className="text-2xl font-bold text-blue-900">85%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">
                      B2: Skills
                    </p>
                    <p className="text-2xl font-bold text-green-900">80%</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">
                      B3: Conduct
                    </p>
                    <p className="text-2xl font-bold text-purple-900">90%</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={() => setSelectedEvaluation(null)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
