import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";

export default function NgoViewPost() {
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
      <style>
        {`
          .pet-card {
            border-radius: 15px;
            overflow: hidden;
            border: 1.5px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .pet-card:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
            transform: translateY(-8px) scale(1.03);
          }
          .pet-card img {
            height: 240px;
            object-fit: cover;
            border-bottom: 1.5px solid #eee;
            transition: transform 0.3s ease;
          }
          .pet-card:hover img {
            transform: scale(1.05);
          }

          .pet-card-body {
            padding: 1rem 1.25rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .pet-card-title {
            font-weight: 700;
            color: #ff7f50;
            margin-bottom: 0.6rem;
            font-size: 1.35rem;
          }

          .pet-card-subtitle {
            font-size: 0.95rem;
            color: #333;
            margin-bottom: 0.4rem;
            font-weight: 600;
          }

          .pet-card-text {
            flex-grow: 1;
            font-size: 1rem;
            color: #333;
            margin-top: 0.3rem;
            line-height: 1.4;
          }

          .btn-gradient {
            background: linear-gradient(90deg, #ff7f50 0%, #ffb84d 100%);
            border: none;
            color: black !important;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 0.6rem 0;
            border-radius: 12px;
            width: 100%;
            transition: background 0.3s ease, box-shadow 0.3s ease;
            margin-top: 1rem;
            text-align: center;
            display: inline-block;
            text-decoration: none;
          }
          .btn-gradient:hover,
          .btn-gradient:focus {
            background: linear-gradient(90deg, #ff9966 0%, #ffcc66 100%);
            box-shadow: 0 6px 12px rgba(255, 140, 0, 0.5);
            color: black !important;
            text-decoration: none;
          }

          .pagination {
            list-style: none;
            padding: 0;
            display: flex;
            gap: 0.5rem;
          }
          .pagination .page-item .page-link {
            border: none;
            background: transparent;
            color: #888;
            font-weight: 600;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 4px;
            user-select: none;
            transition: color 0.3s ease;
          }
          .pagination .page-item .page-link:hover:not(.disabled) {
            color: #ff7f50;
          }
          .pagination .page-item.active .page-link {
            color: #ff7f50;
            cursor: default;
          }
          .pagination .page-item.disabled .page-link {
            cursor: not-allowed;
            color: #ccc;
          }
          .pagination .page-item:not(.disabled) .page-link[aria-label="Previous"],
          .pagination .page-item:not(.disabled) .page-link[aria-label="Next"] {
            color: #ff7f50;
          }
        `}
      </style>

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
            <div className="col-md-4 mb-4" key={pet._id || index}>
              <div className="pet-card">
                <img src={pet?.image} alt={pet.name} className="card-img-top" />
                <div className="pet-card-body">
                  <h5 className="pet-card-title">{pet?.title}</h5>

                  <p className="pet-card-subtitle">
                    <span><strong>Location:</strong> {pet?.location}</span>
                  </p>

                  <p className="pet-card-subtitle">
                    <span><strong>Age:</strong> {pet?.dob}</span>
                  </p>

                  <div className="pet-card-subtitle"><strong>Information:</strong></div>
                  <p className="pet-card-text">{pet?.description}</p>

                  <Link to={`/ngo/petdetails/${pet?._id}`} className="btn-gradient">
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
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
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
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    aria-label="Next"
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
