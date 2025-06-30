import { useState } from "react";
import {
  Calendar,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Award,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useAuth } from "../../contexts/AuthContext";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format } from "date-fns";

export function EvaluationHistory() {
  const { user } = useAuth();
  const { getEvaluationsByUser } = useEvaluation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(
    null
  );

  const userEvaluations = getEvaluationsByUser(user?.id || "");
  const completedEvaluations = userEvaluations.filter(
    (e) => e.status === "finalized"
  );

  const filteredEvaluations = completedEvaluations.filter((evaluation) => {
    const matchesSearch = evaluation.evaluationPeriod
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || evaluation.finalGrade === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Very Good":
        return "success";
      case "Nzuri":
        return "primary";
      case "Fair":
        return "warning";
      case "Poor":
        return "error";
      default:
        return "secondary";
    }
  };

  const getGradeDescription = (grade: string) => {
    switch (grade) {
      case "Very Good":
        return "Excellent (81-100%)";
      case "Good":
        return "Good (65-80%)";
      case "Fair":
        return "Satisfactory (50-64%)";
      case "Poor":
        return "Unsatisfactory (0-49%)";
      default:
        return "";
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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Evaluation History</h1>
        <p className="text-purple-100">
          Review your past performance evaluations and track your progress
        </p>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Evaluations
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {completedEvaluations.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Latest Grade</p>
              <p className="text-lg font-bold text-gray-900">
                {completedEvaluations.length > 0
                  ? completedEvaluations[0].finalGrade
                  : "N/A"}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by period..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Grades</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
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
                  Period
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Final Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Grade
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Completed Date
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
                    <td className="py-4 text-sm font-medium text-gray-900">
                      {evaluation.evaluationPeriod}
                    </td>
                    <td className="py-4 text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
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
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        variant={getGradeColor(evaluation.finalGrade) as any}
                      >
                        {evaluation.finalGrade}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {getGradeDescription(evaluation.finalGrade)}
                      </p>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {evaluation.finalizedAt
                        ? format(evaluation.finalizedAt, "MMM dd, yyyy")
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
                          <span>Download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    {completedEvaluations.length === 0 ? (
                      <div>
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p>No completed evaluations yet</p>
                      </div>
                    ) : (
                      <p>No evaluations match your search criteria</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Performance Trend Chart Placeholder */}
      {completedEvaluations.length > 1 && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Performance Trend
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>

          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Performance trend chart would be displayed here
              </p>
              <p className="text-sm text-gray-500">
                Showing progress over {completedEvaluations.length} evaluations
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Detailed View Modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Evaluation Details -{" "}
                  {
                    filteredEvaluations.find((e) => e.id === selectedEvaluation)
                      ?.evaluationPeriod
                  }
                </h2>
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Detailed evaluation content would go here */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">
                      B1: Responsibilities
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {
                        filteredEvaluations.find(
                          (e) => e.id === selectedEvaluation
                        )?.b4_summary.b1Score
                      }
                      %
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">
                      B2: Skills
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                      {
                        filteredEvaluations.find(
                          (e) => e.id === selectedEvaluation
                        )?.b4_summary.b2Score
                      }
                      %
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">
                      B3: Conduct
                    </p>
                    <p className="text-2xl font-bold text-purple-900">
                      {
                        filteredEvaluations.find(
                          (e) => e.id === selectedEvaluation
                        )?.b4_summary.b3Score
                      }
                      %
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Strengths:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {filteredEvaluations
                          .find((e) => e.id === selectedEvaluation)
                          ?.b4_summary.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Areas for Improvement:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {filteredEvaluations
                          .find((e) => e.id === selectedEvaluation)
                          ?.b4_summary.areasForImprovement.map(
                            (area, index) => (
                              <li key={index}>{area}</li>
                            )
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
