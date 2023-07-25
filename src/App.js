import React, { useEffect, useState } from "react";
import Pagination from "./Components/Pagination";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5; // Number of items to display per page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  async function getData() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result = await apiResponse.json();
      setPosts(result);
      console.log(result);
      setLength(Math.ceil(result.length / itemsPerPage));
      setLoading(false);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getItemsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return posts?.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Demo</h1>
      <ul className="space-y-2 font-bold mb-10 grid grid-cols-4 gap-5 ">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          getItemsForCurrentPage().map((item) => (
            <li
              key={item?.id}
              className="border border-gray-300 shadow-sm max-w-sm p-5"
            >
              <div className="flex flex-col gap-2">
                <h1>{item.id}</h1>
                <h1 className="text-xl">{item?.title.slice(0, 20)} ...</h1>
                <p>{item?.body.slice(0, 100)} ...</p>
              </div>
            </li>
          ))
        )}
      </ul>
      {length && (
        <Pagination
          totalPages={length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default App;
