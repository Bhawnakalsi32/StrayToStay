import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../../services/ApiServices";
export default function NgoViewDonations() {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 3;
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    fetchDonations(currentPage);
  }, [currentPage]);

  const fetchDonations = (page) => {
    // Prepare request body for pagination
    const formData = {
      limit: donationsPerPage,
      currentPage: page,
    };

    ApiServices.allDonations(formData) // You need to implement this service method for calling your backend /donations/all API
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setDonations(res.data.data);
          setTotalDonations(res.data.total);
        } else {
          toast.error(res.data.message);
          setDonations([]);
          setTotalDonations(0);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const totalPages = Math.ceil(totalDonations / donationsPerPage);

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
                <h3>View Donations</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {donations.length === 0 && (
            <p className="text-center w-100">No donations found.</p>
          )}
          {donations.map((donation) => (
            <div className="col-md-4 mb-4" key={donation._id}>
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
                    Donation to:{" "}
                    {donation.ngoId?.ngoName || "N/A"}
                  </h5>

                  <p className="card-text mb-1">
                    <strong>Donation by:</strong>{" "}
                    {donation.addedById
                      ? `${donation.addedById.name} (${donation.addedById.email})`
                      : "N/A"}
                  </p>

                  <p className="card-text mb-1">
                    <strong>Amount:</strong> ₹{donation.donationAmount}
                  </p>

                  <p className="card-text">
                    <strong>Details:</strong>
                    <br />
                    {donation.donationDetails || "No details provided"}
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
