import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../services/ApiServices";

export default function App() {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 3;

  useEffect(() => {
    fetchPet();
  }, [filter]);

  const fetchPet = () => {
    let formData = {};

    const userId = sessionStorage.getItem("userId");

    if (userId) {
      formData.addedById = userId;
    } else if (!!filter) {
      formData.status = filter;
    }

    ApiServices.allPost(formData)
      .then((res) => {
        if (res.data.success) {
          setPets(res.data.data);
          setCurrentPage(1);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const totalPages = Math.ceil(pets.length / petsPerPage);
  const startIndex = (currentPage - 1) * petsPerPage;
  const currentPets = pets.slice(startIndex, startIndex + petsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const gradientBtnStyle = {
    background: "linear-gradient(45deg, #ff8c42, #ffb347)",
    color: "white",
    border: "none",
  };

  const gradientBtnEditStyle = {
    background: "linear-gradient(45deg, #ffb347, #ff8c42)",
    color: "white",
    border: "none",
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>View-Post</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {currentPets.map((pet) => (
            <div className="col-md-4 mb-4" key={pet._id}>
              <div
                className="card h-100 border"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  borderColor: "#ddd",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={pet?.image}
                  alt={pet.title}
                  className="card-img-top"
                  style={{ height: "240px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#ff8c42",
                    }}
                  >
                    {pet?.title}
                  </h5>

                  <div className="mb-2">
                    <strong>Location:</strong>{" "}
                    <span className="text-muted">{pet?.location}</span>
                  </div>
                  <div className="mb-2">
                    <strong>Age:</strong>{" "}
                    <span className="text-muted">{pet?.dob}</span>
                  </div>
                  <div className="mb-3">
                    <strong>Information:</strong>
                    <p className="card-text mb-0">{pet?.description}</p>
                  </div>

                  <Link
                    to={"/petdetails/" + pet?._id}
                    className="btn mt-auto w-100"
                    style={gradientBtnStyle}
                  >
                    View Details
                  </Link>
                  <Link
                    to={"/editpost/" + pet?._id}
                    className="btn mt-2 w-100"
                    style={gradientBtnEditStyle}
                  >
                    Edit Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      padding: "0",
                      backgroundColor: "transparent",
                      color: "orange",
                      border: "1px solid orange",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => {
                  const isActive = currentPage === i + 1;
                  return (
                    <li
                      key={i}
                      className={`page-item ${isActive ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          padding: "0",
                          backgroundColor: isActive ? "#ff8c42" : "#f0f0f0",
                          color: isActive ? "white" : "orange",
                          border: isActive ? "none" : "1px solid orange",
                          cursor: "pointer",
                        }}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                })}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      padding: "0",
                      backgroundColor: "transparent",
                      color: "orange",
                      border: "1px solid orange",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
    
  );
}
