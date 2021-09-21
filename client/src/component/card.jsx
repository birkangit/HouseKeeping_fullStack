import "./css/cardOpt.css";
import PieInfo from "./pie";

function CardElement() {
  return (
    <div className="card box-padding text-center align-self-center border-hover">
      <div className="align-self-end close-button">
        <div className="card-title">
          <i className="bi bi-x-circle icon-style" type="submit"></i>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">Disk Name : C:/</h5>
        <PieInfo />
      </div>
    </div>
  );
}

export default CardElement;
