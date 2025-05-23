import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function NgoList() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ngosPerPage = 3;

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = () => {
    setLoading(true);
    ApiServices.allNgo({})
      .then((res) => {
        if (res.data.success) {
          setNgos(res.data.data);
        } else {
          setNgos([]);
          toast.error(res.data.message || "Failed to fetch NGOs.");
        }
      })
      .catch((err) => {
        console.error("Error fetching NGOs:", err);
        setNgos([]);
        toast.error("Error fetching NGOs.");
      })
      .finally(() => setLoading(false));
  };

  // Pagination Logic
  const indexOfLastNgo = currentPage * ngosPerPage;
  const indexOfFirstNgo = indexOfLastNgo - ngosPerPage;
  const currentNgos = ngos.slice(indexOfFirstNgo, indexOfLastNgo);
  const totalPages = Math.ceil(ngos.length / ngosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderNgoCard = (ngo) => {
    const imgUrl =
      ngo.logo && ngo.logo !== "no-pic.jpg"
        ? ngo.logo.startsWith("http")
          ? ngo.logo
          : `/uploads/${ngo.logo}`
        : "https://via.placeholder.com/300x180?text=No+Image";

    return (
      <div className="col-md-4 mb-4" key={ngo._id}>
        <div
          className="ngo-card h-100 shadow-sm rounded p-3 bg-white d-flex flex-column"
          style={{
            border: "2px solid gold",
            boxShadow:
              "0 0 10px 2px rgba(255, 215, 0, 0.4), 0 8px 15px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            minHeight: "420px",
            borderRadius: "12px",
          }}
        >
          <div className="mb-3 text-center">
            <img
              src={imgUrl}
              alt={ngo.ngoName || ngo.userId?.name || "NGO Image"}
              style={{
                maxHeight: "180px",
                objectFit: "cover",
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#f8f9fa",
                transition: "transform 0.3s",
              }}
              className="ngo-img"
            />
          </div>

          <h5 className="text-primary fw-bold text-center mb-2">
            {ngo.ngoName || ngo.userId?.name || "Unnamed NGO"}
          </h5>

          <p className="mb-1">
            <i className="bi bi-envelope-fill me-2 text-secondary" />
            <strong>Email:</strong> {ngo.userId?.email || "N/A"}
          </p>

          <p className="mb-1">
            <i className="bi bi-geo-alt-fill me-2 text-danger" />
            <strong>Address:</strong> {ngo.address || "N/A"}
          </p>

          <p
            className="text-muted mb-3"
            title={ngo.description}
            style={{
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ngo.description
              ? ngo.description.length > 100
                ? ngo.description.substring(0, 100) + "..."
                : ngo.description
              : "No description available."}
          </p>

          <div className="mt-auto text-center">
            <Link
              to={`/donation/${ngo._id}`}
              className="btn btn-warning text-white px-4 fw-semibold"
              style={{
                backgroundImage: "linear-gradient(to right, orange, gold)",
                border: "none",
                borderRadius: "30px",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
              }}
            >
              <i className="bi bi-heart-fill me-2"></i>
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              <button
                className="page-link"
                style={{
                  border: "1px solid gold",
                  background:
                    currentPage === page
                      ? "linear-gradient(to right, orange, gold)"
                      : "#fff",
                  color: currentPage === page ? "#fff" : "#000",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  margin: "0 5px",
                  minWidth: "40px",
                }}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>NGOs Available for Donation</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        {loading ? (
          <p className="text-center text-muted">Loading NGOs...</p>
        ) : ngos.length > 0 ? (
          <>
            <div className="row justify-content-center">
              {currentNgos.map(renderNgoCard)}
            </div>
            {renderPagination()}
          </>
        ) : (
          <p className="text-center text-muted">No NGOs found.</p>
        )}
      </div>

      <style>{`
        .ngo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 20px 4px rgba(255, 215, 0, 0.7), 0 12px 25px rgba(0, 0, 0, 0.15);
          border-color: #ffdd55;
        }
        .ngo-img:hover {
          transform: scale(1.05);
        }
        .btn-warning:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(255, 165, 0, 0.75);
        }
        .pagination .page-item.active .page-link {
          color: #fff !important;
        }
      `}</style>
    </>
  );
}
