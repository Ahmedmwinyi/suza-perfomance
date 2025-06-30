/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  CheckCircle,
  Eye,
  Download,
  Search,
  Filter,
  Award,
  TrendingUp,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format } from "date-fns";

export function CompletedReviews() {
  const { evaluations } = useEvaluation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(
    null
  );

  const completedEvaluations = evaluations.filter(
    (e) =>
      e.status === "reviewed" ||
      e.status === "approved" ||
      e.status === "finalized"
  );

  const filteredEvaluations = completedEvaluations.filter((evaluation) => {
    const matchesSearch = evaluation.evaluationPeriod
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterGrade === "all" || evaluation.finalGrade === filterGrade;
    return matchesSearch && matchesFilter;
  });

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Nzuri Sana":
        return "success";
      case "Nzuri":
        return "primary";
      case "Inaridhisha":
        return "warning";
      case "Hairidhishi":
        return "error";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const averageScore =
    completedEvaluations.length > 0
      ? completedEvaluations.reduce(
          (sum, evaluation) => sum + evaluation.finalScore,
          0
        ) / completedEvaluations.length
      : 0;

  const gradeDistribution = completedEvaluations.reduce((acc, evaluation) => {
    acc[evaluation.finalGrade] = (acc[evaluation.finalGrade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Completed Reviews</h1>
        <p className="text-green-100">
          {completedEvaluations.length} evaluations completed and processed
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {completedEvaluations.length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageScore.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Excellent Grades
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {gradeDistribution["Nzuri Sana"] || 0}
              </p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Year</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  completedEvaluations.filter(
                    (e) => e.evaluationPeriod === "2024"
                  ).length
                }
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Grade Distribution */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Grade Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <div key={grade} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600">{grade}</p>
              <div className="mt-2">
                <Badge variant={getGradeColor(grade) as any} size="sm">
                  {Math.round((count / completedEvaluations.length) * 100)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by period..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Grades</option>
                <option value="Nzuri Sana">Nzuri Sana</option>
                <option value="Nzuri">Nzuri</option>
                <option value="Inaridhisha">Inaridhisha</option>
                <option value="Hairidhishi">Hairidhishi</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Completed Reviews List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Employee
                </th>
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
                  Completed
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredEvaluations.length > 0 ? (
                filteredEvaluations.map((evaluation) => (
                  <tr key={evaluation.id} className="hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {evaluation.employeeId}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">
                          Employee #{evaluation.employeeId}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      {evaluation.evaluationPeriod}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {evaluation.finalScore.toFixed(1)}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${evaluation.finalScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={getGradeColor(evaluation.finalGrade) as any}
                      >
                        {evaluation.finalGrade}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={getStatusColor(evaluation.status) as any}
                        size="sm"
                      >
                        {evaluation.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {evaluation.reviewedAt
                        ? format(evaluation.reviewedAt, "MMM dd, yyyy")
                        : "N/A"}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedEvaluation(evaluation.id)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    {completedEvaluations.length === 0 ? (
                      <div>
                        <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p>No completed reviews yet</p>
                      </div>
                    ) : (
                      <p>No reviews match your search criteria</p>
                    )}
                  </td>
                </tr>
              )}
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
                  Evaluation Details - Employee #{selectedEvaluation}
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
              {/* Evaluation details would go here */}
              <div className="space-y-6">
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

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Review Summary
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      This evaluation has been completed and processed. The
                      employee demonstrated excellent performance across all
                      areas with particular strength in conduct and discipline.
                      Recommendations have been forwarded to the Head of
                      Department.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={() => setSelectedEvaluation(null)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Export PDF
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
