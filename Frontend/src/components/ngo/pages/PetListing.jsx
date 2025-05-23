import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiServices from "../../../services/ApiServices";

const NgoPetTable = () => {
  const nav = useNavigate();
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 3;

  useEffect(() => {
    fetchPet();
  }, [filter]);

  const fetchPet = () => {
    const ngoId = sessionStorage.getItem("userId"); 
  const formData = {
    addedById: ngoId, 
  };
    ApiServices.allPetListing(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          let allPets = res.data.data;

          let filteredPets = allPets;
          if (filter === "Available") {
            filteredPets = allPets.filter((pet) => pet.status === true);
          } else if (filter === "Adopted") {
            filteredPets = allPets.filter((pet) => pet.status === false);
          }

          setPets(filteredPets);
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
                <h3>Pets For Adoption</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <style>
          {`
            .add-btn {
              background: linear-gradient(135deg, #ff6600, #ffcc00);
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              font-weight: 600;
              font-size: 16px;
              transition: background-color 0.3s ease, transform 0.3s ease;
              box-shadow: 0 4px 10px rgba(255, 153, 0, 0.6);
            }

            .add-btn:hover {
              cursor: pointer;
              opacity: 0.9;
              transform: scale(1.05);
            }

            .card {
              border: none;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              border-radius: 12px;
              overflow: hidden;
            }

            .card:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 24px rgba(0,0,0,0.2);
            }

            .status-badge {
              display: inline-flex;
              align-items: center;
              justify-content: flex-start;
              font-size: 14px;
              border-radius: 5px;
              padding: 6px 12px;
              font-weight: 600;
              width: auto;
            }

            .btn-orange {
              background: linear-gradient(135deg, #ff6600, #ff9900);
              border: none;
              color: #fff !important;
              font-weight: 600;
              transition: 0.3s;
              border-radius: 6px;
              padding: 10px 16px;
              font-size: 16px;
              height: 45px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
            }

            .btn-orange:hover {
              opacity: 0.9;
              transform: scale(1.02);
            }

            .card-title {
              font-size: 20px;
              font-weight: 700;
              color: #333;
              margin-bottom: 10px;
            }

            .card-text {
              color: #555;
              font-size: 15px;
              margin-bottom: 6px;
              line-height: 1.4;
            }

            /* Pagination styles */
            .pagination .page-link {
              color: #6c757d; /* default grey */
              cursor: pointer;
              transition: color 0.3s ease;
            }
            .pagination .page-item.active .page-link {
              background-color: transparent;
              border: none;
              color: #ff6600 !important; /* orange for active page */
              font-weight: 700;
              cursor: default;
            }
            .pagination .page-link:hover:not(.disabled) {
              color: #ff6600;
            }
          `}
        </style>

        {/* Right-aligned Add Button and Filter Dropdown stacked vertically */}
        <div className="d-flex flex-column align-items-end mb-4" style={{ gap: "12px" }}>
          <button className="add-btn" onClick={() => nav("/ngo/addpet")}>Add +</button>

          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
          </select>
        </div>

        <div className="row">
          {currentPets.map((pet) => (
            <div key={pet.id || pet._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={pet.image}
                  alt={pet.petName}
                  className="card-img-top"
                  style={{ height: "240px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pet.petName}</h5>
                  <p className="card-text">
                    <strong>Breed:</strong> {pet.breedId?.name}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {pet.description}
                  </p>

                  <div className="mb-3 text-start">
                    <span
                      className={`status-badge ${
                        pet.status ? "bg-success text-white" : "bg-secondary text-white"
                      }`}
                    >
                      {pet.status ? "Available" : "Adopted"}
                    </span>
                  </div>

                  <Link
                    to={"/ngo/editpetlisting/" + pet._id}
                    className="btn-orange mt-auto"
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
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>‹</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>›</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default NgoPetTable;
