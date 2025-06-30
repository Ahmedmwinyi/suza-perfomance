import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export default function StaffManagements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock staff data
  const staffMembers = [
    {
      id: "1",
      name: "Dr. Amina Hassan",
      position: "Lecturer",
      email: "amina.hassan@suza.ac.tz",
      phone: "+255 123 456 789",
      employeeId: "EMP001",
      status: "active",
      joinDate: "2020-01-15",
      supervisor: "Dr. Mohamed Ali",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri Sana",
    },
    {
      id: "2",
      name: "Said Mwalimu",
      position: "Assistant Lecturer",
      email: "said.mwalimu@suza.ac.tz",
      phone: "+255 123 456 790",
      employeeId: "EMP006",
      status: "active",
      joinDate: "2021-03-10",
      supervisor: "Dr. Mohamed Ali",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri",
    },
    {
      id: "3",
      name: "Fatma Omar",
      position: "Senior Lecturer",
      email: "fatma.omar@suza.ac.tz",
      phone: "+255 123 456 791",
      employeeId: "EMP007",
      status: "active",
      joinDate: "2018-08-20",
      supervisor: "Prof. Fatma Omar",
      lastEvaluation: "2024",
      performanceGrade: "Nzuri Sana",
    },
    {
      id: "4",
      name: "Ali Khamis",
      position: "Lecturer",
      email: "ali.khamis@suza.ac.tz",
      phone: "+255 123 456 792",
      employeeId: "EMP008",
      status: "active",
      joinDate: "2019-11-05",
      supervisor: "Dr. Mohamed Ali",
      lastEvaluation: "2024",
      performanceGrade: "Inaridhisha",
    },
  ];

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterPosition === "all" || staff.position === filterPosition;
    return matchesSearch && matchesFilter;
  });

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Staff Management</h1>
        <p className="text-green-100">
          Manage departmental staff assignments and information
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">
                {staffMembers.length}
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
                {staffMembers.filter((s) => s.status === "active").length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lecturers</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  staffMembers.filter((s) => s.position.includes("Lecturer"))
                    .length
                }
              </p>
            </div>
            <Briefcase className="w-8 h-8 text-purple-600" />
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
                  staffMembers.filter(
                    (s) => s.performanceGrade === "Nzuri Sana"
                  ).length
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
                placeholder="Search staff..."
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
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Positions</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Assistant Lecturer">Assistant Lecturer</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Staff</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Staff List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Staff Member
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Position
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Contact
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Performance
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Supervisor
                </th>
                <th className="pb-3 text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {staff.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {staff.employeeId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {staff.position}
                  </td>
                  <td className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{staff.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getStatusColor(staff.status)}
                      size="sm"
                    >
                      {staff.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Badge
                      variant={getGradeColor(staff.performanceGrade)}
                      size="sm"
                    >
                      {staff.performanceGrade}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {staff.supervisor}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedStaff(staff.id)}
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

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Staff Details
                </h2>
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {(() => {
                const staff = staffMembers.find((s) => s.id === selectedStaff);
                if (!staff) return null;

                return (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {staff.name}
                        </h3>
                        <p className="text-gray-600">{staff.position}</p>
                        <Badge
                          variant={getStatusColor(staff.status)}
                          size="sm"
                        >
                          {staff.status.toUpperCase()}
                        </Badge>
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
                            <span>{staff.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{staff.phone}</span>
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
                            {staff.employeeId}
                          </div>
                          <div>
                            <span className="text-gray-600">Join Date:</span>{" "}
                            {staff.joinDate}
                          </div>
                          <div>
                            <span className="text-gray-600">Supervisor:</span>{" "}
                            {staff.supervisor}
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
                            Latest Evaluation ({staff.lastEvaluation})
                          </span>
                          <Badge
                            variant={
                              getGradeColor(staff.performanceGrade)
                            }
                          >
                            {staff.performanceGrade}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                      <button
                        onClick={() => setSelectedStaff(null)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Edit Staff
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Staff Member
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
                    Add Staff Member
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
