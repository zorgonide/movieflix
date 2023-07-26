import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Shared/js/user-context";
function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const { dispatch } = useUser();
  const {
    state: { user },
  } = useUser();
  let navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <a
        className="navbar-brand logo d-none d-md-inline"
        onClick={() => navigate("/")}
      >
        <h1>MovieFlix</h1>
      </a>
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {user.role === "USER" ? (
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" onClick={() => navigate("/")}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/top-rated")}>
                Top Rated
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/recommended")}>
                Recommended
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/profile")}>
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/watchlist")}>
                Watchlist
              </a>
            </li>
          </ul>
        </div>
      ) : null}
      <div className="col logout">
        <a className="nav-link" onClick={() => dispatch({ type: "logout" })}>
          <i className="fa fa-sign-out"></i>{" "}
          <span className="d-none d-md-inline">Log Out</span>
        </a>
      </div>
    </nav>
  );
}

export default Header;
