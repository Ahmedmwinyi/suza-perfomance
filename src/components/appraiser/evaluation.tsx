/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  Users,
  FileText,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useAuth } from "../../contexts/AuthContext";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format } from "date-fns";

export function EmployeeEvaluations() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const { evaluations } = useEvaluation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  // Mock assigned employees for appraiser
  const assignedEmployees = [
    {
      id: "1",
      name: "Amina Hassan",
      position: "Lecturer",
      department: "Computer Science",
    },
    {
      id: "6",
      name: "Said Mwalimu",
      position: "Assistant Lecturer",
      department: "Computer Science",
    },
    {
      id: "7",
      name: "Fatma Omar",
      position: "Senior Lecturer",
      department: "Computer Science",
    },
    {
      id: "8",
      name: "Ali Khamis",
      position: "Lecturer",
      department: "Computer Science",
    },
  ];

  const employeeEvaluations = assignedEmployees.map((employee) => {
    const evaluation = evaluations.find((e) => e.employeeId === employee.id);
    return {
      ...employee,
      evaluation,
      status: evaluation?.status || "not_started",
      lastUpdated: evaluation?.updatedAt || new Date(),
      score: evaluation?.finalScore || 0,
    };
  });

  const filteredEmployees = employeeEvaluations.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || employee.status === filterStatus;
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
      case "not_started":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "submitted":
        return "Pending Review";
      case "reviewed":
        return "Reviewed";
      case "approved":
        return "Approved";
      case "finalized":
        return "Finalized";
      case "not_started":
        return "Not Started";
      default:
        return status;
    }
  };

  const pendingCount = employeeEvaluations.filter(
    (e) => e.status === "submitted"
  ).length;
  const completedCount = employeeEvaluations.filter(
    (e) =>
      e.status === "reviewed" ||
      e.status === "approved" ||
      e.status === "finalized"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Employee Evaluations</h1>
        <p className="text-green-100">
          Review and evaluate your assigned team members' performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Assigned
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {assignedEmployees.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Review
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
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((completedCount / assignedEmployees.length) * 100)}%
              </p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search employees..."
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
                <option value="not_started">Not Started</option>
                <option value="submitted">Pending Review</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="finalized">Finalized</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Employee List */}
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
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {employee.department}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {employee.position}
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getStatusColor(employee.status) as any}
                      size="sm"
                    >
                      {getStatusLabel(employee.status)}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm text-gray-900">
                    {employee.score > 0 ? `${employee.score.toFixed(1)}%` : "-"}
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {format(employee.lastUpdated, "MMM dd, yyyy")}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      {employee.status === "submitted" ? (
                        <button
                          onClick={() => setSelectedEmployee(employee.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Review</span>
                        </button>
                      ) : employee.status === "not_started" ? (
                        <span className="text-sm text-gray-500">
                          Waiting for submission
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedEmployee(employee.id)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Review Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Review Evaluation -{" "}
                  {
                    filteredEmployees.find((e) => e.id === selectedEmployee)
                      ?.name
                  }
                </h2>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Employee Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Name:</span>{" "}
                      {
                        filteredEmployees.find((e) => e.id === selectedEmployee)
                          ?.name
                      }
                    </div>
                    <div>
                      <span className="text-blue-700">Position:</span>{" "}
                      {
                        filteredEmployees.find((e) => e.id === selectedEmployee)
                          ?.position
                      }
                    </div>
                  </div>
                </div>

                {/* Evaluation sections would go here */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    B1: Job Responsibilities (60%)
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Review the employee's self-assessment and provide your
                      evaluation.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Appraiser Score (0-100)
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
                          placeholder="Provide your assessment and feedback..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Submit Review
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
