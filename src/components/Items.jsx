import axios from "axios";
import React, { useEffect, useState } from "react";

const Items = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  async function userData() {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );
    setItems(response.data.data);
    console.log(response.data.data);
  }
  useEffect(() => {
    userData();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setItems(items.filter((item) => item.id != id));
    } catch (error) {
      console.error("Failed to delete user");
    }
  }

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
                // onClick={() => handleEdit(item.id)}
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
      <div className="flex justify-center">
        <button className="bg-[#22282F] text-white uppercase mt-0 m-10 px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Items;
