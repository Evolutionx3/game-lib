import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate, setPlatformIcon } from "../utils/helpers";
import Loading from "./Loading";
import { FaStar } from "react-icons/fa";

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchScreenshots();
  }, []);

  const fetchScreenshots = async () => {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.rawg.io/api/games/${id}/screenshots?key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    setScreenshots(data.results);
  };

  const fetchData = async () => {
    setLoading(true);

    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.rawg.io/api/games/${id}?key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    setGame(data);
    setLoading(false);
  };

  console.log(game);
  console.log(screenshots);

  return (
    <div className="w-full">
      {loading ? (
        <Loading />
      ) : game ? (
        <>
          <div className="flex flex-col">
            <div className="flex gap-x-4 mb-2 items-center">
              <p className="px-2 py-1 bg-neutral-200 text-zinc-900 rounded">
                {formatDate(game.released)}
              </p>
              <div className="flex gap-x-2 text-zinc-200">
                {game.parent_platforms.map((platform) => (
                  <p key={platform.platform.id} className="text-2xl">
                    {setPlatformIcon(platform.platform.id)}
                  </p>
                ))}
              </div>
              <p>{`Avg. Playtime: ${game.playtime} hours`}</p>
            </div>
            <h2 className="text-6xl font-bold mb-2">{game.name}</h2>
            <div className="flex items-center gap-x-1 font-medium bg-zinc-700 w-fit rounded p-1 mb-4">
              <FaStar className="text-yellow-400" />
              {game.rating}
            </div>
            <div className="flex">
              <div className="w-4/6">
                <img
                  src={game.background_image}
                  className="rounded drop-shadow mb-6"
                />
                <h3 className="text-4xl font-bold mb-2">About</h3>
                <p>{game.description_raw}</p>
              </div>
              <div className="w-2/6 pl-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {screenshots.map((screenshot) => (
                    <img
                      className="rounded"
                      key={screenshot.id}
                      src={screenshot.image}
                    />
                  ))}
                </div>
                <div className="flex flex-col font-medium gap-y-1 mb-6">
                  <p className="flex justify-between text-zinc-300 border-b border-zinc-700 py-2">
                    Developer:{" "}
                    <span className="text-zinc-100">
                      {game.developers[0].name}
                    </span>
                  </p>
                  <p className="flex justify-between text-zinc-300 border-b border-zinc-700 py-2">
                    Publisher:{" "}
                    <span className="text-zinc-100">
                      {game.publishers[0].name}
                    </span>
                  </p>
                  <p className="flex justify-between text-zinc-300 border-b border-zinc-700 py-2">
                    <span>Genres: </span>
                    <div>
                      {game.genres.map((genre, index) => (
                        <span className="text-zinc-100" key={genre.id}>{`${
                          genre.name
                        }${
                          index !== game.genres.length - 1 ? ", " : ""
                        }`}</span>
                      ))}
                    </div>
                  </p>
                  <p className="flex justify-between text-zinc-300 border-b border-zinc-700 py-2">
                    Metacritic:{" "}
                    <span className="text-zinc-100">{game.metacritic}</span>
                  </p>
                  <p className="flex justify-between text-zinc-300 border-b border-zinc-700 py-2">
                    ESRB Rating:{" "}
                    <span className="text-zinc-100">
                      {game.esrb_rating.name}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-medium text-2xl mb-2">Where to buy</p>
                  <div className="grid grid-cols-2 gap-2">
                    {game.stores.map((store) => (
                      <button
                        key={store.id}
                        className="bg-zinc-800 rounded py-2 drop-shadow border border-transparent hover:border-neutral-600 transition-all duration-300"
                      >
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={store.store.url}
                          className="text-zinc-200"
                        >
                          {store.store.name}
                        </a>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No game details available.</p>
      )}
    </div>
  );
};

export default GameDetails;
