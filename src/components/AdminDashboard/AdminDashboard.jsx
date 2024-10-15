import { useEffect, useState } from "react";
import {
  Search,
  Edit2,
  Menu,
  Bell,
  ChevronDown,
  Users,
  Settings,
  User,
} from "lucide-react";
import { getAllUserData, UserAction } from "../../Service/AdminService";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllUserData();
      if (response.status === 200) {
        setUsers(response.data);
      }
    };
    fetchData();
  }, []);

  const handleToggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
      const response = await UserAction(id, newStatus);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Admin Logout successfully");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  if (!token) {
    toast.error("Admin is not logged in");
    navigate("/admin");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <aside
        className={`bg-indigo-700 text-white w-64 min-h-screen p-4 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-2xl font-semibold">Enlite Admin</span>
          </div>
        </div>
        <nav>
          <a
            href="#"
            className="flex items-center py-2 px-4 text-gray-100 hover:bg-indigo-600 rounded"
          >
            <Users className="mr-3" size={20} />
            <span>Users</span>
          </a>
          <a
            href="#"
            className="flex items-center mt-2 py-2 px-4 text-gray-100 hover:bg-indigo-600 rounded"
          >
            <Settings className="mr-3" size={20} />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center ml-auto space-x-4">
              <button className="text-gray-600 focus:outline-none">
                <Bell size={24} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <User size={24} className="text-gray-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    John Doe
                  </span>
                  <ChevronDown size={16} className="ml-1 text-gray-500" />
                </button>
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium mb-6">
              User Management
            </h3>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    className="block w-full pl-10 pr-3 py-2 rounded-md bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    placeholder="Search users..."
                  />
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                Add New User
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <User size={40} className="text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.userName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.userEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "Blocked"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            handleToggleBlock(user._id, user.status)
                          }
                          className={`text-${
                            user.status === "Blocked" ? "green" : "red"
                          }-600 hover:text-${
                            user.status === "Blocked" ? "green" : "red"
                          }-900 mr-5`}
                        >
                          {user.status === "Blocked" ? "Unblock" : "Block"}
                        </button>
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                           
                            navigate(`/admin/useredit/${user._id}`);
                          }}
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
