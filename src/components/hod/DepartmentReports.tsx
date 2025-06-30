import { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  Award,
  FileText,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";


export default function DepartmentReports() {
  const { dashboardStats } = useEvaluation();
  const [selectedPeriod, setSelectedPeriod] = useState("2025");
  const [reportType, setReportType] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Department Reports</h1>
        <p className="text-indigo-100">
          Comprehensive performance analytics and insights for your department
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
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="overview">Overview</option>
                <option value="performance">Performance Trends</option>
                <option value="comparison">Department Comparison</option>
                <option value="individual">Individual Analysis</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                Department Average
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.averageScore.toFixed(1)}%
              </p>
              <p className="text-sm text-green-600">+5.2% from last period</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.totalEmployees}
              </p>
              <p className="text-sm text-blue-600">Active evaluations</p>
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
                {dashboardStats.gradeDistribution["Very Good"]}
              </p>
              <p className="text-sm text-yellow-600">Excellent grade</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Completion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (dashboardStats.completedEvaluations /
                    dashboardStats.totalEmployees) *
                    100
                )}
                %
              </p>
              <p className="text-sm text-purple-600">On track</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>


      {/* Detailed Performance Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Performance Summary
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Details
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Grade
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Count
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Percentage
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Score Range
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {Object.entries(dashboardStats.gradeDistribution).map(
                ([grade, count]) => (
                  <tr key={grade}>
                    <td className="py-3">
                      <Badge
                        variant={
                          grade === "Nzuri Sana"
                            ? "success"
                            : grade === "Nzuri"
                            ? "primary"
                            : grade === "Inaridhisha"
                            ? "warning"
                            : "error"
                        }
                      >
                        {grade}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-gray-900">{count}</td>
                    <td className="py-3 text-sm text-gray-900">
                      {Math.round(
                        (count / dashboardStats.totalEmployees) * 100
                      )}
                      %
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {grade === "Nzuri Sana"
                        ? "81-100%"
                        : grade === "Nzuri"
                        ? "65-80%"
                        : grade === "Inaridhisha"
                        ? "50-64%"
                        : "0-49%"}
                    </td>
                    <td className="py-3">
                      <span className="text-green-600 text-sm">↗ +2%</span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Items */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Recommended Actions
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-green-900">Recognition Program</p>
              <p className="text-sm text-green-700">
                Consider implementing a recognition program for the{" "}
                {dashboardStats.gradeDistribution["Very Good"]} employees who
                achieved excellent performance.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-blue-900">Training Initiative</p>
              <p className="text-sm text-blue-700">
                Develop targeted training programs for employees in the
                "Inaridhisha" category to help improve their performance.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="font-medium text-yellow-900">Performance Review</p>
              <p className="text-sm text-yellow-700">
                Schedule one-on-one meetings with underperforming employees to
                discuss improvement strategies.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
