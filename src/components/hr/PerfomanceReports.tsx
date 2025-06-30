import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  Award,
  BarChart3,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";

export default function PerfomanceReports() {
  const { dashboardStats } = useEvaluation();
  const [selectedPeriod, setSelectedPeriod] = useState("2025");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [reportType, setReportType] = useState("summary");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Performance Reports</h1>
        <p className="text-purple-100">
          Generate comprehensive performance reports and analytics
        </p>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="summary">Summary Report</option>
                <option value="detailed">Detailed Analysis</option>
                <option value="trends">Performance Trends</option>
                <option value="comparison">Department Comparison</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Overall Average
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.averageScore.toFixed(1)}%
              </p>
              <p className="text-sm text-green-600">+3.2% from last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Evaluated
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.completedEvaluations}
              </p>
              <p className="text-sm text-blue-600">
                {Math.round(
                  (dashboardStats.completedEvaluations /
                    dashboardStats.totalEmployees) *
                    100
                )}
                % completion
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Top Performers
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.gradeDistribution["Nzuri Sana"]}
              </p>
              <p className="text-sm text-yellow-600">Excellent grade</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.departmentPerformance.length}
              </p>
              <p className="text-sm text-purple-600">Active departments</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      

      

      {/* Detailed Performance Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Department Performance Details
          </h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View Full Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Total Staff
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Completed
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Average Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Top Grade
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Progress
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {dashboardStats.departmentPerformance.map((dept) => (
                <tr key={dept.department}>
                  <td className="py-3 text-sm font-medium text-gray-900">
                    {dept.department}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.totalCount}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.completedCount}
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {dept.averageScore.toFixed(1)}%
                  </td>
                  <td className="py-3">
                    <Badge variant="success" size="sm">
                      Nzuri Sana
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (dept.completedCount / dept.totalCount) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-green-600 text-sm">↗ +2.1%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Report Templates */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Report Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <p className="font-medium text-gray-900">Executive Summary</p>
            <p className="text-sm text-gray-600">
              High-level performance overview for leadership
            </p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
            <p className="font-medium text-gray-900">Department Analysis</p>
            <p className="text-sm text-gray-600">
              Detailed breakdown by department
            </p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
            <p className="font-medium text-gray-900">Trend Analysis</p>
            <p className="text-sm text-gray-600">
              Performance trends over time
            </p>
          </button>
        </div>
      </Card>

      {/* Insights and Recommendations */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Key Insights & Recommendations
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-green-900">
                Strong Overall Performance
              </p>
              <p className="text-sm text-green-700">
                Institution average of {dashboardStats.averageScore.toFixed(1)}%
                indicates strong performance across departments. Consider
                implementing recognition programs for top performers.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-blue-900">Department Variations</p>
              <p className="text-sm text-blue-700">
                Performance varies across departments. Focus on knowledge
                sharing between high and low performing departments.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-yellow-900">Completion Rate</p>
              <p className="text-sm text-yellow-700">
                {Math.round(
                  (dashboardStats.completedEvaluations /
                    dashboardStats.totalEmployees) *
                    100
                )}
                % completion rate. Consider sending reminders to departments
                with pending evaluations.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
