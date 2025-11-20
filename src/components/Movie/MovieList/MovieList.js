import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import "./MovieList.css";
import { callAPI } from "../../../util";

export default function MovieList(props) {
  // Movies state variable
  const [allMovies, setAllMovies] = useState([]);

  // Gets Called When Data is Fetched From API
  const whenMoviesLoaded = (jsonMoviesData) => {
    if (jsonMoviesData) setAllMovies(jsonMoviesData);
  };

  // Fetch the data on component mount
  useEffect(() => {
    if (allMovies.length === 0) {
      callAPI({ method: "GET", callBackFunction: whenMoviesLoaded });
    }
  }, [allMovies]);

  // Handle delete movie
  const handleDelete = (movieId) => {
    setAllMovies(allMovies.filter((movie) => movie.id !== movieId));
  };

  // Render movies
  return (
    <>
      <div className="movielist_main">
        <button
          type="button"
          onClick={() => {
            props.setCurrentState({ mode: "ADD" });
          }}
          className="add_movie_btn mt-4 mb-1 px-4 py-2 fw-bold fs-5"
        >
          Add New Movie
        </button>
        <div className="container_movie_list">
          {allMovies.length === 0 && (
            <div className="alert alert-warning" role="alert">
              No Movies Data Found
            </div>
          )}
          {allMovies.length > 0 &&
            allMovies.map((movieData) => {
              return (
                <Movie
                  key={movieData.id}
                  setCurrentState={props.setCurrentState}
                  movieData={movieData}
                  onDelete={handleDelete}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
