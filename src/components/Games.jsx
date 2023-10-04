import React from "react";

import { Link } from "react-router-dom";
import { setPlatformIcon } from "../utils/helpers";

const Games = ({ games }) => {
  return (
    <>
      {games.map((game) => (
        <Link key={`${game.id}`} to={`/game/${game.id}`}>
          <div className="rounded-lg bg-zinc-800 flex flex-col shadow-md border border-transparent hover:scale-105 hover:cursor-pointer hover:border hover:border-neutral-600 transition-all duration-300">
            <div className="w-full h-40">
              <img
                key={`cover ${game.name}`}
                src={game.background_image}
                alt={`${game.name} cover`}
                className="h-full w-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <div className="flex gap-x-1">
                  {game.parent_platforms.map((platform) => (
                    <p key={platform.platform.id}>
                      {setPlatformIcon(platform.platform.id)}
                    </p>
                  ))}
                </div>
                <div
                  className={`border rounded px-1.5 py-0.5 ${
                    game.rating < 3
                      ? "border-red-400 text-red-400"
                      : game.rating < 4
                      ? "border-orange-400 text-orange-400"
                      : "border-green-400 text-green-400"
                  }`}
                >
                  <p className="text-xs">{game.rating}</p>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 h-14">{game.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Games;
