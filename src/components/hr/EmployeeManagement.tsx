/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  UserCheck,
  Download,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock employee data
  const employees = [
    {
      id: "1",
      name: "Dr. Amina Hassan",
      email: "amina.hassan@suza.ac.tz",
      phone: "+255 123 456 789",
      employeeId: "EMP001",
      department: "Computer Science",
      position: "Lecturer",
      role: "employee",
      supervisor: "Dr. Mohamed Ali",
      status: "active",
      joinDate: "2020-01-15",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri Sana",
    },
    {
      id: "2",
      name: "Dr. Mohamed Ali",
      email: "mohamed.ali@suza.ac.tz",
      phone: "+255 123 456 790",
      employeeId: "EMP002",
      department: "Computer Science",
      position: "Senior Lecturer",
      role: "appraiser",
      supervisor: "Prof. Fatma Omar",
      status: "active",
      joinDate: "2018-03-10",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri Sana",
    },
    {
      id: "3",
      name: "Prof. Fatma Omar",
      email: "fatma.omar@suza.ac.tz",
      phone: "+255 123 456 791",
      employeeId: "EMP003",
      department: "Computer Science",
      position: "Head of Department",
      role: "hod",
      supervisor: null,
      status: "active",
      joinDate: "2015-08-20",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri Sana",
    },
    {
      id: "4",
      name: "Khadija Mwalimu",
      email: "khadija.mwalimu@suza.ac.tz",
      phone: "+255 123 456 792",
      employeeId: "EMP004",
      department: "Human Resources",
      position: "HR Manager",
      role: "hr",
      supervisor: null,
      status: "active",
      joinDate: "2017-11-05",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri",
    },
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || employee.department === filterDepartment;
    const matchesRole = filterRole === "all" || employee.role === filterRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "employee":
        return "secondary";
      case "appraiser":
        return "primary";
      case "hod":
        return "warning";
      case "hr":
        return "info";
      case "institution_head":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "on_leave":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Nzuri Sana":
        return "success";
      case "Nzuri":
        return "primary";
      case "Inaridhisha":
        return "warning";
      case "Hairidhishi":
        return "error";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Employee Management</h1>
        <p className="text-green-100">
          Manage employee records, roles, and assignments across the institution
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter((e) => e.status === "active").length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(employees.map((e) => e.department)).size}
              </p>
            </div>
            <Building className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Top Performers
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  employees.filter((e) => e.performanceGrade === "Nzuri Sana")
                    .length
                }
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="employee">Employee</option>
                <option value="appraiser">Appraiser</option>
                <option value="hod">Head of Department</option>
                <option value="hr">HR</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Employee List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Employee
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Department
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Position
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">Role</th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Performance
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {employee.employeeId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {employee.department}
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {employee.position}
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getRoleColor(employee.role) as any}
                      size="sm"
                    >
                      {employee.role.replace("_", " ").toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getStatusColor(employee.status) as any}
                      size="sm"
                    >
                      {employee.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getGradeColor(employee.performanceGrade) as any}
                      size="sm"
                    >
                      {employee.performanceGrade}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedEmployee(employee.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Employee Details
                </h2>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {(() => {
                const employee = employees.find(
                  (e) => e.id === selectedEmployee
                );
                if (!employee) return null;

                return (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {employee.name}
                        </h3>
                        <p className="text-gray-600">{employee.position}</p>
                        <div className="flex space-x-2 mt-1">
                          <Badge
                            variant={getRoleColor(employee.role) as any}
                            size="sm"
                          >
                            {employee.role.replace("_", " ").toUpperCase()}
                          </Badge>
                          <Badge
                            variant={getStatusColor(employee.status) as any}
                            size="sm"
                          >
                            {employee.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{employee.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span>{employee.department}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Work Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Employee ID:</span>{" "}
                            {employee.employeeId}
                          </div>
                          <div>
                            <span className="text-gray-600">Join Date:</span>{" "}
                            {employee.joinDate}
                          </div>
                          <div>
                            <span className="text-gray-600">Supervisor:</span>{" "}
                            {employee.supervisor || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Performance
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Latest Evaluation ({employee.lastEvaluation})
                          </span>
                          <Badge
                            variant={
                              getGradeColor(employee.performanceGrade) as any
                            }
                          >
                            {employee.performanceGrade}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                      <button
                        onClick={() => setSelectedEmployee(null)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Edit Employee
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Employee
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="EMP###"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@suza.ac.tz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+255 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select position</option>
                      <option value="Senior Lecturer">Senior Lecturer</option>
                      <option value="Lecturer">Lecturer</option>
                      <option value="Assistant Lecturer">
                        Assistant Lecturer
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select role</option>
                      <option value="employee">Employee</option>
                      <option value="appraiser">Appraiser</option>
                      <option value="hod">Head of Department</option>
                      <option value="hr">HR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supervisor
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select supervisor</option>
                      <option value="Dr. Mohamed Ali">Dr. Mohamed Ali</option>
                      <option value="Prof. Fatma Omar">Prof. Fatma Omar</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
