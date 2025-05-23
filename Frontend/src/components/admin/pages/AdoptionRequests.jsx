import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../../services/ApiServices";

const AdminAdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const requestsPerPage = 3;

  useEffect(() => {
    fetchAdoptionRequests();
  }, [currentPage]);

  const fetchAdoptionRequests = () => {
    const formData = {
      limit: requestsPerPage,
      currentPage: currentPage,
    };

    ApiServices.allAdoptionRequest(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setAdoptionRequests(res.data.data);
          setHasNextPage(res.data.data.length === requestsPerPage);
        } else {
          toast.error(res.data.message);
          setAdoptionRequests([]);
          setHasNextPage(false);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch adoption requests.");
        console.error(err);
        setAdoptionRequests([]);
        setHasNextPage(false);
      });
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Adoption Requests</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mt-5 py-5"
        style={{ backgroundColor: "#f5f7fa", borderRadius: "12px" }}
      >
        <div className="row g-4">
          {adoptionRequests.map((req) => (
            <div key={req._id} className="col-md-6 col-lg-4">
              <div
                className="card border-0 h-100 d-flex flex-column"
                style={{
                  minHeight: "420px",
                  borderRadius: "15px",
                  background: "white",
                  boxShadow:
                    "0 8px 20px rgba(0, 0, 0, 0.15), 0 12px 40px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default",
                  border: "1px solid #e0e4e8",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0, 0, 0, 0.2), 0 18px 48px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.15), 0 12px 40px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Pet Image */}
                {req.petId?.image && (
                  <img
                    src={req.petId.image}
                    alt={req.petId.petName || "Pet"}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column justify-content-center text-center p-4 flex-grow-1">
                  <h5
                    className="card-title fw-bold mb-4"
                    style={{
                      background: "linear-gradient(45deg, #f59e0b, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1.5rem",
                    }}
                  >
                    {req.petId?.petName || "Unnamed Pet"}
                  </h5>

                  <p className="text-secondary mb-3" style={{ fontSize: "1rem" }}>
                    <strong>Applicant:</strong>{" "}
                    <span className="text-dark">{req.addedById?.name || "N/A"}</span>
                  </p>

                  <p className="text-secondary mb-0" style={{ fontSize: "1rem" }}>
                    <strong>Requested On:</strong>{" "}
                    <span className="text-dark">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="p-3 text-center">
                  {req.status === 2 ? (
                    <div className="text-success fw-bold">Approved</div>
                  ) : req.status === 3 ? (
                    <div className="text-danger fw-bold">Declined</div>
                  ) : req.status === 1 ? (
                    <div className="text-warning fw-bold">Pending</div>
                  ) : (
                    <div className="text-muted fw-bold">Unknown</div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {adoptionRequests.length === 0 && (
            <div className="col-12 text-center text-muted">
              No adoption requests found.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn btn-outline-secondary mx-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ‹ Prev
          </button>
          <span className="mt-2 fw-bold">{`Page ${currentPage}`}</span>
          <button
            className="btn btn-outline-secondary mx-2"
            disabled={!hasNextPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next ›
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAdoptionRequests;