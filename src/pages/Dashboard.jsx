import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import auth from "../firebase/auth";

import ProductManager from "../components/dashboard/ProductManager";
import VideoManager from "../components/dashboard/VideoManager";
import SettingsManager from "../components/dashboard/SettingsManager";
import FarmManager from "../components/dashboard/FarmManager";
import ServicesManager from "../components/dashboard/ServicesManager";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <div className="container py-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          لوحة التحكم
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
        >
          تسجيل الخروج
        </button>
      </div>

      <div className="grid gap-8">
        <ProductManager />

        <VideoManager />

        <FarmManager />

        <ServicesManager />

        <SettingsManager />
      </div>
    </div>
  );
}

export default Dashboard;
