import React, { useState } from "react";
import offcanvas from "bootstrap";
import "./css/offcanvas.css";
import axios from "axios";

const OffCanvas = () => {
  const [state, setState] = useState({
    Path: "",
    Percentage: "",
    Expiredays: "",
  });

  /**
   {
    "Path":"c:\\vids",
    "Percentage":"45",
    "Expiredays":0
  }
   */
  const [result, setResult] = useState(null);

  const sendData = (event) => {
    event.preventDefault();
    axios
      .post("/send", { ...state })
      .then((response) => {
        setResult(response.data);
        setState({ path: "", percentage: "" });
      })
      .catch(() => {
        setResult({
          success: false,
          message: "Something went wrong. Try again later",
        });
      });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <i
        className="icon-canvas bi bi-plus-circle-fill "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></i>

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Add a new path</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <form onSubmit={sendData}>
          <div className="offcanvas-body">
            <label className="form-label">Enter the path:</label>
            <input
              name="path"
              type="url"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              placeholder="c:/project/media"
              value={state.path}
              onChange={onInputChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Supports paths on local storage or network
            </div>
            <label className="form-label percentage-label">
              Enter the maximum disk usage percentage:
            </label>
            <div className="input-group mb-3 align-self-center percentage-field">
              <input
                name="percentage"
                type="text"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                value={state.percentage}
                onChange={onInputChange}
              />
              <span className="input-group-text ">%</span>
            </div>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#ff4343" }}
            >
              Create <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default OffCanvas;
