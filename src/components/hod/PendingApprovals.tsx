import { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Award,
  AlertTriangle,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format, differenceInDays } from "date-fns";

export default function PendingApprovals() {
  const { evaluations } = useEvaluation();
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(
    null
  );
  const [approvalAction, setApprovalAction] = useState<
    "approve" | "reject" | null
  >(null);

  const pendingApprovals = evaluations.filter((e) => e.status === "reviewed");

  const getUrgencyLevel = (reviewedDate: Date) => {
    const daysPending = differenceInDays(new Date(), reviewedDate);
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

  const handleApproval = (
    evaluationId: string,
    action: "approve" | "reject"
  ) => {
    setSelectedEvaluation(evaluationId);
    setApprovalAction(action);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Pending Approvals</h1>
        <p className="text-yellow-100">
          {pendingApprovals.length} evaluations awaiting your approval
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingApprovals.length}
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
                  pendingApprovals.filter(
                    (e) => getUrgencyLevel(e.reviewedAt!) === "high"
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
                  pendingApprovals.filter(
                    (e) => differenceInDays(new Date(), e.reviewedAt!) <= 7
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
              <p className="text-sm font-medium text-gray-600">
                High Performers
              </p>
              <p className="text-2xl font-bold text-green-600">
                {pendingApprovals.filter((e) => e.finalScore >= 81).length}
              </p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Pending Approvals List */}
      {pendingApprovals.length > 0 ? (
        <div className="space-y-4">
          {pendingApprovals.map((evaluation) => {
            const urgency = getUrgencyLevel(evaluation.reviewedAt!);
            const daysPending = differenceInDays(
              new Date(),
              evaluation.reviewedAt!
            );

            return (
              <Card key={evaluation.id} hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          Employee #{evaluation.employeeId}
                        </h3>
                        <Badge
                          variant={getUrgencyColor(urgency) as any}
                          size="sm"
                        >
                          {urgency.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge variant="info" size="sm">
                          Score: {evaluation.finalScore.toFixed(1)}%
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
                            Reviewed:{" "}
                            {format(evaluation.reviewedAt!, "MMM dd, yyyy")}
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
                      className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Review Details
                    </button>
                    <button
                      onClick={() => handleApproval(evaluation.id, "reject")}
                      className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproval(evaluation.id, "approve")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">
                        Responsibilities
                      </p>
                      <p className="text-lg font-bold text-blue-900">
                        {evaluation.b4_summary.b1Score}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">
                        Skills
                      </p>
                      <p className="text-lg font-bold text-green-900">
                        {evaluation.b4_summary.b2Score}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">
                        Conduct
                      </p>
                      <p className="text-lg font-bold text-purple-900">
                        {evaluation.b4_summary.b3Score}%
                      </p>
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
            <p className="text-gray-600">No pending approvals at this time.</p>
          </div>
        </Card>
      )}

      {/* Approval Modal */}
      {selectedEvaluation && approvalAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                {approvalAction === "approve" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  {approvalAction === "approve" ? "Approve" : "Reject"}{" "}
                  Evaluation
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to {approvalAction} this evaluation for
                Employee #{selectedEvaluation}?
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Add comments for this ${approvalAction}...`}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setSelectedEvaluation(null);
                    setApprovalAction(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-2 text-white rounded-lg transition-colors ${
                    approvalAction === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Confirm{" "}
                  {approvalAction === "approve" ? "Approval" : "Rejection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {selectedEvaluation && !approvalAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Evaluation Review - Employee #{selectedEvaluation}
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
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900 mb-2">
                    Approval Required
                  </h3>
                  <p className="text-sm text-yellow-800">
                    This evaluation has been reviewed by the appraiser and
                    requires your approval to proceed.
                  </p>
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
                  <button
                    onClick={() => handleApproval(selectedEvaluation, "reject")}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleApproval(selectedEvaluation, "approve")
                    }
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
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
