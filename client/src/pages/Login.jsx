import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", form);
      const user = res.data.user;
  
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
        window.location.reload();
  
        if (user.role === "creator") {
          navigate("/CreatorDashboard");
        } else {
          navigate("/gallery");
        }
  
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <div className="space-y-4">
          <input
            
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryorange-100 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryorange-100 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold p-3 rounded-lg"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-primaryorange-100 hover:text-primaryorange-200 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
