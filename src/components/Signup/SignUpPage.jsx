import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Toaster, toast } from "react-hot-toast";
import { Eye, ArrowLeft, ChevronDown, Settings } from "lucide-react";
import { userSignUp } from "../../Service/UserService";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("sky");

  const themes = {
    sky: "bg-sky-600",
    indigo: "bg-indigo-600",
    green: "bg-green-600",
    red: "bg-red-600",
  };

  const changeTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
   try{
    console.log("Welcome to user sign up",email,password,confirmPassword,mobile)
    const response = await userSignUp(email,password,confirmPassword,mobile)
    if(response.status===201){
      toast.success("Sign up Successfull");
      setTimeout(() => {
        
        navigate("/")
      }, 1500);
    }

   }catch(err){
    console.log("Error in user sign up",err)
   }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`${themes[theme]} text-white lg:w-2/5 p-8 flex flex-col justify-between relative`}
      >
        <div>
          <h1 className="text-2xl font-semibold mb-2 flex items-center">
            <span className="mr-2">☯</span> Enlite Prime
          </h1>
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Welcome to Enlite Prime!
          </h2>
          <p className="text-xl">Please sign up to create a new account</p>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm hover:underline transition duration-300"
          >
            <ArrowLeft size={16} className="mr-2" /> back to site
          </button>
          <div className="relative">
            <button
              className="flex items-center text-sm focus:outline-none hover:bg-opacity-20 hover:bg-black p-2 rounded transition duration-300"
              onClick={() =>
                setLanguage(language === "English" ? "Hindi" : "English")
              }
            >
              <span className="mr-2">🇬🇧</span>
              <span>{language}</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-0 p-2 rounded-l-full bg-white text-sky-600 hover:bg-opacity-90 transition duration-300"
          onClick={changeTheme}
        >
          <Settings size={24} />
        </button>
      </div>

      <div className="lg:w-3/5 p-8 bg-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sign up</h2>
            <button
              onClick={() => navigate("/")}
              className={`text-sm ${themes[theme].replace(
                "bg-",
                "text-"
              )} hover:underline`}
            >
              Already have an account? Sign in
            </button>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="john.doe@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Mobile
              </label>
              <input
                type="text"
                id="mobile"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Enter Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Eye
                className="absolute right-3 bottom-3 text-gray-400"
                size={20}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full ${themes[theme]} text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-300`}
            >
              SIGN UP →
            </button>
          </form>

          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">Or sign up with</p>
            <div className="mt-4 flex justify-center space-x-3">
              <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300">
                <span className="mr-2">G</span> GOOGLE
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 transition duration-300">
                <span className="mr-2">T</span> TWITTER
              </button>
              <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 transition duration-300">
                <span className="mr-2">G</span> GITHUB
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
