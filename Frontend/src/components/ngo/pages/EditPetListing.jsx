import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";

export default function EditPetListing() {
  const { id } = useParams();
  const [petName, setPetName] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [description, setDescription] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    fetchSinglePet();
  }, [id]);

  const fetchSinglePet = () => {
    ApiServices.singlePetListing({ _id: id })
      .then((res) => {
        if (res.data.success) {
          const pet = res.data.data;
          setPetName(pet.petName);
          setDescription(pet.description);
          setPreviousImage(pet.image);
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

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("petName", petName);
    formData.append("description", description);
    formData.append("image", image);

    ApiServices.updatePetListing(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          nav("/ngo/petlisting");
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
                                <h3>Edit Pet Details</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow rounded-4 p-4">
              <h4 className="text-center mb-4">Update Pet Information</h4>

              {previousImage && (
                <img
                  src={previousImage}
                  className="img-fluid rounded-3 mb-3 mx-auto d-block"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                  alt="Previous Pet"
                />
              )}

              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label className="form-label">Pet Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter pet name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    value={imageName}
                    onChange={changeImg}
                    accept="image/*"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-100 text-white fw-bold"
                  style={{
                    background: "linear-gradient(to right, #ffa500, #ffd700)",
                    border: "none",
                  }}
                >
                  Edit Pet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
