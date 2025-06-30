import { useState } from "react";
import {
  Calendar,
  Plus,
  Play,
  Pause,
  Settings,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { format, differenceInDays } from "date-fns";

export default function EvaluationCycle() {
  const { cycles } = useEvaluation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "primary";
      case "draft":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getProgressPercentage = (cycle: any) => {
    return Math.round(
      (cycle.completedEvaluations / cycle.totalEmployees) * 100
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Evaluation Cycles</h1>
        <p className="text-blue-100">
          Create and manage performance evaluation cycles
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cycles</p>
              <p className="text-2xl font-bold text-gray-900">
                {cycles.filter((c) => c.status === "active").length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {cycles.reduce((sum, cycle) => sum + cycle.totalEmployees, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {cycles.reduce(
                  (sum, cycle) => sum + cycle.completedEvaluations,
                  0
                )}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {cycles.length > 0
                  ? Math.round(
                      (cycles.reduce(
                        (sum, cycle) => sum + cycle.completedEvaluations,
                        0
                      ) /
                        cycles.reduce(
                          (sum, cycle) => sum + cycle.totalEmployees,
                          0
                        )) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Evaluation Cycles
            </h2>
            <p className="text-sm text-gray-600">
              Manage performance evaluation periods and assignments
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Cycle</span>
          </button>
        </div>
      </Card>

      {/* Cycles List */}
      <div className="space-y-4">
        {cycles.map((cycle) => (
          <Card key={cycle.id} hover>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cycle.name}
                  </h3>
                  <Badge variant={getStatusColor(cycle.status) as any}>
                    {cycle.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(cycle.startDate, "MMM dd, yyyy")} -{" "}
                      {format(cycle.endDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{cycle.totalEmployees} employees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{cycle.completedEvaluations} completed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {differenceInDays(cycle.endDate, new Date())} days
                      remaining
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {getProgressPercentage(cycle)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(cycle)}%` }}
                    />
                  </div>
                </div>

                {/* Departments */}
                <div className="flex flex-wrap gap-2">
                  {cycle.departments.map((dept) => (
                    <Badge key={dept} variant="secondary" size="sm">
                      {dept}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-6">
                <button
                  onClick={() => setSelectedCycle(cycle.id)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                {cycle.status === "active" ? (
                  <button className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors">
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Cycle Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create New Evaluation Cycle
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cycle Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2024 Annual Performance Review"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departments
                  </label>
                  <div className="space-y-2">
                    {[
                      "Computer Science",
                      "Mathematics",
                      "Physics",
                      "Chemistry",
                      "Biology",
                    ].map((dept) => (
                      <label key={dept} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the evaluation cycle objectives and guidelines..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Cycle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cycle Details Modal */}
      {selectedCycle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cycle Details
                </h2>
                <button
                  onClick={() => setSelectedCycle(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {(() => {
                const cycle = cycles.find((c) => c.id === selectedCycle);
                if (!cycle) return null;

                return (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">
                        {cycle.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700">Status:</span>{" "}
                          {cycle.status}
                        </div>
                        <div>
                          <span className="text-blue-700">Progress:</span>{" "}
                          {getProgressPercentage(cycle)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">
                          Total Employees
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {cycle.totalEmployees}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">
                          Completed
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          {cycle.completedEvaluations}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-600 font-medium">
                          Remaining
                        </p>
                        <p className="text-2xl font-bold text-yellow-900">
                          {cycle.totalEmployees - cycle.completedEvaluations}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                      <button
                        onClick={() => setSelectedCycle(null)}
                        className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Cycle
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
