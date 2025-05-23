import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../services/ApiServices";

const NgoAdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const requestsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    const userId = sessionStorage.getItem("userId");

    if (!isLogin || !userId) {
      toast.error("Unauthorized access");
      navigate("/login");
      return;
    }

    fetchAdoptionRequests(userId);
  }, [currentPage]);

  const fetchAdoptionRequests = (userId) => {
    const formData = {
      limit: requestsPerPage,
      currentPage: currentPage,
      addedById: userId,
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
        setHasNextPage(false);
      });
  };

  const renderStatusBadge = (status) => {
    let badgeClass = "";
    let text = "";

    switch (status) {
      case 1:
        badgeClass = "bg-warning text-dark";
        text = "Pending";
        break;
      case 2:
        badgeClass = "bg-success text-white";
        text = "Approved";
        break;
      case 3:
        badgeClass = "bg-danger text-white";
        text = "Rejected";
        break;
      default:
        badgeClass = "bg-secondary text-white";
        text = "Unknown";
    }

    return (
      <span className={`badge ${badgeClass} px-3 py-2`}>
        {text}
      </span>
    );
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>My Adoption Requests</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {adoptionRequests.length === 0 && (
            <div className="col-12 text-center text-muted">
              No adoption requests found.
            </div>
          )}

          {adoptionRequests.map((req) => (
            <div key={req._id} className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg h-100">
                {/* Pet Image */}
                {req.petId?.image && (
                  <img
                    src={req.petId.image}
                    className="card-img-top"
                    alt={req.petId.petName || "Pet"}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body text-center">
                  <h5 className="card-title text-dark font-weight-bold">
                    Pet: {req.petId?.petName || "N/A"}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <strong>Applicant:</strong> {req.addedById?.name || "N/A"}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Date:</strong>{" "}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-3">{renderStatusBadge(req.status)}</div>
                </div>
              </div>
            </div>
          ))}
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