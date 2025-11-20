import "./AddMovieForm.css";
import { callAPI } from "../../../util";
import { useState } from "react";

export default function AddMovieForm(props) {
  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");
  const [image, setImage] = useState("");

  const [taskStatus, setTaskStatus] = useState();

  const addDetailsToServer = (e) => {
    e.preventDefault();

    const newMovieData = {
      title: title,
      views: views,
      image: image,
    };
    callAPI({
      method: "POST",
      requestBody: newMovieData,
      callBackFunction: function (data) {
        if (data) {
          setTaskStatus(true);
          setTitle("");
          setViews("");
          setImage("");
        } else {
          setTaskStatus(false);
        }
      },
    });
  };

  return (
    <div className="container p-4 container_add">
      <form>
        <h1 className="txt_center add_form_header">Add New Movie</h1>
        {taskStatus === false && (
          <div className="alert alert-warning p-2 text-center" role="alert">
            Failed To Add
          </div>
        )}
        {taskStatus === true && (
          <div className="alert alert-success p-2 text-center" role="alert">
            Added !
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
            className="form-control add_input"
            id="etxMovieTitle"
            placeholder="Enter Movie Title"
            required
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
            className="form-control add_input"
            id="etxMovieViews"
            placeholder="Enter Movie Views"
            required
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
            className="form-control add_input"
            id="etxMovieImage"
            placeholder="Enter Movie Image URL"
            required
          />
        </div>
        <div className="txt_center">
          <button
            type="submit"
            className="btn btn-danger m-2 py-2 px-4 fw-bold rounded-3 fs-5"
            onClick={addDetailsToServer}
          >
            Add
          </button>
          <button
            className="btn btn-primary m-2 py-2 px-4 fw-bold rounded-3 fs-5"
            onClick={() => props.setCurrentState({ mode: "LIST" })}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
