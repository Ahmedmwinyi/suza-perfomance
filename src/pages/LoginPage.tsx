import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Building, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: "employee@suza.ac.tz", role: "Employee", password: "demo123" },
    { email: "appraiser@suza.ac.tz", role: "Appraiser", password: "demo123" },
    {
      email: "hod@suza.ac.tz",
      role: "Head of Department",
      password: "demo123",
    },
    { email: "hr@suza.ac.tz", role: "HR Manager", password: "demo123" },
    { email: "head@suza.ac.tz", role: "Institution Head", password: "demo123" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mb-4">
            <Building className="w-10 h-10 text-navy-900" />
          </div>
          <h2 className="text-3xl font-bold text-white">SUZA PAS</h2>
          <p className="mt-2 text-gray-300">Performance Appraisal System</p>
          <p className="text-sm text-gray-400">State University of Zanzibar</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Demo Accounts
          </h3>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email);
                  setPassword("demo123");
                }}
                className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{account.role}</p>
                    <p className="text-gray-300 text-sm">{account.email}</p>
                  </div>
                  <p className="text-gray-400 text-xs">demo123</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
