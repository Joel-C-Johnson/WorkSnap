import backgroundImage from "../../../assets/img/3.jpg";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Download,
  Plus,
  Users,
  Filter,
  LogOut,
  User,
} from "lucide-react";

const BibleTranslationTracker = () => {
  // State management
  const [currentUser, setCurrentUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("entries");
  const [filterPeriod, setFilterPeriod] = useState("month");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);

  // Initialize demo data
  useEffect(() => {
    const demoUsers = [
      {
        id: 1,
        name: "John Smith",
        email: "john",
        role: "user",
        password: "123",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@ministry.org",
        role: "user",
        password: "123",
      },
      {
        id: 3,
        name: "Admin User",
        email: "admin",
        role: "admin",
        password: "admin",
      },
    ];

    const demoEntries = [
      {
        id: 1,
        userId: 1,
        userName: "John Smith",
        date: "2024-12-15",
        projectName: "Gospel of Matthew",
        dayStatus: "Present",
        workDone: "Translated verses 1-10 of chapter 5",
        workStatus: "In Progress",
      },
      {
        id: 2,
        userId: 1,
        userName: "John Smith",
        date: "2024-12-16",
        projectName: "Gospel of Matthew",
        dayStatus: "Present",
        workDone: "Translated verses 11-20 of chapter 5",
        workStatus: "In Progress",
      },
      {
        id: 3,
        userId: 2,
        userName: "Sarah Johnson",
        date: "2024-12-15",
        projectName: "Book of Psalms",
        dayStatus: "Present",
        workDone: "Completed Psalm 23 translation",
        workStatus: "Completed",
      },
      {
        id: 4,
        userId: 2,
        userName: "Sarah Johnson",
        date: "2024-12-17",
        projectName: "Book of Psalms",
        dayStatus: "Half Day",
        workDone: "Started Psalm 24 translation",
        workStatus: "In Progress",
      },
    ];

    setUsers(demoUsers);
    setEntries(demoEntries);
  }, []);

  // Export to Excel function (simplified for demo)
  const exportToExcel = (data, filename) => {
    const csvContent = [
      ["Date", "User", "Project", "Day Status", "Work Done", "Work Status"],
      ...data.map((entry) => [
        entry.date,
        entry.userName,
        entry.projectName,
        entry.dayStatus,
        entry.workDone,
        entry.workStatus,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Login component
  const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
      console.log({users});
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      console.log("Login attempt:", { email, password, user });
      if (user) {
        setCurrentUser(user);
        setError("");
      } else {
        setError("Invalid credentials");
      }
    };

    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url('${backgroundImage}')` }}>
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              WorkSnap
            </h1>
            {/* <p className="text-gray-600">Project Tracking System</p> */}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>Demo Credentials:</p>
            <p>Admin: admin / admin</p>
            <p>User: john / 123</p>
          </div>
        </div>
      </div>
    );
  };

  // New Entry Form
  const NewEntryForm = () => {
    const [formData, setFormData] = useState({
      date: new Date().toISOString().split("T")[0],
      projectName: "",
      dayStatus: "Present",
      workDone: "",
      workStatus: "In Progress",
    });

    const handleSubmit = () => {
      if (formData.projectName && formData.workDone) {
        const newEntry = {
          id: Date.now(),
          userId: currentUser.id,
          userName: currentUser.name,
          ...formData,
        };
        setEntries([...entries, newEntry]);
        setShowNewEntryForm(false);
        setFormData({
          date: new Date().toISOString().split("T")[0],
          projectName: "",
          dayStatus: "Present",
          workDone: "",
          workStatus: "In Progress",
        });
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Entry</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day Status
              </label>
              <select
                value={formData.dayStatus}
                onChange={(e) =>
                  setFormData({ ...formData, dayStatus: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Half Day">Half Day</option>
                <option value="Travel">Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Status
              </label>
              <select
                value={formData.workStatus}
                onChange={(e) =>
                  setFormData({ ...formData, workStatus: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What I Have Done
            </label>
            <textarea
              value={formData.workDone}
              onChange={(e) =>
                setFormData({ ...formData, workDone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Entry
            </button>
            <button
              onClick={() => setShowNewEntryForm(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Filter entries based on period
  const getFilteredEntries = (entriesList, period) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case "day":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return entriesList.filter((entry) => new Date(entry.date) >= startDate);
  };

  // Calculate attendance statistics
  const getAttendanceStats = (entriesList) => {
    const presentDays = entriesList.filter(
      (entry) =>
        entry.dayStatus === "Present" ||
        entry.dayStatus === "Half Day" ||
        entry.dayStatus === "Travel"
    ).length;

    const now = new Date();
    let totalDays;

    switch (filterPeriod) {
      case "day":
        totalDays = 1;
        break;
      case "week":
        totalDays = 7;
        break;
      case "month":
        totalDays = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
        break;
      case "year":
        totalDays = 365;
        break;
      default:
        totalDays = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
    }

    return { presentDays, totalDays };
  };

  // Entries List Component
  const EntriesList = ({ entriesList, showUserColumn = false }) => {
    const filteredEntries = getFilteredEntries(entriesList, filterPeriod);
    const stats = getAttendanceStats(filteredEntries);

    return (
      <div className="space-y-4">
        {/* Filter and Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>

            <div className="bg-blue-50 px-4 py-2 rounded-md">
              <span className="text-sm font-medium text-blue-800">
                Present: {stats.presentDays}/{stats.totalDays} days
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              exportToExcel(filteredEntries, `entries_${filterPeriod}.csv`)
            }
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Entries Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  {showUserColumn && (
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      User
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Day Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Work Done
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Work Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {entry.date}
                    </td>
                    {showUserColumn && (
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {entry.userName}
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {entry.projectName}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          entry.dayStatus === "Present"
                            ? "bg-green-100 text-green-800"
                            : entry.dayStatus === "Half Day"
                            ? "bg-yellow-100 text-yellow-800"
                            : entry.dayStatus === "Travel"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {entry.dayStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {entry.workDone}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          entry.workStatus === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {entry.workStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No entries found for the selected period.
            </div>
          )}
        </div>
      </div>
    );
  };

  // Users List Component (Admin only)
  const UsersList = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Users Management</h3>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users
                  .filter((user) => user.role === "user")
                  .map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 capitalize">
                        {user.role}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Entries
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Main Dashboard
  const Dashboard = () => {
    const userEntries =
      currentUser.role === "admin"
        ? entries
        : entries.filter((e) => e.userId === currentUser.id);
    const displayEntries = selectedUser
      ? entries.filter((e) => e.userId === selectedUser.id)
      : userEntries;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  WorkSnap
                </h1>
                <p className="text-gray-600">Welcome, {currentUser.name}</p>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {selectedUser ? (
            <div className="mb-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="text-blue-600 hover:text-blue-800 mb-4"
              >
                ← Back to{" "}
                {currentUser.role === "admin" ? "All Users" : "My Entries"}
              </button>
              <h2 className="text-xl font-semibold">
                Entries for {selectedUser.name}
              </h2>
            </div>
          ) : (
            <div className="flex space-x-1 mb-6">
              <button
                onClick={() => setActiveTab("entries")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === "entries"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Entries
              </button>

              {currentUser.role === "admin" && (
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === "users"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Users
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="space-y-6">
            {selectedUser ? (
              <EntriesList
                entriesList={displayEntries}
                showUserColumn={false}
              />
            ) : (
              <>
                {activeTab === "entries" && (
                  <>
                    {currentUser.role === "user" && !showNewEntryForm && (
                      <button
                        onClick={() => setShowNewEntryForm(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} />
                        <span>Add New Entry</span>
                      </button>
                    )}

                    {showNewEntryForm && <NewEntryForm />}

                    <EntriesList
                      entriesList={displayEntries}
                      showUserColumn={currentUser.role === "admin"}
                    />
                  </>
                )}

                {activeTab === "users" && currentUser.role === "admin" && (
                  <UsersList />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main App Component
  if (!currentUser) {
    return <LoginForm />;
  }

  return <Dashboard />;
};

export default BibleTranslationTracker;
