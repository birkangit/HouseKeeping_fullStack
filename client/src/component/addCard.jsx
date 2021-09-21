import OffCanvas from "./offCanvas";
import "./css/cardOpt.css";

function AddCard() {
  return (
    <div className=" text-center align-self-center add-card">
      <div className="card-body align-middle ">
        <h5 className="card-title">Add a new path </h5>
        <OffCanvas />
      </div>
    </div>
  );
}

export default AddCard;
