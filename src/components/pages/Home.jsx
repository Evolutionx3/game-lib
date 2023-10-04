import { useEffect, useState } from "react";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import Loading from "../Loading";
import Games from "../Games";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(36);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    calculateTotalPages();
  }, [count, pageSize]);

  const fetchData = async () => {
    setLoading(true);

    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.rawg.io/api/games?page_size=${pageSize}&page=${page}&key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    setLoading(false);
    setCount(data.count);
    setGames(data.results);
  };

  const calculateTotalPages = () => {
    return Math.ceil(count / pageSize);
  };

  const handlePageChange = (pageNumber) => {
    window.scroll(0, 0);
    setPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const totalPages = calculateTotalPages();
    const visiblePages = 4; // Number of visible pages
    const buttons = [];

    let startPage = page - Math.floor(visiblePages / 2);
    let endPage = page + Math.floor(visiblePages / 2);

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    if (startPage <= 0) {
      startPage = 1;
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className={`join-item btn bg-zinc-800 hover:border-neutral-600 hover:bg-zinc-800 mr-1`}
        >
          <MdFirstPage />
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`join-item btn bg-zinc-800 hover:border-neutral-600 hover:bg-zinc-800 ${
            i === page ? "bg-zinc-700" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={`join-item btn bg-zinc-800 hover:border-neutral-600 hover:bg-zinc-800 ml-1`}
        >
          <MdLastPage />
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div className="flex flex-col gap-y-4 mb-4">
        <h2 className="font-bold text-7xl">Popular games</h2>
        <p>Based on rating count</p>
      </div>
      <div className="grid gap-8 grid-cols-4">
        {loading ? <Loading /> : <Games games={games} />}
      </div>
      <div className="join mx-auto py-4 gap-x-0.5">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default Home;
