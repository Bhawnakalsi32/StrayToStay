import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaPaw,
  FaInfoCircle,
} from "react-icons/fa";

export default function AdminViewPetListingDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState({});

  useEffect(() => {
    fetchSinglePet();
  }, [id]);

  const fetchSinglePet = () => {
    const formData = { _id: id };
    ApiServices.singlePetListing(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPet(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const user = pet?.userId || {};

  return (
    <>
      {/* Top Banner */}
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Pet Details</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">

            {/* Image Section */}
            <div className="text-center mb-4">
              <img
                src={pet?.image}
                alt={pet?.petName}
                className="img-fluid rounded shadow"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>

            {/* Details Card */}
            <div className="card shadow-lg rounded border-0">
              <div className="card-body p-4" style={{ backgroundColor: "#f9fafb" }}>
                
                {/* Pet Name */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaPaw className="me-2 text-primary" /> Pet Name
                  </h5>
                  <p className="text-muted">{pet?.petName || "N/A"}</p>
                </div>

                {/* Breed */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaPaw className="me-2 text-success" /> Breed
                  </h5>
                  <p className="text-muted">{pet?.breedId?.name || "N/A"}</p>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaInfoCircle className="me-2 text-info" /> Description
                  </h5>
                  <p className="text-muted">
                    {pet?.description || "No description available."}
                  </p>
                </div>

                {/* Status */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaCalendarAlt className="me-2 text-warning" /> Status
                  </h5>
                  <p className="text-muted">
                    {pet?.status ? "Available" : "Adopted"}
                  </p>
                </div>

                
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
