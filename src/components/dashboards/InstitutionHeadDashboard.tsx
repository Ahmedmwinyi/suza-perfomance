import {
  Crown,
  Building,
  TrendingUp,
  Award,
  Users,
  FileText,
} from "lucide-react";
import { Card } from "../common/Card";
import { StatCard } from "../common/StatCard";
import { Badge } from "../common/Badge";
import { useEvaluation } from "../../contexts/EvaluationContenxt";

export function InstitutionHeadDashboard() {
  const { dashboardStats } = useEvaluation();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gold-600 to-gold-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Institution Head Dashboard</h1>
        <p className="text-gold-100">
          Executive overview of institutional performance and final approval
          decisions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending Final Approvals"
          value={5}
          icon={Crown}
          color="yellow"
        />
        <StatCard
          title="Institution Average"
          value={`${dashboardStats.averageScore.toFixed(1)}%`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Top Performers"
          value={dashboardStats.gradeDistribution["Very Good"]}
          icon={Award}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Final Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Final Approvals
            </h2>
            <Crown className="w-5 h-5 text-gold-500" />
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-gold-500 bg-gold-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Dr. Amina Hassan</h3>
                <Badge variant="info" size="sm">
                  PROMOTION RECOMMENDED
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Department: Computer Science</p>
                <p>Final Score: 89.5% (Nzuri Sana)</p>
                <p>Recommendation: Promotion to Senior Lecturer</p>
              </div>
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Approve
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Review
                </button>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Prof. Mohamed Ali</h3>
                <Badge variant="success" size="sm">
                  SALARY INCREASE
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Department: Mathematics</p>
                <p>Final Score: 92.3% (Nzuri Sana)</p>
                <p>Recommendation: 15% Salary Increase</p>
              </div>
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Approve
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Review
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Institution Performance Overview */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Institution Performance
            </h2>
            <Building className="w-5 h-5 text-blue-500" />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-green-900">
                    {Math.round(
                      (dashboardStats.completedEvaluations /
                        dashboardStats.totalEmployees) *
                        100
                    )}
                    %
                  </p>
                  <p className="text-sm text-green-700">Completion Rate</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.gradeDistribution["Very Good"]}
                </p>
                <p className="text-xs text-gray-600">Excellent</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.gradeDistribution["Good"]}
                </p>
                <p className="text-xs text-gray-600">Good</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                View Detailed Report
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Executive Summary */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Executive Summary
          </h2>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Performance Trend
            </h3>
            <p className="text-sm text-gray-600">
              Overall institutional performance has improved by 8.5% compared to
              last year.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Top Departments
            </h3>
            <p className="text-sm text-gray-600">
              Computer Science and Mathematics departments lead with highest
              average scores.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Staff Development
            </h3>
            <p className="text-sm text-gray-600">
              85% of staff have shown improvement in key performance areas.
            </p>
          </div>
        </div>
      </Card>

      {/* Recent Decisions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Executive Decisions
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Approved promotion for 5 faculty members
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Authorized salary adjustments for top performers
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Signed off on departmental development plans
              </p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
