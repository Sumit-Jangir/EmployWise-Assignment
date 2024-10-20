import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError("Invalid Email or Password");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Invalid Email or Password");
    }
  }

  return (
    <div className="flex bg-gray-200 items-center h-screen w-full justify-center px-4">
      <div className="bg-gray-300 rounded py-8 px-6">
        <div className="text-2xl uppercase font-bold text-center mb-4">Sign in</div>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button
            type="submit"
            className="bg-black w-full text-white uppercase text-sm font-semibold mt-6 px-4 py-2 rounded"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
