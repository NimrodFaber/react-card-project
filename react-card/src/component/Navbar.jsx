import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth-context";

function Navbar() {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light "
        style={{ backgroundColor: "#66ff4f" }}
      >
        <div className="container-fluid ">
          <Link className="navbar-brand " to={"/"}>
            <span className="fs-4 fw-bold">
              Cards
              <i className="bi bi-boxes mx-1"></i>
              For Us
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            // onClick={() => handleToggle()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="about">
                  About
                </NavLink>
              </li>
              {user?.biz && (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"my-cards"}>
                    Mycards
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-sm-0">
              {user ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"signout"}>
                    Sign Out<i className="bi bi-door-open-fill"></i>
                  </NavLink>
                </li>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to={"signin"}
                    >
                      <div className="d-block d-md-none">SignIn</div>
                      <div className="d-none d-md-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"signup"}>
                      <div className="d-block d-md-none">SignUp</div>
                      <div className="d-none d-md-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-person-plus-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path
                            fill-rule="evenodd"
                            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                          />
                        </svg>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"signupbiz"}>
                      <div className="d-block d-md-none">SignUpbiz</div>
                      <div className="d-none d-md-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-bag-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                        </svg>
                      </div>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
