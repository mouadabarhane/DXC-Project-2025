import React from "react";

const Search = () => {
  return (
    <div>
      <form>
        <div className="relative">
          <div className="inset-y-0 left-0 flex items-center  pl-3 px-10 pointer-events-none"></div>
          <input
            type="search"
            id="search"
            className=" shadow-md block w-full p-4 pl-10 text-sm  text-gray-900 border  bg-white-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
