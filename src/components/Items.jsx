import axios from "axios";
import React, { useEffect, useState } from "react";

const Items = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [view, setView] = useState([]);

  async function userData() {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    setItems(response.data.data);
  }
  useEffect(() => {
    userData();
  }, [page]);

  async function handleDelete(id) {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setItems(items.filter((item) => item.id != id));
    } catch (error) {
      console.error("Failed to delete user");
    }
  }

  async function handleEdit(id) {
    try {
      setSelectedProduct(true);
      const singleItem = await axios.get(`https://reqres.in/api/users/${id}`);
      setView(singleItem.data.data);
    } catch (error) {
      console.error("Failed to delete user");
    }
  }

  const closeModal = () => {
    setSelectedProduct(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${view.id}`, view);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === view.id ? view : item))
      );
      closeModal();
      // alert("User updated successfully");
    } catch (error) {
      console.error("Failed to update user");
    }
  };

  return (
    <div className="w-full bg-gray-200 h-full ">
      <h1 className="text-center text-4xl pt-10 font-bold">User List</h1>
      <div className="flex flex-wrap p-10 justify-center items-center">
        {items.map((item) => (
          <div
            className="w-full bg-gray-300 rounded p-6 m-8 md:max-w-sm md:mx-auto"
            key={item.id}
          >
            <img
              className="h-full w-full rounded-md "
              src={item.avatar}
              alt="image"
            />
            <p className="text-lg pt-4 ">
              Full Name: {item.first_name} {item.last_name}
            </p>
            <p className="text-lg ">Email: {item.email}</p>

            <div className="flex justify-between">
              <button
                className="bg-[#22282F] text-white uppercase mt-6 px-4 py-2 rounded"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="bg-[#22282F] text-white uppercase mt-6 px-4 py-2 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-0 p-10">
        {page > 1 && (
          <button
            className="bg-[#22282F] text-white uppercase  px-4 py-2 rounded"
            onClick={() => setPage(page - 1)}
          >
            Previous Page
          </button>
        )}
        {page < 2 && (
          <button
            className="bg-[#22282F] text-white uppercase px-4 py-2 rounded"
            onClick={() => setPage(page + 1)}
          >
            Next Page
          </button>
        )}
      </div>

      {selectedProduct && view && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-md w-full">
            <span
              className="text-gray-500 hover:text-gray-800 cursor-pointer text-2xl font-bold float-right"
              onClick={closeModal}
            >
              &times;
            </span>

            <p>
              <label>
                First Name:
                <input
                  className="w-full border rounded p-2 outline-none"
                  type="text"
                  value={view.first_name || ""}
                  onChange={(e) =>
                    setView({ ...view, first_name: e.target.value })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Last Name:
                <input
                  className="w-full border rounded p-2 outline-none"
                  type="text"
                  value={view.last_name || ""}
                  onChange={(e) =>
                    setView({ ...view, last_name: e.target.value })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Email:
                <input
                  className="w-full border rounded p-2 outline-none"
                  type="email"
                  value={view.email || ""}
                  onChange={(e) => setView({ ...view, email: e.target.value })}
                />
              </label>
            </p>

            <button
              onClick={handleUpdate}
              className="bg-[#22282F] text-white uppercase mt-3 px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
