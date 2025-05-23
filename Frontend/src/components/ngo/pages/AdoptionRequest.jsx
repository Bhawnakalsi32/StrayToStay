import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";

const NgoAdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const requestsPerPage = 3;

  useEffect(() => {
    fetchAdoptionRequests();
  }, [currentPage]);

  const fetchAdoptionRequests = () => {
    const ngoId = sessionStorage.getItem("userId");
    const formData = {
      limit: requestsPerPage,
      currentPage: currentPage,
      ngoId: ngoId,
    };

    ApiServices.allAdoptionRequest(formData)
      .then((res) => {
        if (res.data.success) {
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
        setHasNextPage(false);
      });
  };

  const changeStatus = (adoptionId, status, petId) => {
    const formData = {
      _id: adoptionId,
      status: status,
    };

    ApiServices.changeStatus(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);

          // If adoption is approved, update pet status
          if (status === 2 && petId) {
            ApiServices.updatePetStatus({ _id: petId })
              .then((res2) => {
                if (res2.data.success) {
                  toast.success("Pet status updated successfully.");
                } else {
                  toast.error("Failed to update pet status.");
                }
              })
              .catch((err) => {
                toast.error("Error while updating pet status.");
                console.error(err);
              });
          }

          fetchAdoptionRequests(); // Refresh list
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Failed to update adoption request status.");
        console.error(err);
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

      <div className="container mt-5">
        <div className="row">
          {adoptionRequests.map((req) => (
            <div key={req._id} className="col-md-4 mb-4 d-flex">
              <div className="card shadow-lg border-0 rounded-lg h-100 w-100 d-flex flex-column">
                {/* Pet Image */}
                {req.petId?.image && (
                  <img
                    src={req.petId.image}
                    className="card-img-top"
                    alt={req.petId.petName || "Pet"}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }}
                  />
                )}

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title text-dark fw-bold">
                    Pet: {req.petId?.petName || "N/A"}
                  </h5>

                  <p className="card-text text-muted mb-1">
                    <strong>Applicant:</strong> {req.addedById?.name || "N/A"}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Date:</strong>{" "}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-auto">
                    {req.status === 2 ? (
                      <div className="text-success fw-bold">Approved</div>
                    ) : req.status === 3 ? (
                      <div className="text-danger fw-bold">Declined</div>
                    ) : (
                      <>
                        <Link
                          to={`/ngo/viewadoptiondetails/${req._id}`}
                          className="btn btn-outline-info btn-sm mb-2"
                        >
                          View Details
                        </Link>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              changeStatus(req._id, 2, req.petId?._id)
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => changeStatus(req._id, 3)}
                          >
                            Decline
                          </button>
                        </div>
                      </>
                    )}
                  </div>
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
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary mx-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ‹ Prev
          </button>
          <span className="mt-2">{`Page ${currentPage}`}</span>
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

export default NgoAdoptionRequests;