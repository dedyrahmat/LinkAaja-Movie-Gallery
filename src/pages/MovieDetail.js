import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosGlobal, minutesToHours } from "../helpers/global";
import { format } from "date-fns";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({ genres: [{}] });
  const [casts, setCasts] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetchMovieDetail();
    fetchCasts();
    return () => {
      setMovie({});
    };
  }, []);

  const fetchMovieDetail = () => {
    setIsFinished(false);
    axiosGlobal
      .get(`/movie/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setMovie(response.data);
          setIsFinished(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchCasts = () => {
    setIsFinished(false);
    axiosGlobal
      .get(`/movie/${id}/credits`)
      .then((response) => {
        if (response.status === 200) {
          setCasts(response.data.cast);
          setIsFinished(true);
        }
      })
      .catch((error) => console.error(error));
  };

  if (!isFinished) {
    return (
      <div className="items-center justify-center flex h-screen">
        <span className="material-icons animate-spin text-9xl text-center">
          loop
        </span>
      </div>
    );
  }
  return (
    <div>
      <div className="relative">
        <section className="p-10 relative bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <img
            loading="lazy"
            className="rounded object-cover w-full absolute top-0 left-0 z-0 opacity-40 h-full object-top"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Poster"
          />
          <div className="flex relative space-x-6 px-20">
            <div className="relative">
              <img
                loading="lazy"
                className="rounded object-cover"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                alt="Poster"
                style={{ width: 300, height: 450 }}
              />
              <div className="absolute top-2 left-2 bg-blue-300 text-white rounded-full p-2 font-black">
                {movie.vote_average}
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">
                {movie.original_title} (
                {new Date(movie.release_date).getFullYear()})
              </h1>
              <div className="flex">
                <span>{format(new Date(movie.release_date), "dd LLL Y")} </span>
                <span>
                  ・{movie.genres.map((item) => item.name).join(", ")}
                </span>
                <span>・ {minutesToHours(movie.runtime)}</span>
              </div>
              <div className="mt-4">
                <p className="font-medium text-lg">Overview</p>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-32 py-10">
          <h1 className="text-2xl font-bold">Cast</h1>
          <div className="grid grid-cols-10 gap-4 my-6">
            {casts.map((cast, index) => (
              <div className="shadow border rounded-lg" key={index}>
                <img
                  className="rounded-tl-lg rounded-tr-lg object-cover object-top w-full"
                  src={
                    cast.profile_path !== null
                      ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                      : "https://via.placeholder.com/138x175?text=No+Portait"
                  }
                  style={{ width: 138, height: 175 }}
                />
                <div className="mx-2 my-1">
                  <p className="font-bold">{cast.original_name}</p>
                  <p>{cast.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieDetail;
