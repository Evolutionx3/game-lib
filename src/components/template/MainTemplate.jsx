import React from "react";
import Nav from "../organisms/Nav";

const MainTemplate = ({ children }) => {
  return (
    <div className="bg-zinc-900 text-gray-50">
      <Nav />
      <div className="flex justify-center align-center">
        <div className="w-full flex px-8 py-6">
          <div className="w-56 h-screen px-4 py-6"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;
