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

  return (
    <div className="bg-gray-200 h-full ">
      <h1 className="text-center text-4xl pt-10 font-bold">User List</h1>
      <div className="flex flex-wrap p-10 justify-center items-center">
        {items.map((item) => (
          <div className="w-full bg-gray-300 rounded p-6 m-8 md:max-w-sm md:mx-auto">
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
              <button className="bg-[#22282F] text-white uppercase mt-6 px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-[#22282F] text-white uppercase mt-6 px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
