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

export default function NgoPetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState({});

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  const fetchSinglePost = () => {
    let formData = { _id: id };
    ApiServices.singlePost(formData)
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

  const user = pet.addedById || {};

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
                alt={pet?.title}
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
                
                {/* Title */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaPaw className="me-2 text-primary" /> Title
                  </h5>
                  <p className="text-muted">{pet?.title || "N/A"}</p>
                </div>

                {/* Location */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaMapMarkerAlt className="me-2 text-success" /> Location
                  </h5>
                  <p className="text-muted">{pet?.location || "N/A"}</p>
                </div>

                {/* Age */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaCalendarAlt className="me-2 text-warning" /> Age
                  </h5>
                  <p className="text-muted">{pet?.dob || "N/A"}</p>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaInfoCircle className="me-2 text-info" /> Information
                  </h5>
                  <p className="text-muted">
                    {pet?.description || "No description available."}
                  </p>
                </div>

                {/* Posted By */}
                <div className="mb-3">
                  <h5 className="fw-bold text-dark">
                    <FaUser className="me-2 text-secondary" /> Posted By
                  </h5>
                  <p className="text-muted mb-1">
                    <strong>Name:</strong> {user.name || "N/A"}
                  </p>
                  <p className="text-muted mb-0">
                    <FaEnvelope className="me-2 text-secondary" />
                    <strong>Email:</strong> {user.email || "N/A"}
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
