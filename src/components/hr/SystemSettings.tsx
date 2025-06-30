import { useState } from "react";
import {
  Settings,
  Save,
  Users,
  Shield,
  Bell,
  Database,
  Calendar,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      institutionName: "State University of Zanzibar",
      evaluationCycleDuration: "12",
      defaultGradingScale: "percentage",
      autoReminders: true,
      allowSelfEvaluation: true,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      reminderFrequency: "7",
      escalationDays: "14",
      notifyOnSubmission: true,
      notifyOnApproval: true,
    },
    security: {
      passwordMinLength: "8",
      requireSpecialChars: true,
      sessionTimeout: "30",
      twoFactorAuth: false,
      auditLogging: true,
    },
    evaluation: {
      b1Weight: "60",
      b2Weight: "30",
      b3Weight: "10",
      passingScore: "50",
      excellentThreshold: "81",
      allowLateSubmissions: false,
    },
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "evaluation", label: "Evaluation", icon: Calendar },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "users", label: "User Management", icon: Users },
    { id: "backup", label: "Backup & Data", icon: Database },
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-100">
          Configure system parameters and administrative settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Settings Categories
          </h2>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card>
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    General Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        value={settings.general.institutionName}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "institutionName",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Evaluation Cycle Duration (months)
                      </label>
                      <select
                        value={settings.general.evaluationCycleDuration}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "evaluationCycleDuration",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Grading Scale
                      </label>
                      <select
                        value={settings.general.defaultGradingScale}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "defaultGradingScale",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="percentage">Percentage (0-100%)</option>
                        <option value="points">Points (0-5)</option>
                        <option value="letter">Letter Grades (A-F)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.general.autoReminders}
                          onChange={(e) =>
                            handleSettingChange(
                              "general",
                              "autoReminders",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Enable automatic reminders
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.general.allowSelfEvaluation}
                          onChange={(e) =>
                            handleSettingChange(
                              "general",
                              "allowSelfEvaluation",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Allow employee self-evaluation
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Evaluation Settings */}
            {activeTab === "evaluation" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Evaluation Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          B1: Responsibilities Weight (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.evaluation.b1Weight}
                          onChange={(e) =>
                            handleSettingChange(
                              "evaluation",
                              "b1Weight",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          B2: Skills Weight (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.evaluation.b2Weight}
                          onChange={(e) =>
                            handleSettingChange(
                              "evaluation",
                              "b2Weight",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          B3: Conduct Weight (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.evaluation.b3Weight}
                          onChange={(e) =>
                            handleSettingChange(
                              "evaluation",
                              "b3Weight",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Total weight must equal 100%.
                        Current total:{" "}
                        {parseInt(settings.evaluation.b1Weight) +
                          parseInt(settings.evaluation.b2Weight) +
                          parseInt(settings.evaluation.b3Weight)}
                        %
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Passing Score (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.evaluation.passingScore}
                          onChange={(e) =>
                            handleSettingChange(
                              "evaluation",
                              "passingScore",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Excellent Threshold (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.evaluation.excellentThreshold}
                          onChange={(e) =>
                            handleSettingChange(
                              "evaluation",
                              "excellentThreshold",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.evaluation.allowLateSubmissions}
                        onChange={(e) =>
                          handleSettingChange(
                            "evaluation",
                            "allowLateSubmissions",
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        Allow late submissions
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "emailNotifications",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Enable email notifications
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.notifications.smsNotifications}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "smsNotifications",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Enable SMS notifications
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.notifications.notifyOnSubmission}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "notifyOnSubmission",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Notify on evaluation submission
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.notifications.notifyOnApproval}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "notifyOnApproval",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Notify on approval/rejection
                        </span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reminder Frequency (days)
                        </label>
                        <select
                          value={settings.notifications.reminderFrequency}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "reminderFrequency",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="3">Every 3 days</option>
                          <option value="7">Weekly</option>
                          <option value="14">Bi-weekly</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Escalation After (days)
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={settings.notifications.escalationDays}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              "escalationDays",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Security Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          min="6"
                          max="20"
                          value={settings.security.passwordMinLength}
                          onChange={(e) =>
                            handleSettingChange(
                              "security",
                              "passwordMinLength",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) =>
                            handleSettingChange(
                              "security",
                              "sessionTimeout",
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.security.requireSpecialChars}
                          onChange={(e) =>
                            handleSettingChange(
                              "security",
                              "requireSpecialChars",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Require special characters in passwords
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) =>
                            handleSettingChange(
                              "security",
                              "twoFactorAuth",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Enable two-factor authentication
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.security.auditLogging}
                          onChange={(e) =>
                            handleSettingChange(
                              "security",
                              "auditLogging",
                              e.target.checked
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">
                          Enable audit logging
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    User Management
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Role Permissions
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Employee
                          </span>
                          <Badge variant="secondary" size="sm">
                            View Own Evaluations
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Appraiser
                          </span>
                          <Badge variant="primary" size="sm">
                            Review Assigned Evaluations
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Head of Department
                          </span>
                          <Badge variant="warning" size="sm">
                            Approve Department Evaluations
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">HR</span>
                          <Badge variant="info" size="sm">
                            Full System Access
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Institution Head
                          </span>
                          <Badge variant="success" size="sm">
                            Final Approval Authority
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Role permissions are predefined
                        and cannot be modified. Contact system administrator for
                        custom role requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backup & Data */}
            {activeTab === "backup" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Backup & Data Management
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Automatic Backups
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          System automatically backs up data daily at 2:00 AM
                        </p>
                        <Badge variant="success" size="sm">
                          Enabled
                        </Badge>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Last Backup
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          December 15, 2024 at 2:15 AM
                        </p>
                        <Badge variant="success" size="sm">
                          Successful
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Create Manual Backup
                      </button>
                      <button className="w-full sm:w-auto px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Download Latest Backup
                      </button>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2">
                        Data Retention Policy
                      </h4>
                      <p className="text-sm text-red-700">
                        Evaluation data is retained for 7 years as per
                        institutional policy. Backups are kept for 1 year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t">
              <button className="flex items-center space-x-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
