import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios";
export default function AddPost() {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [location, setLocation] = useState("")
    const [information, setInfo] = useState("")
    const nav = useNavigate()
    const handleForm=(e)=>{
            e.preventDefault()  
           let data={
            title:title,
            image:image,
            location:location,
            information:information
           }
            axios.post("http://localhost:5000/api/user/login", data)
             .then((res)=>{
              if(res.data.success){
                toast.success(res.data?.message)
                sessionStorage.setItem("isLogin", true)
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("name",res.data.data.name)
                sessionStorage.setItem("userId",res.data.data._id)
                        if(res.data.success){
                            toast.success(res.data?.message)
                            if(res.data?.data?.userType==1){
                                nav("/Addpost")
                            }else{
                                nav("/")
                            }
                        }else{
                            toast.error(res.data?.message)
                        }
                      }
                    })
                    .catch((error)=>{
                        toast.error(error?.message)
                    })
                    
                }
    return (
        <>
        <div className="bradcam_area breadcam_bg">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="bradcam_text text-center">
            <h3>Add-Post</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
            <div className="container">
                <div className="row">
                    <div className="col-4 mx-auto my-5">
                        <h2>Add Post</h2>

                        <form action="#" onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputTitle" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputImage" className="form-label">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={image}
                                    onChange={(e) => {
                                        setImage(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputImage" className="form-label">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputImage" className="form-label">
                                   Information
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={information}
                                    onChange={(e) => {
                                        setInfo(e.target.value)
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn btn-warning">
                                Submit
                            </button>
                           
                        </form>

                    </div>
                </div>
            </div>
          
        </>
    )
}
