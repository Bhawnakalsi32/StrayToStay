import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";

export default function AdminViewPost() {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 3;

  useEffect(() => {
    fetchPet();
  }, [filter]);

  const fetchPet = () => {
    let formData = {};
    if (!!filter) {
      formData.status = filter;
    }

    ApiServices.allPost(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
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
          {currentPets.map((pet, index) => (
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
                  alt={pet.name}
                  className="card-img-top"
                  style={{ height: "240px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title mb-3"
                    style={{
                      background: "linear-gradient(45deg, orange 70%, gold 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "bold",
                    }}
                  >
                    {pet?.title}
                  </h5>

                  <p className="card-text mb-1">
                    <strong>Location:</strong> {pet?.location}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Age:</strong> {pet?.dob}
                  </p>
                  <p className="card-text">
                    <strong>Information:</strong>
                    <br />
                    {pet?.description}
                  </p>

                  <Link
                    to={`/admindash/petdetails/${pet?._id}`}
                    className="btn mt-auto w-100"
                    style={{
                      background: "linear-gradient(45deg, orange 70%, gold 100%)",
                      border: "none",
                      color: "#fff",
                      fontWeight: "bold",
                      transition: "0.3s ease-in-out",
                    }}
                  >
                    View Details
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
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      padding: "0",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    ‹
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        padding: "0",
                        background:
                          currentPage === i + 1
                            ? "linear-gradient(45deg, orange 70%, gold 100%)"
                            : "",
                        color: currentPage === i + 1 ? "#fff" : "",
                        fontWeight: currentPage === i + 1 ? "bold" : "",
                        border: "none",
                      }}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

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
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage + 1)}
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
