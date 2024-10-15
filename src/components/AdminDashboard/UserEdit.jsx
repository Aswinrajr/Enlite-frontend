import { useState, useEffect } from "react";
import { X, Save, User } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { editUserData, updateUserData } from "../../Service/AdminService";
import { Toaster, toast } from "react-hot-toast";

const UserEdit = () => {
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState({});
  const params = useParams();
  const { id } = params;
  const token = localStorage.getItem("accessToken");
  console.log(token)
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await editUserData(id);
      if (response.status === 200) {
        setEditedUser(response.data.users);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if(!token){
      console.log("yes")
      return navigate("/admin")
    }
  },[navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updating.....")
    try {
      const response = await updateUserData(id, editedUser);
      if (response.status === 200) {
        toast.success("User data updated Successfully")
        setTimeout(() => {
          navigate("/admin/dashboard");
          
        }, 1500);
      } else {
        console.error("Failed to update user:", response);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard")
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative p-8 bg-white w-full max-w-md m-auto rounded-xl shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white mb-4">
            <User size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Edit User</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={editedUser?.userName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={editedUser?.userEmail || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancels
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Save size={16} className="inline mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
