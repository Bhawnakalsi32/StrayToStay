import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
export default function AdminViewPetTypes() {
  const [petTypes, setPetTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const petTypesPerPage = 3;
  const [totalPetTypes, setTotalPetTypes] = useState(0);

  useEffect(() => {
    fetchPetTypes();
  }, [currentPage]);

  const fetchPetTypes = () => {
    const formData = {
      currentPage,
      limit: petTypesPerPage,
    };

    ApiServices.allPetTypes(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPetTypes(res.data.data);
          setTotalPetTypes(res.data.total);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const totalPages = Math.ceil(totalPetTypes / petTypesPerPage);

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
                <h3>View Pet Types</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {petTypes.map((type, index) => (
            <div className="col-md-4 mb-4" key={type._id}>
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
                  src={type?.image}
                  alt={type?.petType}
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
                    {type?.petType}
                  </h5>

                  <p className="card-text mb-2">
                    <strong>Status:</strong> {type?.status ? "Active" : "Inactive"}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> <br />
                    {type?.description}
                  </p>

                 
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

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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
