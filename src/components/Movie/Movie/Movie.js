import "./Movie.css";
import { callAPI } from "../../../util";

export default function Movie(props) {
  const deleteItem = () => {
    callAPI({
      method: "DELETE",
      callBackFunction: (res) => {
        if (res) {
          props.onDelete(props.movieData.id);
        } else {
          console.error("Failed to delete the movie");
        }
      },
      movieId: props.movieData.id,
    });
  };

  return (
    <div className="card card_movie">
      <img
        src={props.movieData.image}
        className="card-img-top movie_img"
        alt="Movie Link"
      ></img>
      <div className="card-body">
        <h5 className="card-title fw-bold fs-3">{props.movieData.title}</h5>
        <p className="card-text fw-bold fs-5">{props.movieData.views}</p>
        <button
          onClick={() =>
            props.setCurrentState({ mode: "EDIT", movieData: props.movieData })
          }
          className="btn btn-primary fw-bold px-4 py-1 btn_font"
        >
          Edit
        </button>
        <button
          onClick={deleteItem}
          className="btn btn-danger margin_left fw-bold px-4 py-1 btn_font"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
