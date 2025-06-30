import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Building,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function ExecutiveReports() {
  const { dashboardStats } = useEvaluation();
  const [selectedReport, setSelectedReport] = useState("executive_summary");
  const [selectedPeriod, setSelectedPeriod] = useState("2024");

  const reportTypes = [
    { id: "executive_summary", name: "Executive Summary", icon: FileText },
    { id: "performance_trends", name: "Performance Trends", icon: TrendingUp },
    { id: "department_analysis", name: "Department Analysis", icon: Building },
    { id: "strategic_insights", name: "Strategic Insights", icon: Award },
  ];

  const performanceHistory = [
    { year: "2020", score: 72, satisfaction: 75, productivity: 78 },
    { year: "2021", score: 75, satisfaction: 78, productivity: 80 },
    { year: "2022", score: 78, satisfaction: 82, productivity: 85 },
    { year: "2023", score: 82, satisfaction: 85, productivity: 88 },
    { year: "2024", score: 87, satisfaction: 90, productivity: 92 },
  ];

  const departmentComparison = dashboardStats.departmentPerformance.map(
    (dept) => ({
      name: dept.department,
      current: dept.averageScore,
      target: 85,
      improvement: Math.random() * 10 + 2,
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Executive Reports</h1>
        <p className="text-navy-100">
          Comprehensive executive-level performance reports and strategic
          insights
        </p>
      </div>

      {/* Report Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {reportTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="5year">5-Year Analysis</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors">
              <FileText className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Executive Summary Report */}
      {selectedReport === "executive_summary" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Performance Indicators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {dashboardStats.averageScore.toFixed(1)}%
                </p>
                <p className="text-sm text-blue-700">Overall Performance</p>
                <p className="text-xs text-green-600 mt-1">↗ +5.2% YoY</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">
                  {dashboardStats.totalEmployees}
                </p>
                <p className="text-sm text-green-700">Total Employees</p>
                <p className="text-xs text-blue-600 mt-1">
                  {dashboardStats.completedEvaluations} evaluated
                </p>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-900">
                  {dashboardStats.gradeDistribution["Nzuri Sana"]}
                </p>
                <p className="text-sm text-yellow-700">Excellence Achievers</p>
                <p className="text-xs text-green-600 mt-1">↗ +15% YoY</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">
                  {dashboardStats.departmentPerformance.length}
                </p>
                <p className="text-sm text-purple-700">Active Departments</p>
                <p className="text-xs text-blue-600 mt-1">
                  All performing well
                </p>
              </div>
            </div>
          </Card>

          {/* Executive Summary Text */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Executive Summary
            </h2>
            <div className="prose max-w-none">
              <div className="bg-navy-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-navy-900 mb-3">
                  Performance Highlights
                </h3>
                <p className="text-navy-800 mb-4">
                  The State University of Zanzibar has achieved exceptional
                  performance in {selectedPeriod}, with an overall institutional
                  score of {dashboardStats.averageScore.toFixed(1)}%,
                  representing a significant 5.2% improvement from the previous
                  evaluation period.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy-900 mb-2">
                      Key Achievements
                    </h4>
                    <ul className="text-sm text-navy-700 space-y-1">
                      <li>
                        •{" "}
                        {Math.round(
                          (dashboardStats.gradeDistribution["Nzuri Sana"] /
                            dashboardStats.totalEmployees) *
                            100
                        )}
                        % of staff achieved excellent performance ratings
                      </li>
                      <li>
                        •{" "}
                        {Math.round(
                          (dashboardStats.completedEvaluations /
                            dashboardStats.totalEmployees) *
                            100
                        )}
                        % evaluation completion rate
                      </li>
                      <li>
                        • All departments exceeded minimum performance
                        thresholds
                      </li>
                      <li>
                        • Significant improvement in employee satisfaction
                        scores
                      </li>
                      <li>
                        • Enhanced research output and academic excellence
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-navy-900 mb-2">
                      Strategic Outcomes
                    </h4>
                    <ul className="text-sm text-navy-700 space-y-1">
                      <li>• Strengthened institutional reputation</li>
                      <li>• Improved stakeholder confidence</li>
                      <li>• Enhanced operational efficiency</li>
                      <li>• Better resource utilization</li>
                      <li>• Increased competitive positioning</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Strengths</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Strong leadership across all levels</li>
                    <li>• Excellent faculty performance</li>
                    <li>• Robust evaluation processes</li>
                    <li>• High employee engagement</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Growth Opportunities
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Expand professional development programs</li>
                    <li>• Enhance technology infrastructure</li>
                    <li>• Strengthen industry partnerships</li>
                    <li>• Increase research funding</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Performance Trends Report */}
      {selectedReport === "performance_trends" && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              5-Year Performance Trend
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1E40AF"
                    strokeWidth={3}
                    name="Performance Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Satisfaction"
                  />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    name="Productivity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Trend Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">
                  Performance Growth
                </h3>
                <p className="text-2xl font-bold text-blue-900">+20.8%</p>
                <p className="text-sm text-blue-700">5-year improvement</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">
                  Satisfaction Increase
                </h3>
                <p className="text-2xl font-bold text-green-900">+20.0%</p>
                <p className="text-sm text-green-700">5-year improvement</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">
                  Productivity Gain
                </h3>
                <p className="text-2xl font-bold text-purple-900">+17.9%</p>
                <p className="text-sm text-purple-700">5-year improvement</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Department Analysis Report */}
      {selectedReport === "department_analysis" && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Department Performance vs Targets
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="current"
                    fill="#1E40AF"
                    name="Current Performance"
                  />
                  <Bar dataKey="target" fill="#E5E7EB" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Department Rankings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 text-sm font-medium text-gray-500">
                      Rank
                    </th>
                    <th className="pb-3 text-sm font-medium text-gray-500">
                      Department
                    </th>
                    <th className="pb-3 text-sm font-medium text-gray-500">
                      Score
                    </th>
                    <th className="pb-3 text-sm font-medium text-gray-500">
                      vs Target
                    </th>
                    <th className="pb-3 text-sm font-medium text-gray-500">
                      Improvement
                    </th>
                    <th className="pb-3 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {departmentComparison
                    .sort((a, b) => b.current - a.current)
                    .map((dept, index) => (
                      <tr key={dept.name}>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0
                                  ? "bg-gold-100 text-gold-800"
                                  : index === 1
                                  ? "bg-gray-100 text-gray-800"
                                  : index === 2
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 font-medium text-gray-900">
                          {dept.name}
                        </td>
                        <td className="py-3 text-gray-900">
                          {dept.current.toFixed(1)}%
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-sm ${
                              dept.current >= dept.target
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {dept.current >= dept.target ? "+" : ""}
                            {(dept.current - dept.target).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 text-green-600 text-sm">
                          +{dept.improvement.toFixed(1)}%
                        </td>
                        <td className="py-3">
                          <Badge
                            variant={
                              dept.current >= dept.target
                                ? "success"
                                : "warning"
                            }
                            size="sm"
                          >
                            {dept.current >= dept.target
                              ? "Target Met"
                              : "Below Target"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Strategic Insights Report */}
      {selectedReport === "strategic_insights" && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Strategic Insights & Recommendations
          </h2>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">
                Leadership Excellence
              </h3>
              <p className="text-blue-800 mb-4">
                The institution demonstrates exceptional leadership capabilities
                with consistent performance improvements across all departments.
                This positions SUZA as a leading educational institution in the
                region.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    Recommendations
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Establish leadership development programs</li>
                    <li>• Create mentorship networks</li>
                    <li>• Implement succession planning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    Expected Outcomes
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Enhanced institutional reputation</li>
                    <li>• Improved stakeholder confidence</li>
                    <li>• Sustainable growth trajectory</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">
                Performance Optimization
              </h3>
              <p className="text-green-800 mb-4">
                With{" "}
                {Math.round(
                  (dashboardStats.gradeDistribution["Nzuri Sana"] /
                    dashboardStats.totalEmployees) *
                    100
                )}
                % of staff achieving excellent ratings, there's significant
                potential for further optimization and knowledge sharing across
                the institution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-900 mb-2">
                    Strategic Actions
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Implement best practice sharing sessions</li>
                    <li>• Create centers of excellence</li>
                    <li>• Develop performance coaching programs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-900 mb-2">
                    Target Outcomes
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 95% staff achieving good or excellent ratings</li>
                    <li>• Reduced performance variation</li>
                    <li>• Enhanced institutional effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-3">
                Future Growth Strategy
              </h3>
              <p className="text-yellow-800 mb-4">
                The consistent upward trend in performance metrics indicates
                strong institutional health and readiness for strategic
                expansion and enhancement initiatives.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Growth Initiatives
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Expand academic program offerings</li>
                    <li>• Enhance research capabilities</li>
                    <li>• Strengthen industry partnerships</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Success Metrics
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Increased student enrollment</li>
                    <li>• Higher research output</li>
                    <li>• Enhanced industry collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
