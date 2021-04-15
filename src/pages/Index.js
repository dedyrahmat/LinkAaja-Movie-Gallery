import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { axiosGlobal } from "../helpers/global";
import Pagination from "react-js-pagination";

function Index() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getYearsList();
    fetchMovies();
  }, [page, year]);

  const getYearsList = () => {
    const maxOffset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const thisYear = new Date().getFullYear();
    const allYears = [];
    for (const iterator of maxOffset) {
      allYears.push(thisYear - iterator);
    }
    setYears(allYears);
  };
  const fetchMovies = () => {
    setMovies([]);
    axiosGlobal
      .get("/discover/movie", {
        params: {
          page,
          year,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setMovies(response.data.results);
          setTotal(response.data.total_results);
        }
      })
      .catch((error) => console.error(error));
  };

  const searchMovie = (query) => {
    if (query) {
      setPage(1);
      axiosGlobal
        .get("/search/movie", {
          params: {
            page,
            query,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setMovies(response.data.results);
            setTotal(response.data.total_results);
          }
        })
        .catch((error) => console.error(error));
    } else {
      fetchMovies();
    }
  };
  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setPage(pageNumber);
  };
  return (
    <div className="container px-24 mx-auto">
      <section className="pt-20 grid grid-cols-12 space-x-2">
        <div className="relative col-span-11">
          <input
            type="search"
            className="border focus:shadow-lg w-full rounded-full py-4 px-8 outline-none text-xl"
            onChange={(e) => searchMovie(e.target.value)}
          />
          <span className="material-icons absolute text-2xl right-5 top-4 text-gray-800">
            search
          </span>
        </div>
        <div>
          <select
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-full outline-none text-xl py-4 px-3"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </section>
      {movies.length === 0 ? (
        <span className="material-icons animate-spin text-9xl text-center items-center justify-center flex">
          loop
        </span>
      ) : (
        <main className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 my-6">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
          <Pagination
            activePage={page}
            totalItemsCount={total}
            onChange={handlePageChange}
            innerClass="flex flex-row items-center justify-center"
            itemClass="bg-blue-100 py-2 px-4 mx-1 rounded font-bold"
            linkClass="text-gray-700 hover:no-underline hover:text-gray-700"
            hideFirstLastPages={true}
            activeClass="bg-blue-400"
            activeLinkClass="text-white"
          />
        </main>
      )}
    </div>
  );
}

export default Index;
