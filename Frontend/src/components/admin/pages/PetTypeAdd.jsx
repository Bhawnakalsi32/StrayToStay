import { useState } from "react";
import { Link } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";

export default function AddPetType() {
  const [petType, setPetType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("petType", petType);
    formData.append("description", description);
    formData.append("image", image);

    ApiServices.addPetType(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPetType("");
          setDescription("");
          setImage({});
          setImageName("");
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
                <h3>Add Pet Types</h3>
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
          <div className="col-md-6 col-lg-5 my-5 shadow p-4 rounded" style={{ backgroundColor: "#fdfdfd" }}>
            <form method="post" onSubmit={handleForm}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Pet Type</label>
                <input
                  type="text"
                  className="form-control rounded"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  placeholder="e.g. Dog, Cat"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <input
                  type="text"
                  className="form-control rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about the pet type"
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Image</label>
                <input
                  type="file"
                  className="form-control rounded"
                  value={imageName}
                  onChange={changeImg}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 text-white"
                style={{
                  backgroundImage: "linear-gradient(to right, #ffa500, #ffd700)",
                  border: "none",
                  fontWeight: "600",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
                disabled={loading}
              >
                Add
              </button>
            </form>

            {/* Link button */}
            <Link
              to="/admindash/pettypes" // update path as needed
              className={`btn btn-outline-warning w-100 mt-3 ${loading ? "disabled" : ""}`}
              tabIndex={loading ? -1 : 0}
              aria-disabled={loading}
            >
              View Existing Pet Types
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
