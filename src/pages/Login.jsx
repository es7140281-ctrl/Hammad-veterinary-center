import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import auth from "../firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    console.log("login start");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("login success", userCredential.user);

      navigate("/dashboard");
    } catch (err) {
      console.log("login error:", err.code, err.message);

      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          تسجيل دخول لوحة التحكم
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg border outline-none dark:bg-slate-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg border outline-none dark:bg-slate-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          دخول
        </button>
      </form>
    </div>
  );
}

export default Login;
