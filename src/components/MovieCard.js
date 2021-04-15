import { format } from "date-fns";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="rounded-lg bg-white shadow-lg border">
        <div className="relative">
          <img
            className="rounded-tl-lg rounded-tr-lg object-cover w-full"
            src={
              movie.poster_path !== null
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "https://via.placeholder.com/254x381"
            }
            alt="Poster"
            style={{ width: 254, height: 381 }}
          />
          {movie.vote_average !== 0 && (
            <div className="absolute top-2 left-2 bg-blue-300 text-white rounded-full p-2 font-black">
              {movie.vote_average}
            </div>
          )}
        </div>
        <div className="px-4 py-3">
          <p className="font-medium cursor-pointer block">
            {movie.original_title}
          </p>
          <span className="text-gray-500 text-sm">
            {format(new Date(movie.release_date), "dd LLL Y")}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
