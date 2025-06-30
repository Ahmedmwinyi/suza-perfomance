import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Download,
} from "lucide-react";
import { Card } from "../common/Card";
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function Analytics() {
  const { dashboardStats } = useEvaluation();
  const [selectedMetric, setSelectedMetric] = useState("performance");
  const [timeRange, setTimeRange] = useState("12months");

  const performanceTrend = [
    { month: "Jan", score: 75, employees: 45, satisfaction: 78 },
    { month: "Feb", score: 78, employees: 48, satisfaction: 80 },
    { month: "Mar", score: 82, employees: 52, satisfaction: 85 },
    { month: "Apr", score: 79, employees: 50, satisfaction: 82 },
    { month: "May", score: 85, employees: 55, satisfaction: 88 },
    { month: "Jun", score: 88, employees: 58, satisfaction: 90 },
    { month: "Jul", score: 86, employees: 60, satisfaction: 87 },
    { month: "Aug", score: 89, employees: 62, satisfaction: 91 },
    { month: "Sep", score: 91, employees: 65, satisfaction: 93 },
    { month: "Oct", score: 87, employees: 63, satisfaction: 89 },
    { month: "Nov", score: 90, employees: 67, satisfaction: 92 },
    { month: "Dec", score: 92, employees: 70, satisfaction: 94 },
  ];

  const skillsAnalysis = [
    { skill: "Communication", score: 85, fullMark: 100 },
    { skill: "Leadership", score: 78, fullMark: 100 },
    { skill: "Technical", score: 92, fullMark: 100 },
    { skill: "Problem Solving", score: 88, fullMark: 100 },
    { skill: "Teamwork", score: 90, fullMark: 100 },
    { skill: "Innovation", score: 75, fullMark: 100 },
  ];

  const gradeData = Object.entries(dashboardStats.gradeDistribution).map(
    ([grade, count]) => ({
      name: grade,
      value: count,
      percentage: Math.round((count / dashboardStats.totalEmployees) * 100),
    })
  );

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  const departmentComparison = dashboardStats.departmentPerformance.map(
    (dept) => ({
      name: dept.department,
      current: dept.averageScore,
      previous: dept.averageScore - Math.random() * 10 + 5, // Mock previous data
      growth: Math.random() * 10 - 5,
    })
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Performance Analytics</h1>
        <p className="text-indigo-100">
          Advanced analytics and insights for data-driven decision making
        </p>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="performance">Performance Metrics</option>
                <option value="engagement">Employee Engagement</option>
                <option value="skills">Skills Analysis</option>
                <option value="trends">Trend Analysis</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="12months">Last 12 Months</option>
                <option value="24months">Last 24 Months</option>
              </select>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Analytics</span>
          </button>
        </div>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Performance Index
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.averageScore.toFixed(1)}
              </p>
              <p className="text-sm text-green-600">↗ +5.2% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Engagement Score
              </p>
              <p className="text-2xl font-bold text-gray-900">87.5</p>
              <p className="text-sm text-blue-600">↗ +2.1% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Excellence Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (dashboardStats.gradeDistribution["Very Good"] /
                    dashboardStats.totalEmployees) *
                    100
                )}
                %
              </p>
              <p className="text-sm text-yellow-600">↗ +3.8% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
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
              <p className="text-sm text-purple-600">↗ +1.5% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Performance Trend Analysis
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366F1"
                  strokeWidth={2}
                  name="Performance Score"
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Satisfaction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skills Radar */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Skills Analysis
            </h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsAnalysis}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Skills"
                  dataKey="score"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Performance Grade Distribution
            </h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Comparison */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Department Performance Comparison
            </h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#6366F1" name="Current Period" />
                <Bar dataKey="previous" fill="#E5E7EB" name="Previous Period" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics Table */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Detailed Performance Analytics
          </h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View Full Analysis
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
                  Current Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Previous Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Growth
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Top Grade %
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Completion
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {departmentComparison.map((dept) => (
                <tr key={dept.name}>
                  <td className="py-3 text-sm font-medium text-gray-900">
                    {dept.name}
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {dept.current.toFixed(1)}%
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.previous.toFixed(1)}%
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-sm ${
                        dept.growth >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {dept.growth >= 0 ? "+" : ""}
                      {dept.growth.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-900">25%</td>
                  <td className="py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-green-600 text-sm">↗</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Predictive Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="font-medium text-blue-900">
                Performance Forecast
              </h3>
            </div>
            <p className="text-sm text-blue-700">
              Based on current trends, institutional performance is projected to
              reach 85% by end of year.
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-green-600" />
              <h3 className="font-medium text-green-900">
                Engagement Prediction
              </h3>
            </div>
            <p className="text-sm text-green-700">
              Employee engagement scores are expected to increase by 5% with
              current improvement initiatives.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Award className="w-6 h-6 text-yellow-600" />
              <h3 className="font-medium text-yellow-900">Excellence Target</h3>
            </div>
            <p className="text-sm text-yellow-700">
              With focused development programs, 40% of staff could achieve
              excellent ratings next cycle.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
