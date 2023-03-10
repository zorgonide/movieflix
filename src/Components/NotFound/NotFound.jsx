import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotFound404 from "../../Shared/images/404.svg";

export class NotFound extends Component {
  render() {
    return (
      <div
        className="d-flex centered container"
        style={{ textAlign: "center" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <img
                src={NotFound404}
                width="300"
                height="200"
                className="mb-3 "
                alt="login"
              />
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occurred, Requested page was not found!
              </div>
              <br></br>
              <div className="error-actions">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <button className="button button1 mb-3">
                    <i className="fa fa-home"></i> Take Me Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
