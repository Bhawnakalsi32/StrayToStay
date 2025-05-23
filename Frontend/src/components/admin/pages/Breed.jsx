import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";

export default function AddBreed() {
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [petTypeId, setPetTypeId] = useState("");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false); // loader state

  const nav = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    ApiServices.allPetType({})
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPets(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("petTypeId", petTypeId);

    ApiServices.addBreed(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setName("");
          setImage({});
          setImageName("");
          setPetTypeId("");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
              border-top: 8px solid #ffa500;
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

      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Add Breed</h3>
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
        <div className="row justify-content-center">
          <div
            className="col-md-6 col-lg-5 mt-5 p-4 shadow-sm rounded"
            style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          >
            <h4 className="mb-4 text-center text-uppercase" style={{ color: "#ff8c00" }}>
              Add New Breed
            </h4>

            <form method="post" onSubmit={handleForm}>
              {/* Pet Type Dropdown */}
              <div className="mb-3">
                <label htmlFor="petType" className="form-label fw-bold">
                  Select Pet Type
                </label>
                <select
                  className="form-select"
                  value={petTypeId}
                  onChange={(e) => setPetTypeId(e.target.value)}
                  disabled={loading}
                >
                  <option value={""} disabled>
                    Choose one
                  </option>
                  {pets?.map((p, i) => (
                    <option key={p._id} value={p._id}>
                      {p.petType}
                    </option>
                  ))}
                </select>
              </div>

              {/* Breed Name */}
              <div className="mb-3">
                <label className="form-label fw-bold">Breed Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter breed name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Image Input */}
              <div className="mb-4">
                <label className="form-label fw-bold">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  value={imageName}
                  onChange={changeImg}
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(45deg, orange 70%, gold 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  padding: "10px 0",
                  borderRadius: "8px",
                  transition: "0.3s",
                }}
                disabled={loading}
              >
                Add Breed
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
