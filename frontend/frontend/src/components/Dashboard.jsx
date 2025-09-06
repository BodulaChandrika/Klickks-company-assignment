import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">🎉 Dashboard</h2>
      <p className="mb-6">You are logged in successfully!</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
