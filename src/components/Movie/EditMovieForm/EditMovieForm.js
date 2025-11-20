import { useState } from "react";
import "./EditMovieForm.css";
import { callAPI } from "../../../util";

export default function EditMovieForm(props) {
  const [title, setTitle] = useState(props.movieData.title);
  const [views, setViews] = useState(props.movieData.views);
  const [image, setImage] = useState(props.movieData.image);

  const [taskStatus, setTaskStatus] = useState();

  const editDetailsToServer = () => {
    const updatedMovieData = {
      title: title,
      views: views,
      image: image,
    };
    callAPI({
      method: "PUT",
      requestBody: updatedMovieData,
      callBackFunction: function (data) {
        if (data) {
          setTaskStatus(true);
        } else {
          setTaskStatus(false);
        }
      },
      movieId: props.movieData.id,
    });
  };

  return (
    <div className="container p-4 container_edit">
      <div className="main">
        <h1 className="edit_form_header txt_center">
          Editing :{" "}
          <span className="edit_movie_name">{props.movieData.title}</span>
        </h1>

        {taskStatus === false && (
          <div className="alert alert-warning p-2 text-center" role="alert">
            Failed To Update
          </div>
        )}

        {taskStatus === true && (
          <div className="alert alert-success p-2 text-center" role="alert">
            Updated !
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="etxMovieTitle" className="form-label">
            Movie Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control edit_input"
            id="etxMovieTitle"
            placeholder="Enter Movie Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etxMovieViews" className="form-label">
            Movie Views
          </label>
          <input
            type="text"
            value={views}
            onChange={(e) => {
              setViews(e.target.value);
            }}
            className="form-control edit_input"
            id="etxMovieViews"
            placeholder="Enter Movie Views"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etxMovieImage" className="form-label">
            Movie Image
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            className="form-control edit_input"
            id="etxMovieImage"
            placeholder="Enter Movie Image URL"
          />
        </div>

        <div className="txt_center">
          <button
            className="btn btn-danger m-2 py-2 px-4 fw-bold rounded-3 fs-5"
            onClick={editDetailsToServer}
          >
            Update
          </button>
          <button
            className="btn btn-primary m-2 py-2 px-4 fw-bold rounded-3 fs-5"
            onClick={() => props.setCurrentState({ mode: "LIST" })}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
