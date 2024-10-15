import  { useState } from 'react';
import { ArrowRight, Settings } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('indigo');

  const themes = {
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
  };

  const changeTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password link sent to:', email);
  };

  return (
    <div className={`${themes[theme]} min-h-screen flex flex-col items-center justify-center p-4`}>
      <div className="absolute top-4 left-4 text-white text-2xl font-semibold flex items-center">
        <span className="mr-2">☯</span> Enlite Prime
      </div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className={`text-3xl font-bold ${themes[theme].replace('bg-', 'text-')} mb-2`}>Reset Password</h2>
        <p className="text-gray-600 mb-6">Send reset password link to your email</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${themes[theme]} text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 flex items-center justify-center`}
          >
            SEND RESET LINK <ArrowRight size={16} className="ml-2" />
          </button>
        </form>
      </div>
      <button 
        className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-indigo-600 hover:bg-opacity-90 transition duration-300"
        onClick={changeTheme}
      >
        <Settings size={24} />
      </button>
    </div>
  );
};

export default ForgotPasswordPage;