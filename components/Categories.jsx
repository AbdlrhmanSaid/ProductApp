import React from "react";

const Categories = ({ setSearch, uniqueCategories, search }) => {
  return (
    <div className="flex flex-wrap gap-4 my-4">
      <h2 className="text-2xl font-bold">الفئات:</h2>
      <button
        className={`py-2 px-4 rounded-md border-2 border-gray-400 hover:border-gray-500 ${
          search === "" ? "text-white bg-gray-800" : "text-gray-700"
        }`}
        onClick={() => setSearch("")}
      >
        الكل
      </button>
      {uniqueCategories.map((category) => (
        <button
          key={category}
          className={`py-2 px-4 rounded-md border-2 border-gray-400 hover:border-gray-500 ${
            category === search ? "text-white bg-gray-800" : "text-gray-700"
          }`}
          onClick={() => setSearch(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
