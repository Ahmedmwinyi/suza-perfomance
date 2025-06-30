import { useState } from "react";
import {
  Crown,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Award,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { format, differenceInDays } from "date-fns";

export default function FinalApprovals() {
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(
    null
  );
  const [approvalAction, setApprovalAction] = useState<
    "approve" | "reject" | null
  >(null);

  // Mock data for final approvals (evaluations approved by HoD)
  const finalApprovals = [
    {
      id: "1",
      employeeId: "1",
      employeeName: "Dr. Amina Hassan",
      department: "Computer Science",
      position: "Lecturer",
      finalScore: 89.5,
      finalGrade: "Nzuri Sana",
      recommendation: "Promotion to Senior Lecturer",
      hodApprovedAt: new Date("2024-12-10"),
      urgency: "high",
      status: "pending_final_approval",
    },
    {
      id: "2",
      employeeId: "2",
      employeeName: "Prof. Mohamed Ali",
      department: "Mathematics",
      position: "Professor",
      finalScore: 92.3,
      finalGrade: "Nzuri Sana",
      recommendation: "15% Salary Increase",
      hodApprovedAt: new Date("2024-12-08"),
      urgency: "medium",
      status: "pending_final_approval",
    },
    {
      id: "3",
      employeeId: "3",
      employeeName: "Dr. Fatma Omar",
      department: "Physics",
      position: "Senior Lecturer",
      finalScore: 85.7,
      finalGrade: "Nzuri Sana",
      recommendation: "Recognition Award",
      hodApprovedAt: new Date("2024-12-12"),
      urgency: "low",
      status: "pending_final_approval",
    },
  ];

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

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes("Promotion")) return "success";
    if (recommendation.includes("Salary")) return "primary";
    if (recommendation.includes("Recognition")) return "warning";
    return "secondary";
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
      <div className="bg-gradient-to-r from-gold-600 to-gold-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Final Approvals</h1>
        <p className="text-gold-100">
          {finalApprovals.length} evaluations awaiting your final approval and
          authorization
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Final Approval
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {finalApprovals.length}
              </p>
            </div>
            <Crown className="w-8 h-8 text-gold-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {finalApprovals.filter((e) => e.urgency === "high").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promotions</p>
              <p className="text-2xl font-bold text-green-600">
                {
                  finalApprovals.filter((e) =>
                    e.recommendation.includes("Promotion")
                  ).length
                }
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-blue-600">
                {(
                  finalApprovals.reduce((sum, e) => sum + e.finalScore, 0) /
                  finalApprovals.length
                ).toFixed(1)}
                %
              </p>
            </div>
            <Award className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Final Approvals List */}
      {finalApprovals.length > 0 ? (
        <div className="space-y-4">
          {finalApprovals.map((evaluation) => {
            const daysPending = differenceInDays(
              new Date(),
              evaluation.hodApprovedAt
            );

            return (
              <Card key={evaluation.id} hover>
                <div className="border-l-4 border-gold-500 pl-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {evaluation.employeeName}
                          </h3>
                          <Badge
                            variant={getUrgencyColor(evaluation.urgency) as any}
                            size="sm"
                          >
                            {evaluation.urgency.toUpperCase()} PRIORITY
                          </Badge>
                          <Badge variant="success" size="sm">
                            Score: {evaluation.finalScore}% (
                            {evaluation.finalGrade})
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>
                              {evaluation.position} - {evaluation.department}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              HoD Approved:{" "}
                              {format(evaluation.hodApprovedAt, "MMM dd, yyyy")}
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
                        className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                      >
                        Final Approve
                      </button>
                    </div>
                  </div>

                  {/* Recommendation Highlight */}
                  <div className="bg-gold-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gold-900">
                          Recommended Action
                        </p>
                        <p className="text-sm text-gold-700">
                          {evaluation.recommendation}
                        </p>
                      </div>
                      <Badge
                        variant={
                          getRecommendationColor(
                            evaluation.recommendation
                          ) as any
                        }
                      >
                        {evaluation.recommendation.split(" ")[0]}
                      </Badge>
                    </div>
                  </div>

                  {/* Performance Summary */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">
                        Responsibilities
                      </p>
                      <p className="text-lg font-bold text-blue-900">85%</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">
                        Skills
                      </p>
                      <p className="text-lg font-bold text-green-900">88%</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">
                        Conduct
                      </p>
                      <p className="text-lg font-bold text-purple-900">95%</p>
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
              All Approvals Complete!
            </h3>
            <p className="text-gray-600">
              No evaluations pending final approval at this time.
            </p>
          </div>
        </Card>
      )}

      {/* Approval Action Modal */}
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
                  Final{" "}
                  {approvalAction === "approve" ? "Approval" : "Rejection"}
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to {approvalAction} this evaluation? This
                action will be final and cannot be undone.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Executive Comments
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Add your executive comments for this ${approvalAction}...`}
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
                      ? "bg-gold-600 hover:bg-gold-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Confirm{" "}
                  {approvalAction === "approve"
                    ? "Final Approval"
                    : "Rejection"}
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
                  Final Approval Review -{" "}
                  {
                    finalApprovals.find((e) => e.id === selectedEvaluation)
                      ?.employeeName
                  }
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
              {(() => {
                const evaluation = finalApprovals.find(
                  (e) => e.id === selectedEvaluation
                );
                if (!evaluation) return null;

                return (
                  <div className="space-y-6">
                    <div className="bg-gold-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gold-900 mb-2">
                        Executive Decision Required
                      </h3>
                      <p className="text-sm text-gold-800">
                        This evaluation has been approved by the Head of
                        Department and requires your final authorization.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Employee Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Name:</span>{" "}
                            {evaluation.employeeName}
                          </div>
                          <div>
                            <span className="text-gray-600">Position:</span>{" "}
                            {evaluation.position}
                          </div>
                          <div>
                            <span className="text-gray-600">Department:</span>{" "}
                            {evaluation.department}
                          </div>
                          <div>
                            <span className="text-gray-600">Employee ID:</span>{" "}
                            {evaluation.employeeId}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Performance Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Final Score:</span>{" "}
                            {evaluation.finalScore}%
                          </div>
                          <div>
                            <span className="text-gray-600">Grade:</span>{" "}
                            {evaluation.finalGrade}
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Recommendation:
                            </span>{" "}
                            {evaluation.recommendation}
                          </div>
                          <div>
                            <span className="text-gray-600">HoD Approved:</span>{" "}
                            {format(evaluation.hodApprovedAt, "MMM dd, yyyy")}
                          </div>
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
                        <p className="text-2xl font-bold text-green-900">88%</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600 font-medium">
                          B3: Conduct
                        </p>
                        <p className="text-2xl font-bold text-purple-900">
                          95%
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
                      <button
                        onClick={() =>
                          handleApproval(selectedEvaluation, "reject")
                        }
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleApproval(selectedEvaluation, "approve")
                        }
                        className="px-6 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                      >
                        Final Approve
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
