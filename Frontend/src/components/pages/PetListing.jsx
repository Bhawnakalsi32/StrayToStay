import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiServices from "../../services/ApiServices";

const PetTable = () => {
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
          let allPets = res.data.data;
          let filteredPets = allPets;

          if (filter === "Available") {
            filteredPets = allPets.filter(
              (pet) => pet.status === true || pet.status === "true" || pet.status === 1
            );
          } else if (filter === "Adopted") {
            filteredPets = allPets.filter(
              (pet) => pet.status === false || pet.status === "false" || pet.status === 0
            );
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
                <h3 className="fw-bold text-uppercase">Available Pets</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <style>
          {`
            .gradient-btn {
              background: linear-gradient(135deg, #ff7f50, #f9d342);
              color: white;
              font-weight: 600;
              border: none;
              border-radius: 10px;
              transition: all 0.3s ease-in-out;
              padding: 10px 20px;
            }

            .gradient-btn:hover {
              background: linear-gradient(135deg, #f97e28, #ffd700);
              transform: scale(1.05);
              color: white;
            }

            .card {
              border-radius: 15px;
              overflow: hidden;
              transition: all 0.3s ease-in-out;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            }

            .card:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
            }

            .status-badge {
              font-weight: 500;
              border-radius: 50px;
              padding: 5px 15px;
              font-size: 14px;
              width: fit-content;
              margin: 5px 0;
            }

            .pagination .page-link {
              border: none;
              color: #ff7f50;
              font-weight: bold;
              background-color: #f1f1f1;
              margin: 0 5px;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
            }

            .pagination .page-link:hover {
              background-color: #ff7f50;
              color: white;
            }

            .pagination .active .page-link {
              background-color: #ff7f50;
              color: white;
            }
          `}
        </style>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Browse All Pets</h4>
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
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-primary">{pet.petName}</h5>
                  <p className="card-text mb-1">
                    <strong>Breed:</strong> {pet.breedId?.name}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Description:</strong> {pet.description}
                  </p>

                  <div className="mb-3">
                    <span
                      className={`status-badge ${
                        pet.status ? "bg-success text-white" : "bg-secondary text-white"
                      }`}
                    >
                      {pet.status ? "Available" : "Adopted"}
                    </span>
                  </div>

                  <div className="mt-auto d-grid gap-2">
                    {pet.status ? (
                      <Link to={`/verification/${pet._id}`} className="gradient-btn text-center">
                        Adopt Now
                      </Link>
                    ) : (
                      <button className="btn btn-secondary w-100" disabled>
                        Already Adopted
                      </button>
                    )}

                    <Link to={`/viewpetlisting/${pet._id}`} className="gradient-btn text-center">
                      View Details
                    </Link>
                  </div>
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

export default PetTable;
