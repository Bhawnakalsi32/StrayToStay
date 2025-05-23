




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function AddPet() {
  const [petName, setPetName] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [petType, setPetType] = useState([]);
  const [breedId, setBreedId] = useState("");
  const [petTypeId, setPetTypeId] = useState("");
  const [pets,setPets]=useState([])
  const [breed,setBreed]=useState([])


  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const nav = useNavigate();
   useEffect(()=>{
        fetchPetType()
    },[])

    useEffect(() => {
  if (petTypeId) {
    fetchBreedsByPetType();
  } else {
    setBreed([]); // reset breed dropdown if no petType is selected
  }
}, [petTypeId]);

    const fetchPetType=()=>{
            let formData={
              status:true
            }
            ApiServices.allPetType(formData)
            .then((res)=>{
                if(res.data.success){
                    toast.success(res.data.message)
                    // console.log(res.data.data);
                    setPetType(res.data.data)
                }else{
                    toast.error(res.data.message)
                }
            })  
            .catch((err)=>{
                toast.error(err.message)
            })  
             
        }

const fetchBreedsByPetType = () => {
  let formData={
    petTypeId
            }
  ApiServices.allBreed(formData)
    .then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        setBreed(res.data.data);
      } else {
        setBreed([])
        toast.error(res.data.message);
      }
    })
    .catch((err) => {
      toast.error(err.message);
    });
};



  const handleForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("petName", petName);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("petTypeId", petTypeId);
    formData.append("breedId", breedId);

    ApiServices.addPet(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPetName("");
          setDescription("");
          setImage({});
          setImageName("");
          setPetTypeId("");
          setBreedId("");
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
                <h3>Add-Pet</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto my-5">
            <form method="post" onSubmit={handleForm}>
              {/* Dropdown for Pet Type */}
              <div className="mb-3">
                <label htmlFor="petType" className="form-label">
                  Select Pet Type
                </label>
                <select
                  className="form-select"
                  value={petTypeId}
                  onChange={(e) => setPetTypeId(e.target.value)}
                >
                  <option value={""} selected disabled>Choose one</option>
                  {
                     petType?.map((pets,index)=>(
                                            <option value={pets?._id}>{pets?.petType}</option>
                                        ))
                  }
                </select>
              </div>

              {/* Dropdown for Breed */}
              <div className="mb-3">
                <label htmlFor="breed" className="form-label">
                  Select Breed
                </label>
                <select
                  className="form-select"
                  value={breedId}
                  onChange={(e) => setBreedId(e.target.value)}
                >
                  <option value={""} selected disabled>Choose one</option>
                  {
                     breed?.map((breed,index)=>(
                                            <option value={breed?._id}>{breed?.name}</option>
                                        ))
                  }
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  value={imageName}
                  onChange={changeImg}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              

              <button type="submit" className="btn btn-warning w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}













// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ApiServices from "../../services/ApiServices";
// import { toast } from "react-toastify";

// export default function AddPet() {
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState({});
//   const [imageName, setImageName] = useState("");
//   const [description, setDescription] = useState("");
//   const [dob, setDob] = useState("");
//   const [petType, setPetType] = useState("");
//   const [breed, setBreed] = useState("");

//   const changeImg = (e) => {
//     setImageName(e.target.value);
//     setImage(e.target.files[0]);
//   };

//   const nav = useNavigate();

//   const handleForm = (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("dob", dob);
//     formData.append("image", image);
//     formData.append("petType", petType);
//     formData.append("breed", breed);

//     ApiServices.addPost(formData)
//       .then((res) => {
//         if (res.data.success) {
//           toast.success(res.data.message);
//           setTitle("");
//           setDescription("");
//           setImage({});
//           setImageName("");
//           setDob("");
//           setPetType("");
//           setBreed("");
//         } else {
//           toast.error(res.data.message);
//         }
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   return (
//     <>
//       <div className="bradcam_area breadcam_bg">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="bradcam_text text-center">
//                 <h3>Add-Pet</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row">
//           <div className="col-4 mx-auto my-5">
//             <form method="post" onSubmit={handleForm}>
//               {/* Dropdown for Pet Type */}
//               <div className="mb-3">
//                 <label htmlFor="petType" className="form-label">
//                   Select Pet Type
//                 </label>
//                 <select
//                   className="form-select"
//                   value={petType}
//                   onChange={(e) => setPetType(e.target.value)}
//                 >
//                   <option value="">-- Select Pet Type --</option>
//                   <option value="Dog">Dog</option>
//                   <option value="Cat">Cat</option>
//                   <option value="Rabbit">Rabbit</option>
//                 </select>
//               </div>

//               {/* Dropdown for Breed */}
//               <div className="mb-3">
//                 <label htmlFor="breed" className="form-label">
//                   Select Breed
//                 </label>
//                 <select
//                   className="form-select"
//                   value={breed}
//                   onChange={(e) => setBreed(e.target.value)}
//                 >
//                   <option value="">-- Select Breed --</option>
//                   <option value="Golden Retriever">Golden Retriever</option>
//                   <option value="Beagle">Beagle</option>
//                   <option value="Siberian Husky">Siberian Husky</option>
//                   <option value="Persian Cat">Persian Cat</option>
//                   <option value="Angora Rabbit">Angora Rabbit</option>
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Image</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   value={imageName}
//                   onChange={changeImg}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Description</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>

              

//               <button type="submit" className="btn btn-warning w-100">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




