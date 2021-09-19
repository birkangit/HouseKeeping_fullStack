import OffCanvas from "./offCanvas";
import "./css/cardOpt.css";

function AddCard() {
  return (
    <div class=" text-center align-self-center ">
      <div class="card-body add-card">
        <h5 class="card-title">Create</h5>
        <OffCanvas />
      </div>
    </div>
  );
}

export default AddCard;
