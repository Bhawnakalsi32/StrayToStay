import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  const fetchSinglePost = () => {
    ApiServices.singlePost({ _id: id })
      .then((res) => {
        if (res.data.success) {
          setTitle(res.data.data.title);
          setLocation(res.data.data.location);
          setDescription(res.data.data.description);
          setDob(res.data.data.dob);
          setPreviousImage(res.data.data.image);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("_id", id);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("dob", dob);
    if (image) {
      formData.append("image", image);
    }
    ApiServices.updatePost(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          nav("/viewpost");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Update Post</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            {previousImage && (
              <img
                src={previousImage}
                alt="Previous"
                className="img-fluid mb-4"
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                }}
              />
            )}

            <div
              className="p-4 text-start"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <form onSubmit={handleForm}>
                {/* Title */}
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Title</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title"
                      required
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Image</label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      value={imageName}
                      onChange={changeImg}
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Location</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Age / DOB */}
                <div className="mb-4 row align-items-center">
                  <label className="col-sm-3 col-form-label fw-semibold">Age</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="Enter age"
                      required
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
                  >
                    Update Post
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
