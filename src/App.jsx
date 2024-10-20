import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UsersData from "./components/UserData";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={token ? <Navigate to="/" /> : <SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<UsersData />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
