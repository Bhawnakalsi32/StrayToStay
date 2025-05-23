import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";

export default function ViewPetAdoption() {
  const { id } = useParams();
  const [adoption, setAdoption] = useState(null);

  const [visibleDocs, setVisibleDocs] = useState({
    idProof: false,
    incomeCertificate: false,
    bankStatement: false,
    addressProof: false,
  });

  useEffect(() => {
    fetchAdoptionRequest();
  }, [id]);

  const fetchAdoptionRequest = () => {
    ApiServices.singleAdoptionRequest({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setAdoption(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Error fetching adoption request.");
        console.error(err);
      });
  };

  const handleViewClick = (field) => {
    setVisibleDocs((prev) => ({ ...prev, [field]: true }));
  };

  const renderDocumentCard = (label, url, fieldKey) => {
    if (!url || url === "no-pic.jpg") return null;

    const fileUrl = url.startsWith("http") ? url : `/uploads/${url}`;
    const isPDF = fileUrl.match(/\.pdf$/i);
    const isImage = fileUrl.match(/\.(jpeg|jpg|png|gif)$/i);

    return (
      <div className="col-md-6 mb-4" key={fieldKey}>
        <div className="border rounded p-3 shadow-sm bg-white h-100">
          <h6 className="text-primary fw-bold mb-3">{label}</h6>

          {!visibleDocs[fieldKey] ? (
            <button
              onClick={() => handleViewClick(fieldKey)}
              className="btn btn-warning text-white"
              style={{
                backgroundImage: "linear-gradient(to right, orange, gold)",
                border: "none",
              }}
            >
              View
            </button>
          ) : (
            <>
              {isImage ? (
                <div className="mt-3 text-center">
                  <img
                    src={fileUrl}
                    alt={label}
                    className="img-fluid border rounded"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
              ) : isPDF ? (
                <div className="mt-2">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-info"
                  >
                    View PDF Document
                  </a>
                </div>
              ) : (
                <p className="text-muted">Unsupported file format</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Adoption Request Details</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-5 mb-5">
        {adoption ? (
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div
                className="border rounded p-4 mb-4 shadow-sm"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <h4 className="text-center text-dark mb-4">Applicant Information</h4>

                <div className="mb-3">
                  <h6 className="text-primary fw-bold">Applicant Name</h6>
                  <p className="text-dark">{adoption.addedById?.name || "N/A"}</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-primary fw-bold">Email</h6>
                  <p className="text-dark">{adoption.addedById?.email || "N/A"}</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-primary fw-bold">Pet Name</h6>
                  <p className="text-dark">{adoption.petId?.petName || "N/A"}</p>
                </div>
              </div>

              <div
                className="border rounded p-4 shadow-sm"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h4 className="text-center text-dark mb-4">Uploaded Documents</h4>
                <div className="row">
                  {renderDocumentCard("ID Proof", adoption.idProof, "idProof")}
                  {renderDocumentCard("Income Certificate", adoption.incomeCertificate, "incomeCertificate")}
                  {renderDocumentCard("Bank Statement", adoption.bankStatement, "bankStatement")}
                  {renderDocumentCard("Address Proof", adoption.addressProof, "addressProof")}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted">Loading adoption details...</p>
        )}

        <div className="d-flex justify-content-center mt-4">
          <Link to={"/ngo/adoptionrequests"} className="btn btn-outline-warning btn-lg px-5">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}
