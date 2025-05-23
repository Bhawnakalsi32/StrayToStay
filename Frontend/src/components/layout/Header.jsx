import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("isLogin") === "true"; // Convert to boolean
  const userId = sessionStorage.getItem("userId");

  const logout = () => {
    Swal.fire({
      title: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout !!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        navigate("/");
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const postLabel =
    path === "/addpost"
      ? "Add Post"
      : path === "/viewpost"
      ? "View Post"
      : "Post ▾";

  return (
    <header
      className="header-area"
      style={{ background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
    >
      <div className="main-header-area">
        <div className="container">
          <div className="row align-items-center py-3">
            <div className="col-3">{/* Logo can be added here */}</div>
            <div className="col-9">
              <nav>
                <ul
                  id="navigation"
                  style={{
                    display: "flex",
                    gap: "30px",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <li>
                    <Link
                      to="/home"
                      style={{
                        color: path === "/home" ? "#f59e0b" : "#333",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/petlisting"
                      style={{
                        color: path === "/petlisting" ? "#f59e0b" : "#333",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Pet Listing
                    </Link>
                  </li>

                  <li style={{ position: "relative" }}>
                    <span
                      style={{
                        color:
                          path === "/addpost" || path === "/viewpost"
                            ? "#f59e0b"
                            : "#333",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.nextSibling.style.display = "block";
                      }}
                      onMouseLeave={(e) => {
                        setTimeout(() => {
                          e.currentTarget.nextSibling.style.display = "none";
                        }, 300);
                      }}
                    >
                      {postLabel}
                    </span>
                    <ul
                      className="submenu"
                      style={{
                        position: "absolute",
                        top: "30px",
                        left: 0,
                        background: "#fff",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        padding: "10px 0",
                        borderRadius: "4px",
                        display: "none",
                        minWidth: "160px",
                        zIndex: 1000,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.display = "block")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.display = "none")
                      }
                    >
                      <li style={{ padding: "8px 20px" }}>
                        <Link
                          to="/addpost"
                          style={{
                            color: path === "/addpost" ? "#f59e0b" : "#333",
                            textDecoration: "none",
                            fontWeight: "500",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#f59e0b")
                          }
                          onMouseLeave={(e) => {
                            if (path !== "/addpost")
                              e.target.style.color = "#333";
                          }}
                        >
                          Add Post
                        </Link>
                      </li>
                      <li style={{ padding: "8px 20px" }}>
                        <Link
                          to="/viewpost"
                          style={{
                            color: path === "/viewpost" ? "#f59e0b" : "#333",
                            textDecoration: "none",
                            fontWeight: "500",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#f59e0b")
                          }
                          onMouseLeave={(e) => {
                            if (path !== "/viewpost")
                              e.target.style.color = "#333";
                          }}
                        >
                          View Post
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link
                      to="/list"
                      style={{
                        color: path === "/list" ? "#f59e0b" : "#333",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Donation
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/adoptpet"
                      style={{
                        color: path === "/adoptpet" ? "#f59e0b" : "#333",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Adoption
                    </Link>
                  </li>

                  <li style={{ position: "relative" }}>
                    {isLogin ? (
                      <div
                        style={{ cursor: "pointer", position: "relative" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.children[1].style.display = "block")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.children[1].style.display = "none")
                        }
                      >
                        <i
                          className="bi bi-person-circle"
                          style={{
                            fontSize: "1.5rem",
                            color: "#2563eb",
                          }}
                        ></i>
                        <ul
                          style={{
                            position: "absolute",
                            top: "35px",
                            right: 0,
                            background: "#fff",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            padding: "10px 0",
                            borderRadius: "6px",
                            display: "none",
                            minWidth: "160px",
                            zIndex: 1000,
                            listStyle: "none",
                          }}
                        >
                          <li style={{ padding: "8px 20px" }}>
                            <Link
                              to={`/updateprofile/${userId}`}
                              style={{
                                color: "#2563eb",
                                textDecoration: "none",
                                fontWeight: "500",
                              }}
                            >
                              Profile
                            </Link>
                          </li>
                            <li style={{ padding: "8px 20px" }}>
                            <Link
                              to={`/changepassword/${userId}`}
                              style={{
                                color: "#198754",
                                textDecoration: "none",
                                fontWeight: "500",
                              }}
                            >
                               Password 
                            </Link>
                          </li>
                          <li
                            style={{ padding: "8px 20px", cursor: "pointer" }}
                          >
                            <span
                              onClick={logout}
                              style={{
                                color: "#e11d48",
                                fontWeight: "500",
                              }}
                            >
                              Logout
                            </span>
                          </li>
                        
                          
                        </ul>
                      </div>
                    ) : (
                      <Link
                        to="/"
                        style={{
                          color: path === "/" ? "#f59e0b" : "#333",
                          textDecoration: "none",
                          fontWeight: "600",
                        }}
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
