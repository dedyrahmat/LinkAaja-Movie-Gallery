import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { axiosGlobal } from "../helpers/global";
import Pagination from "react-js-pagination";

function Index() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, [page]);
  const fetchMovies = () => {
    axiosGlobal
      .get("/movie/popular", {
        params: {
          page,
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
      <section className="pt-20">
        <div className="relative">
          <input
            type="search"
            className="border focus:shadow-lg w-full rounded-full py-4 px-8 outline-none text-xl"
            onChange={(e) => searchMovie(e.target.value)}
          />
          <span className="material-icons absolute text-2xl right-5 top-4 text-gray-800">
            search
          </span>
        </div>
      </section>
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
    </div>
  );
}

export default Index;
