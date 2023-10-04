import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Link to="/">
      <nav className="px-8 py-4">
        <div className="px-1 flex justify-between items-center gap-8">
          <h2 className="font-russo-one text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-400">
            GameLib
          </h2>
          <input
            type="text"
            placeholder="Search for a game..."
            className="input bg-zinc-800 border border-neutral-600 w-full "
          />
          <div className="flex gap-x-4">
            <p>Profile</p>
            <p>Library</p>
          </div>
        </div>
      </nav>
    </Link>
  );
};

export default Nav;
