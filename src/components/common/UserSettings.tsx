/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const settingsSchema = z.object({
  profile: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    bio: z.string().optional(),
  }),
  notifications: z.object({
    emailNotifications: z.boolean(),
    smsNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    evaluationReminders: z.boolean(),
    statusUpdates: z.boolean(),
    weeklyDigest: z.boolean(),
  }),
  privacy: z.object({
    profileVisibility: z.enum(["public", "department", "private"]),
    showEmail: z.boolean(),
    showPhone: z.boolean(),
    allowDirectMessages: z.boolean(),
  }),
  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]),
    language: z.enum(["en", "sw"]),
    timezone: z.string(),
    dateFormat: z.enum(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]),
    itemsPerPage: z.enum(["10", "25", "50", "100"]),
  }),
});

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSettings({ isOpen, onClose }: UserSettingsProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      profile: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: "",
        bio: "",
      },
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        evaluationReminders: true,
        statusUpdates: true,
        weeklyDigest: false,
      },
      privacy: {
        profileVisibility: "department" as const,
        showEmail: false,
        showPhone: false,
        allowDirectMessages: true,
      },
      preferences: {
        theme: "light" as const,
        language: "en" as const,
        timezone: "Africa/Dar_es_Salaam",
        dateFormat: "DD/MM/YYYY" as const,
        itemsPerPage: "25" as const,
      },
    },
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
  ];

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Settings saved:", data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
              <p className="text-sm text-gray-600">
                Manage your account preferences
              </p>
            </div>

            <nav className="p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {activeTab} Settings
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          Profile Picture
                        </h4>
                        <p className="text-sm text-gray-600">
                          Update your profile photo
                        </p>
                        <button
                          type="button"
                          className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          {...register("profile.firstName")}
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.profile?.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.profile.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          {...register("profile.lastName")}
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.profile?.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.profile.lastName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          {...register("profile.email")}
                          type="email"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.profile?.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.profile.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          {...register("profile.phone")}
                          type="tel"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+255 XXX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        {...register("profile.bio")}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Change Password
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Notification Channels
                      </h4>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            {...register("notifications.emailNotifications")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              Email notifications
                            </span>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            {...register("notifications.smsNotifications")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              SMS notifications
                            </span>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            {...register("notifications.pushNotifications")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <div className="flex items-center space-x-2">
                            <Bell className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              Push notifications
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Notification Types
                      </h4>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Evaluation reminders
                          </span>
                          <input
                            {...register("notifications.evaluationReminders")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Status updates
                          </span>
                          <input
                            {...register("notifications.statusUpdates")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Weekly digest
                          </span>
                          <input
                            {...register("notifications.weeklyDigest")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">
                        Notification Schedule
                      </h5>
                      <p className="text-sm text-blue-700">
                        Notifications are sent during business hours (8:00 AM -
                        6:00 PM) unless marked as urgent.
                      </p>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Profile Visibility
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            {...register("privacy.profileVisibility")}
                            type="radio"
                            value="public"
                            className="border-gray-300"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Public
                            </span>
                            <p className="text-xs text-gray-500">
                              Visible to all users
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            {...register("privacy.profileVisibility")}
                            type="radio"
                            value="department"
                            className="border-gray-300"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Department Only
                            </span>
                            <p className="text-xs text-gray-500">
                              Visible to department members
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            {...register("privacy.profileVisibility")}
                            type="radio"
                            value="private"
                            className="border-gray-300"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Private
                            </span>
                            <p className="text-xs text-gray-500">
                              Only visible to you
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Contact Information
                      </h4>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Show email address
                          </span>
                          <input
                            {...register("privacy.showEmail")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Show phone number
                          </span>
                          <input
                            {...register("privacy.showPhone")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            Allow direct messages
                          </span>
                          <input
                            {...register("privacy.allowDirectMessages")}
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-2">
                        Data Protection
                      </h5>
                      <p className="text-sm text-yellow-700">
                        Your personal information is protected according to
                        SUZA's privacy policy and Zanzibar data protection
                        regulations.
                      </p>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        Appearance
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Theme
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                {...register("preferences.theme")}
                                type="radio"
                                value="light"
                                className="border-gray-300"
                              />
                              <Sun className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">Light</span>
                            </label>

                            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                {...register("preferences.theme")}
                                type="radio"
                                value="dark"
                                className="border-gray-300"
                              />
                              <Moon className="w-4 h-4 text-gray-600" />
                              <span className="text-sm">Dark</span>
                            </label>

                            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                {...register("preferences.theme")}
                                type="radio"
                                value="system"
                                className="border-gray-300"
                              />
                              <Monitor className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">System</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          {...register("preferences.language")}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="sw">Kiswahili</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          {...register("preferences.timezone")}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Africa/Dar_es_Salaam">
                            East Africa Time (EAT)
                          </option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Format
                        </label>
                        <select
                          {...register("preferences.dateFormat")}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Items per page
                        </label>
                        <select
                          {...register("preferences.itemsPerPage")}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
