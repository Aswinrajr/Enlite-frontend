import  { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { editUserData, updateUserData } from '../../Service/AdminService'; 

const UserEdit = ({ onSave, onCancel }) => {
    const navigate = useNavigate()
  const [editedUser, setEditedUser] = useState({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await editUserData(id);
      if (response.status === 200) {
        setEditedUser(response.data.users);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserData(id, editedUser); 
      if (response.status === 200) {
        navigate("/admin/dashboard")
      
      } else {
        console.error('Failed to update user:', response);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
      <div className="relative p-8 bg-white w-full max-w-md m-auto rounded-lg shadow-xl">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-blue-100 text-blue-500 mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
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
              value={editedUser?.userName || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              value={editedUser?.userEmail || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={editedUser?.status || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
