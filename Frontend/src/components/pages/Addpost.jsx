import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function Addpost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false); // loader state

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    let formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("dob", dob);
    formData.append("image", image);

    ApiServices.addPost(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setTitle("");
          setLocation("");
          setDescription("");
          setImage({});
          setImageName("");
          setDob("");
          // optionally navigate somewhere, e.g. nav("/posts")
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false); // stop loader
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

      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Add Post</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container my-5"
        style={{
          pointerEvents: loading ? "none" : "auto",
          opacity: loading ? 0.5 : 1,
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="p-4"
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            >
              <form onSubmit={handleForm}>
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Image</label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      value={imageName}
                      onChange={changeImg}
                      accept="image/*"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Location</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Description</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mb-4 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Age</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn px-4 py-2 fw-semibold"
                    style={{
                      background: "linear-gradient(to right, #f6b93b, #e58e26)",
                      color: "#fff",
                      border: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background = "linear-gradient(to right, #f39c12, #d35400)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background = "linear-gradient(to right, #f6b93b, #e58e26)")
                    }
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
