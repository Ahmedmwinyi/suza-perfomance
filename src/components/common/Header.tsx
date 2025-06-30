import { useState } from "react";
import { Bell, User, LogOut, Settings, Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useEvaluation } from "../../contexts/EvaluationContenxt";
import { UserSettings } from "./UserSettings";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { notifications } = useEvaluation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const unreadNotifications = notifications.filter(
    (n) => !n.read && n.userId === user?.id
  );

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    setShowSettings(true);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                Performance Appraisal System
              </h1>
              <p className="text-xs lg:text-sm text-gray-600">
                State University of Zanzibar
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 relative"
              >
                <Bell className="w-6 h-6" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {unreadNotifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No new notifications
                      </div>
                    ) : (
                      unreadNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b hover:bg-gray-50"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "warning"
                                  ? "bg-yellow-400"
                                  : notification.type === "error"
                                  ? "bg-red-400"
                                  : notification.type === "success"
                                  ? "bg-green-400"
                                  : "bg-blue-400"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role.replace("_", " ")}
                  </p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-2">
                    <button
                      onClick={handleSettingsClick}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <UserSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
