import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import LoginPage from "./components/LoginPage/LoginPage.jsx";
import SignUpPage from "./components/Signup/SignUpPage.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import UserLoginPage from "./components/LoginPage/UserLogin/UserLoginPage.jsx";
import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import UserEdit from "./components/AdminDashboard/UserEdit.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/useredit/:id" element={<UserEdit/>} />
          


          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
