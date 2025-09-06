import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/me", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-blue-400 transition">
        MyAuthApp
      </Link>
      <div className="space-x-4">
        {isAuth ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
