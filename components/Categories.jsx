import React from "react";

const Categories = ({ setSearch, uniqueCategories, search }) => {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">الفئات:</h2>
      <div className="flex items-center flex-wrap gap-2">
        <button
          className={`py-2 px-4 rounded-lg shadow-sm border-2 transition-all duration-300
                      ${
                        search === ""
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                      }`}
          onClick={() => setSearch("")}
        >
          الكل
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg shadow-sm border-2 transition-all duration-300
                        ${
                          category === search
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                        }`}
            onClick={() => setSearch(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
