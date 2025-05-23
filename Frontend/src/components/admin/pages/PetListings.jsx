import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiServices from "../../../services/ApiServices";

const PetListings = () => {
  const nav = useNavigate();
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 3;

  useEffect(() => {
    fetchPet();
  }, [filter]);

  const fetchPet = () => {
    ApiServices.allPetListing({})
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
                <h3>Pets</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <style>
          {`
            .btn-orange {
              background: linear-gradient(135deg, #ff6600, #ff7f00);
              border: none;
              color: #fff !important;
              font-weight: 600;
              transition: 0.3s;
              border-radius: 6px;
            }

            .btn-orange:hover {
              background: linear-gradient(135deg, #e65c00, #e67300);
              color: #fff !important;
              transform: scale(1.03);
            }

            .card:hover {
              transform: scale(1.02);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
              transition: 0.3s;
            }

            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              font-size: 14px;
              font-weight: 600;
              border-radius: 20px;
              color: white;
              text-align: left;
              width: auto;
            }

            .status-available {
              background-color: #198754; /* Bootstrap success green */
            }

            .status-adopted {
              background-color: #6c757d; /* Bootstrap secondary grey */
            }

            .form-select {
              border: 2px solid #ff6600;
              font-weight: 500;
            }

            .form-select:focus {
              box-shadow: 0 0 0 0.2rem rgba(255, 102, 0, 0.25);
              border-color: #ff6600;
            }

            .pagination .page-link {
              color: #ff6600;
              font-weight: bold;
            }

            .pagination .page-item.active .page-link {
              background: linear-gradient(135deg, #ff6600, #ff7f00);
              color: white;
              border-color: #ff6600;
            }

            .pagination .page-link:hover {
              background-color: #ffb366;
              color: #ff6600;
            }
          `}
        </style>

        <div className="mb-4">
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
            <div key={pet._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={pet.image}
                  alt={pet.petName}
                  className="card-img-top"
                  style={{ height: "240px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pet.petName}</h5>
                  <p className="card-text mb-1">
                    <strong>Breed:</strong> {pet.breedId?.name}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {pet.description}
                  </p>

                  <div className="mb-2">
                    <span
                      className={`status-badge ${
                        pet.status ? "status-available" : "status-adopted"
                      }`}
                    >
                      {pet.status ? "Available" : "Adopted"}
                    </span>
                  </div>

                  <Link
                    to={`/admindash/viewpetlisting/${pet._id}`}
                    className="btn btn-orange mt-auto w-100"
                  >
                    View
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
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
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
};

export default PetListings;
