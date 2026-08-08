import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white transition"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;
