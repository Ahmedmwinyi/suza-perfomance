import { useState } from "react";
import {
  Clock,
  AlertTriangle,
  User,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format, differenceInDays } from "date-fns";

export function PendingReviews() {
  const { evaluations } = useEvaluation();
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(
    null
  );

  const pendingEvaluations = evaluations.filter(
    (e) => e.status === "submitted"
  );

  const getUrgencyLevel = (submittedDate: Date) => {
    const daysPending = differenceInDays(new Date(), submittedDate);
    if (daysPending > 7) return "high";
    if (daysPending > 3) return "medium";
    return "low";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "Urgent";
      case "medium":
        return "Medium";
      case "low":
        return "Normal";
      default:
        return "Normal";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Pending Reviews</h1>
        <p className="text-yellow-100">
          {pendingEvaluations.length} evaluations waiting for your review
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingEvaluations.length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">
                {
                  pendingEvaluations.filter(
                    (e) => getUrgencyLevel(e.submittedAt!) === "high"
                  ).length
                }
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">
                {
                  pendingEvaluations.filter(
                    (e) => differenceInDays(new Date(), e.submittedAt!) <= 7
                  ).length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Days</p>
              <p className="text-2xl font-bold text-purple-600">
                {pendingEvaluations.length > 0
                  ? Math.round(
                      pendingEvaluations.reduce(
                        (sum, e) =>
                          sum + differenceInDays(new Date(), e.submittedAt!),
                        0
                      ) / pendingEvaluations.length
                    )
                  : 0}
              </p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Pending Reviews List */}
      {pendingEvaluations.length > 0 ? (
        <div className="space-y-4">
          {pendingEvaluations.map((evaluation) => {
            const urgency = getUrgencyLevel(evaluation.submittedAt!);
            const daysPending = differenceInDays(
              new Date(),
              evaluation.submittedAt!
            );

            return (
              <Card key={evaluation.id} hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          Employee #{evaluation.employeeId}
                        </h3>
                        <Badge
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          variant={getUrgencyColor(urgency) as any}
                          size="sm"
                        >
                          {getUrgencyLabel(urgency)}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Period: {evaluation.evaluationPeriod}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            Submitted:{" "}
                            {format(evaluation.submittedAt!, "MMM dd, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{daysPending} days pending</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedEvaluation(evaluation.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Review Now
                    </button>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sections to review:</span>
                    <div className="flex space-x-4">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>B1: Responsibilities</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>B2: Skills</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>B3: Conduct</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-600">
              No pending evaluations to review at this time.
            </p>
          </div>
        </Card>
      )}

      {/* Review Modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Review Evaluation - Employee #{selectedEvaluation}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Employee Self-Assessment */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Employee Self-Assessment
                  </h3>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        B1: Job Responsibilities
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Target:
                          </span>
                          <p className="text-gray-600 mt-1">
                            Teach undergraduate courses effectively
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Actual Performance:
                          </span>
                          <p className="text-gray-600 mt-1">
                            Successfully delivered all assigned courses with
                            high student satisfaction
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Employee Comment:
                          </span>
                          <p className="text-gray-600 mt-1">
                            Maintained excellent teaching standards throughout
                            the period
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        B2: Skills & Abilities
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Communication:</span>{" "}
                          Excellent interaction with students
                        </p>
                        <p>
                          <span className="font-medium">Problem Solving:</span>{" "}
                          Effective resolution of academic issues
                        </p>
                        <p>
                          <span className="font-medium">Teamwork:</span> Good
                          collaboration with colleagues
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        B3: Conduct & Discipline
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Attendance:</span>{" "}
                          Excellent punctuality and presence
                        </p>
                        <p>
                          <span className="font-medium">
                            Professional Ethics:
                          </span>{" "}
                          Maintained high ethical standards
                        </p>
                        <p>
                          <span className="font-medium">
                            Workplace Behavior:
                          </span>{" "}
                          Positive and professional demeanor
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appraiser Review Form */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Review & Scoring
                  </h3>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        B1: Job Responsibilities (60%)
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Score (0-100)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="85"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appraiser Comments
                          </label>
                          <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide detailed feedback on job responsibilities..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        B2: Skills & Abilities (30%)
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Score (0-100)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="80"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appraiser Comments
                          </label>
                          <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Assess skills and abilities..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        B3: Conduct & Discipline (10%)
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Score (0-100)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="90"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appraiser Comments
                          </label>
                          <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Evaluate conduct and discipline..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Overall Assessment
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recommendations
                          </label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select recommendation</option>
                            <option value="salary_increase">
                              Salary Increase
                            </option>
                            <option value="promotion">Promotion</option>
                            <option value="training">
                              Additional Training
                            </option>
                            <option value="recognition">
                              Recognition/Award
                            </option>
                            <option value="no_action">
                              No Action Required
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Overall Comments
                          </label>
                          <textarea
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide overall assessment and recommendations..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  Save Draft
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
