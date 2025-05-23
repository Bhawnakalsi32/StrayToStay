import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const { id } = useParams(); // `id` is userId
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleProfile();
  }, [id]);

  const fetchSingleProfile = () => {
    ApiServices.singleProfile({ userId: id })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setContact(data.contact || "");
          if (data.userId) {
            setName(data.userId.name || "");
            setEmail(data.userId.email || "");
          } else {
            setName("");
            setEmail("");
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const formData = {
      userId: id,
      name,
      email,
      contact,
    };

    ApiServices.updateProfile(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/home");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  // CSS styles inside component for scoped style and animation
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
  };

  return (
    <>
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
                <h3>Update Profile</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto my-5">
            <form style={styles.card} onSubmit={handleForm}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <button type="submit" style={styles.button}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
