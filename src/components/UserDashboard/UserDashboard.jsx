import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getIndividualUserData } from "../../Service/UserService.js";
import { useNavigate } from "react-router-dom";


const UserDashboard = () => {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const response = await getIndividualUserData();
      console.log("response in dashboard", response.data[0]);
      if (response.status === 200) {
        setUserData(response.data[0]);
      }
    };
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAccessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {userData?.userName}!
        </h1>
        <div className="space-y-3 mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {userData?.userEmail}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Mobile:</span>{" "}
            {userData?.userMobile}
          </p>
        </div>
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
