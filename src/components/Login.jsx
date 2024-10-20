import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/data");
    } catch (error) {
      setError("Invalid Email or Password");
    }
  }

  return (
    <>
      {/* <div className="bg-gray-200"> */}
      <div className="flex bg-gray-200 items-center h-screen w-full">
        <div className="w-full bg-gray-300 rounded p-8 md:max-w-sm md:mx-auto">
          <div className="text-2xl uppercase font-bold text-center mb-4">
            Login
          </div>
          <form className="mb-" onSubmit={handleSubmit}>
            <div className="mb-4 md:w-full">
              <label className="text-lg mb-3">
                Email
                <input
                  className="w-full border rounded p-2 outline-none"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </label>
            </div>
            <div className="md:w-full">
              <label className="text-lg mb-3">
                Password
                <input
                  className="w-full border rounded p-2 outline-none "
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-[#22282F] text-white uppercase text-sm font-semibold mt-6 px-4 py-2 rounded"
              >
              Login
            </button>

          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Login;
