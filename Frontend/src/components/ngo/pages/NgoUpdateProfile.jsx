import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";

export default function NgoUpdateProfile() {
  const { id } = useParams(); // userId
  const [ngoName, setNgoName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState(""); // from userId.name
  const [loading, setLoading] = useState(false); // loader state

  // Logo states
  const [logoFile, setLogoFile] = useState(null);
  const [logoName, setLogoName] = useState("");
  const [previousLogo, setPreviousLogo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleProfile();
  }, [id]);

  const fetchSingleProfile = () => {
    setLoading(true);
    ApiServices.singleNgoProfile({ userId: id })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setNgoName(data.ngoName || "");
          if (data.userId) {
            setName(data.userId.name || "");
            setEmail(data.userId.email || "");
          }
          setDescription(data.description || "");
          setAddress(data.address || "");
          setPreviousLogo(data.logo || "");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleLogoChange = (e) => {
    setLogoName(e.target.value);
    setLogoFile(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("userId", id);
    formData.append("ngoName", ngoName);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("address", address);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    ApiServices.updateNgoProfile(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/ngo/home");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => setLoading(false));
  };

  const styles = {
    card: {
      animation: "fadeInScale 0.8s ease forwards",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow:
        "0 8px 20px rgba(255, 140, 0, 0.3), 0 6px 6px rgba(255, 215, 0, 0.2)",
      background: "#fff",
      border: "1px solid #f5c16c",
    },
    button: {
      background: "linear-gradient(45deg, #ff7f00, #ffd700)",
      border: "none",
      color: "#fff",
      fontWeight: "600",
      padding: "0.5rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "box-shadow 0.3s ease",
    },
    logoImg: {
      display: "block",
      maxWidth: "150px",
      maxHeight: "150px",
      objectFit: "contain",
      margin: "0 auto 1rem auto",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
  };

  return (
    <>
      {/* Loader Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loader"></div>
          <style>{`
            .loader {
              border: 8px solid #f3f3f3;
              border-top: 8px solid #d35400;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <style>
        {`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        button:hover {
          box-shadow: 0 0 12px #ffb300, 0 0 20px #ff7f00;
        }
      `}
      </style>

      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Update NGO Profile</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          pointerEvents: loading ? "none" : "auto",
          opacity: loading ? 0.5 : 1,
        }}
      >
        <div className="row">
          <div className="col-4 mx-auto my-5">
            <form style={styles.card} onSubmit={handleForm}>
              {previousLogo && (
                <img
                  src={previousLogo}
                  alt="NGO Logo"
                  style={styles.logoImg}
                />
              )}

              <div className="mb-3">
                <label className="form-label">Logo Image</label>
                <input
                  type="file"
                  className="form-control"
                  value={logoName}
                  onChange={handleLogoChange}
                  accept="image/*"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={ngoName}
                  onChange={(e) => setNgoName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
