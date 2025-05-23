import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";

export default function ViewPetType() {
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

    ApiServices.allPetType(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPets(res.data.data);
          setCurrentPage(1); // Reset to first page on new fetch
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
                <h3>View Pet Type</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {currentPets.map((pet, index) => (
            <div className="col-md-4 mb-4" key={pet.id}>
              <div
                className="card h-100 shadow-sm"
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={pet?.image}
                  alt={pet.name}
                  className="card-img-top"
                  style={{
                    height: "240px",
                    objectFit: "cover",
                    borderBottom: "1px solid #eee",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center text-primary fw-bold">
                    {pet?.petType}
                  </h5>
                  <h6
                    className="card-subtitle mb-3 text-muted text-center"
                    style={{ fontWeight: "500" }}
                  >
                    <span style={{ fontWeight: "600", color: "#000" }}>Description:</span>{" "}
                    {pet?.description}
                  </h6>

                  {/* 
                  <Link to={"/petdetails/"+pet?._id} className="btn btn-warning mt-auto w-100">
                    View Details
                  </Link>
                  <Link to={"/editpost/"+pet?._id} className="btn btn-warning w-100 mt-2">
                    Edit Details
                  </Link> 
                  */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
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
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
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
