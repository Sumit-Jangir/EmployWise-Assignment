import axios from "axios";
import { useEffect, useState } from "react";

const UsersData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    async function userData() {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        if (response.status === 200) {
          setUsers(response.data.data);
        } else {
          alert("Failed to fetch users");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Failed to fetch users");
      }
    }
    userData();
  }, [currentPage]);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response.status === 204) {
        setUsers(users.filter((item) => item.id != id));
      } else {
        alert("Failed to delete user");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to delete user");
    }
  }

  const handleEdit = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${userToEdit.id}`, userToEdit);
      if (response.status === 200) {
        setUsers((prevusers) => prevusers.map((item) => (item.id === userToEdit.id ? userToEdit : item)));
        setIsModalOpen(false);

        alert("User updated successfully");
      } else {
        console.error("Failed to update user");
      }

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.error("Failed to update user");
    }
  };

  return (
    <div className="w-full h-screen">
      <h1 className="text-center text-4xl pt-10 font-bold">Users List</h1>
      <div className="flex flex-wrap justify-center sm:p-10 px-2 py-10 gap-6">
        {users.map((item) => (
          <div className="border border-slate-400 rounded p-2 px-4  w-full max-w-80 hover:bg-zinc-100" key={item.id}>
            <div className="flex gap-3">
              <img className="sm:h-14 sm:w-14 w-12 h-12 rounded-full" src={item.avatar} alt="image" />
              <div>
                <h3 className="sm:text-xl text-base font-semibold">
                  {item.first_name} {item.last_name}
                </h3>
                <p className="sm:text-lg text-sm">{item.email}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                className="bg-black text-white rounded-full px-4 py-1.5"
                onClick={() => {
                  setIsModalOpen(true);
                  setUserToEdit(item);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
              <button
                className="bg-red-500 text-white capitalize px-4 py-1.5 rounded-full"
                onClick={() => handleDelete(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-0 p-10">
        {currentPage > 1 && (
          <button
            className="bg-[#22282F] text-white uppercase  px-4 py-2 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {currentPage < 2 && (
          <button
            className="bg-[#22282F] text-white uppercase px-4 py-2 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>

      {isModalOpen && userToEdit && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 py-4 px-5 rounded-lg shadow-lg max-w-md w-full relative">
            <span
              className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold absolute top-0 right-3"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h3 className="text-xl font-bold pb-4">Edit Details</h3>

            <div className="flex flex-col gap-2">
              <label>
                First Name:
                <input
                  placeholder="john"
                  className="w-full border rounded p-2 outline-none"
                  type="text"
                  value={userToEdit.first_name || ""}
                  onChange={(e) => setUserToEdit({ ...userToEdit, first_name: e.target.value })}
                />
              </label>

              <label>
                Last Name:
                <input
                  placeholder="doe"
                  className="w-full border rounded p-2 outline-none"
                  type="text"
                  value={userToEdit.last_name || ""}
                  onChange={(e) => setUserToEdit({ ...userToEdit, last_name: e.target.value })}
                />
              </label>

              <label>
                Email:
                <input
                  placeholder="john@gmail.com"
                  className="w-full border rounded p-2 outline-none"
                  type="email"
                  value={userToEdit.email || ""}
                  onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                />
              </label>
            </div>

            <button onClick={handleEdit} className="bg-black text-white uppercase mt-3 px-4 py-2 rounded float-end">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersData;
