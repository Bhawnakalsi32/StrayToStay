import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServices from "../../../services/ApiServices";
import { toast } from "react-toastify";

export default function NgoAddPet() {
  const [petName, setPetName] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [petType, setPetType] = useState([]);
  const [breedId, setBreedId] = useState("");
  const [petTypeId, setPetTypeId] = useState("");
  const [breed, setBreed] = useState([]);
  const [loading, setLoading] = useState(false); // loader state

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const nav = useNavigate();

  useEffect(() => {
    fetchPetType();
  }, []);

  useEffect(() => {
    if (petTypeId) {
      fetchBreedsByPetType();
    } else {
      setBreed([]);
    }
  }, [petTypeId]);

  const fetchPetType = () => {
    let formData = { status: true };
    ApiServices.allPetType(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPetType(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const fetchBreedsByPetType = () => {
    let formData = { petTypeId };
    ApiServices.allBreed(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setBreed(res.data.data);
        } else {
          setBreed([]);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    let formData = new FormData();
    formData.append("petName", petName);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("petTypeId", petTypeId);
    formData.append("breedId", breedId);

    ApiServices.addPet(formData)
      .then((res) => {
        setLoading(false); // stop loader
        if (res.data.success) {
          toast.success(res.data.message);
          setPetName("");
          setDescription("");
          setImage({});
          setImageName("");
          setPetTypeId("");
          setBreedId("");
          // Optional navigation if needed:
          // nav("/petlisting");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false); // stop loader
        toast.error(err.message);
      });
  };

  return (
    <>
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
              border-top: 8px solid #d35400; /* dark orange */
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
                <h3>Add-Pet</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <style>
          {`
            form {
              background: #fff;
              padding: 25px 20px;
              border-radius: 12px;
              box-shadow: 0 5px 15px rgba(255, 153, 0, 0.15);
              max-width: 400px;
              margin: auto;
            }
            label {
              font-weight: 600;
              color: #d35400; /* dark orange */
              margin-bottom: 6px;
              display: block;
              font-size: 15px;
            }
            input.form-control,
            select.form-select {
              width: 100%;
              padding: 8px 10px;
              font-size: 16px;
              border: 1.8px solid #e67e22; /* orange border */
              border-radius: 6px;
              color: #333;
              background-color: #fff;
              transition: border-color 0.3s ease;
            }
            input.form-control:focus,
            select.form-select:focus {
              border-color: #d35400;
              outline: none;
              box-shadow: 0 0 6px rgba(211, 84, 0, 0.5);
            }
            input[type="file"] {
              padding: 5px 10px;
            }
            button[type="submit"] {
              background: linear-gradient(90deg, #ff7f50, #ffb84d);
              border: none;
              color: white;
              font-weight: 700;
              font-size: 18px;
              padding: 10px 0;
              border-radius: 10px;
              width: 100%;
              cursor: pointer;
              transition: background 0.3s ease;
              margin-top: 10px;
            }
            button[type="submit"]:hover {
              background: linear-gradient(90deg, #ff944d, #ffd580);
            }
            button[type="submit"]:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
          `}
        </style>

        <form onSubmit={handleForm}>
          <div className="mb-3">
            <label htmlFor="petType">Select Pet Type</label>
            <select
              id="petType"
              className="form-select"
              value={petTypeId}
              onChange={(e) => setPetTypeId(e.target.value)}
              required
              disabled={loading}
            >
              <option value="" disabled>
                Choose one
              </option>
              {petType?.map((pets) => (
                <option key={pets._id} value={pets._id}>
                  {pets.petType}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="breed">Select Breed</label>
            <select
              id="breed"
              className="form-select"
              value={breedId}
              onChange={(e) => setBreedId(e.target.value)}
              disabled={!breed.length || loading}
              required
            >
              <option value="" disabled>
                Choose one
              </option>
              {breed?.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="petName">Name</label>
            <input
              id="petName"
              type="text"
              className="form-control"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter pet's name"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image">Image</label>
            <input
              id="image"
              type="file"
              className="form-control"
              value={imageName}
              onChange={changeImg}
              accept="image/*"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a brief description"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
