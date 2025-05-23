import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("isLogin") === "true";
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

  return (
    <header
      className="header-area"
      style={{
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "10px 0",
      }}
    >
      <div className="container">
        <nav style={{ width: "100%" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "30px",
              margin: 0,
              padding: 0,
              listStyle: "none",
              fontWeight: "600",
              fontFamily: "sans-serif",
            }}
          >
            <li>
              <Link
                to="/ngo/home"
                style={{
                  color: path === "/ngo/home" ? "#f59e0b" : "#333",
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/ngo/petlisting"
                style={{
                  color: path === "/ngo/petlisting" ? "#f59e0b" : "#333",
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                Pet Listing
              </Link>
            </li>
            <li>
              <Link
                to="/ngo/viewpost"
                style={{
                  color: path === "/ngo/viewpost" ? "#f59e0b" : "#333",
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                View Post
              </Link>
            </li>
            <li>
              <Link
                to="/ngo/donation"
                style={{
                  color: path === "/ngo/donation" ? "#f59e0b" : "#333",
                  textDecoration: "none",
                  fontWeight: "600"
                }}
              >
                Donation
              </Link>
            </li>
            <li>
              <Link
                to="/ngo/adoptionrequests"
                style={{
                  color: path === "/ngo/adoptionrequests" ? "#f59e0b" : "#333",
                  textDecoration: "none",
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
                      fontSize: "1.6rem",
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
                        to={`/ngo/updateprofile/${userId}`}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                         fontWeight: "600",
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                     <li style={{ padding: "8px 20px" }}>
                      <Link
                        to={`/ngo/changepassword/${userId}`}
                        style={{
                          color: "#198754",
                          textDecoration: "none",
                         fontWeight: "600",
                        }}
                      >
                        Password
                      </Link>
                    </li>
                    <li style={{ padding: "8px 20px", cursor: "pointer" }}>
                      <span
                        onClick={logout}
                        style={{
                          color: "#e11d48",
                          fontWeight: "600",
                        }}
                      >
                        Logout
                      </span>
                    </li>
                    
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    color: path === "/login" ? "#f59e0b" : "#333",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
