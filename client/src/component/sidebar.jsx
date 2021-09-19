import "./css/sidebar.css";

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 ">
      <hr />
      <ul className="nav nav-pills flex-column mb-auto title-text-style">
        <li className="nav-item ">
          <a href="#" className="nav-link active" aria-current="page">
            <i className="bi bi-house-door icon-style-sidebar"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-speedometer icon-style-sidebar"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <i className="bi bi-journal-bookmark-fill icon-style-sidebar"></i>
            Log
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
