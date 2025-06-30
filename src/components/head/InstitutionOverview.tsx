import { useState } from "react";
import {
  Building,
  Users,
  TrendingUp,
  Award,
  BarChart3,
  Calendar,
  Download,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InstitutionOverview() {
   const { dashboardStats } = useEvaluation();
    const [selectedPeriod, setSelectedPeriod] = useState('2025');
  
    const institutionTrend = [
      { month: 'Jan', performance: 75, satisfaction: 78, productivity: 82 },
      { month: 'Feb', performance: 78, satisfaction: 80, productivity: 85 },
      { month: 'Mar', performance: 82, satisfaction: 85, productivity: 88 },
      { month: 'Apr', performance: 79, satisfaction: 82, productivity: 86 },
      { month: 'May', performance: 85, satisfaction: 88, productivity: 90 },
      { month: 'Jun', performance: 88, satisfaction: 90, productivity: 92 },
    ];
  
    const departmentData = dashboardStats.departmentPerformance.map(dept => ({
      name: dept.department,
      score: dept.averageScore,
      employees: dept.totalCount,
      completed: dept.completedCount,
    }));
  
    const gradeData = Object.entries(dashboardStats.gradeDistribution).map(([grade, count]) => ({
      name: grade,
      value: count,
    }));
  
    const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];
  
    const keyMetrics = [
      {
        title: 'Overall Performance Index',
        value: dashboardStats.averageScore.toFixed(1),
        unit: '%',
        change: '+5.2%',
        trend: 'up',
        color: 'green'
      },
      {
        title: 'Employee Satisfaction',
        value: '87.5',
        unit: '%',
        change: '+3.1%',
        trend: 'up',
        color: 'blue'
      },
      {
        title: 'Productivity Index',
        value: '92.3',
        unit: '%',
        change: '+2.8%',
        trend: 'up',
        color: 'purple'
      },
      {
        title: 'Excellence Rate',
        value: Math.round((dashboardStats.gradeDistribution['Very Good'] / dashboardStats.totalEmployees) * 100).toString(),
        unit: '%',
        change: '+4.5%',
        trend: 'up',
        color: 'yellow'
      }
    ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Institution Overview</h1>
        <p className="text-blue-100">
          Comprehensive performance overview of State University of Zanzibar
        </p>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex items-center justify-between">
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
                <option value="2022">2022</option>
              </select>
            </div>
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                  {metric.unit}
                </p>
                <p
                  className={`text-sm ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change} vs last period
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  metric.color === "green"
                    ? "bg-green-100"
                    : metric.color === "blue"
                    ? "bg-blue-100"
                    : metric.color === "purple"
                    ? "bg-purple-100"
                    : "bg-yellow-100"
                }`}
              >
                <TrendingUp
                  className={`w-6 h-6 ${
                    metric.color === "green"
                      ? "text-green-600"
                      : metric.color === "blue"
                      ? "text-blue-600"
                      : metric.color === "purple"
                      ? "text-purple-600"
                      : "text-yellow-600"
                  }`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institution Performance Trend */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Institution Performance Trend
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={institutionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Performance"
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

        {/* Grade Distribution */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Performance Grade Distribution
            </h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
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
      </div>

      {/* Department Performance */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Department Performance Overview
          </h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#1E40AF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Department Analysis */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Department Analysis
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Detailed Report
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
                  Evaluated
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Average Score
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Top Performers
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Completion
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {dashboardStats.departmentPerformance.map((dept) => (
                <tr key={dept.department}>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {dept.department}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.totalCount}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {dept.completedCount}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {dept.averageScore.toFixed(1)}%
                      </span>
                      <span className="text-green-600 text-sm">↗ +2.1%</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {Math.round(dept.completedCount * 0.3)}{" "}
                    {/* Mock top performers */}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (dept.completedCount / dept.totalCount) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round(
                          (dept.completedCount / dept.totalCount) * 100
                        )}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={
                        dept.completedCount / dept.totalCount >= 0.9
                          ? "success"
                          : dept.completedCount / dept.totalCount >= 0.7
                          ? "warning"
                          : "error"
                      }
                      size="sm"
                    >
                      {dept.completedCount / dept.totalCount >= 0.9
                        ? "Excellent"
                        : dept.completedCount / dept.totalCount >= 0.7
                        ? "Good"
                        : "Needs Attention"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Strategic Insights */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Strategic Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="font-medium text-green-900">
                Performance Excellence
              </h3>
            </div>
            <p className="text-sm text-green-700">
              Institution performance has improved by 5.2% this year. Consider
              expanding successful practices across all departments.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="font-medium text-blue-900">Staff Development</h3>
            </div>
            <p className="text-sm text-blue-700">
              {dashboardStats.gradeDistribution["Very Good"]} employees achieved
              excellent ratings. Implement mentorship programs to elevate more
              staff.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Award className="w-6 h-6 text-yellow-600" />
              <h3 className="font-medium text-yellow-900">
                Recognition Program
              </h3>
            </div>
            <p className="text-sm text-yellow-700">
              High-performing departments show strong leadership. Consider
              implementing institution-wide recognition initiatives.
            </p>
          </div>
        </div>
      </Card>

      {/* Executive Summary */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Executive Summary
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            The State University of Zanzibar demonstrates strong institutional
            performance with an overall average score of{" "}
            {dashboardStats.averageScore.toFixed(1)}%, representing a 5.2%
            improvement from the previous evaluation period.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Key Achievements
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • {dashboardStats.gradeDistribution["Very Good"]} employees
                  achieved excellent performance ratings
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
                <li>• Consistent improvement across all departments</li>
                <li>• Strong leadership and governance practices</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Areas for Focus
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Continue professional development programs</li>
                <li>• Enhance inter-departmental collaboration</li>
                <li>• Expand recognition and reward systems</li>
                <li>• Strengthen performance monitoring systems</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
