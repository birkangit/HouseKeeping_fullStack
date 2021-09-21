import React from "react";
import offcanvas from "bootstrap";
import "./css/offcanvas.css";

function OffCanvas() {
  return (
    <>
      <i
        class="icon-canvas bi bi-plus-circle-fill "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      ></i>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Add a new path</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <form>
            <label for="inputPassword5" class="form-label">
              Enter the path:
            </label>
            <input
              type="url"
              id="inputPassword5"
              class="form-control"
              aria-describedby="passwordHelpBlock"
              placeholder="c:/project/media"
            />
            <div id="passwordHelpBlock" class="form-text">
              Supports paths on local storage or network
            </div>
            <label for="inputPassword5" class="form-label percentage-label">
              Enter the maximum disk usage percentage:
            </label>
            <div class="input-group mb-3 align-self-center percentage-field">
              <input
                type="text"
                class="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                value="80"
              />
              <span class="input-group-text ">%</span>
            </div>
            <button
              type="submit"
              class="btn text-white"
              style={{ backgroundColor: "#ff4343" }}
            >
              Create <i class="bi bi-plus-lg"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OffCanvas;
