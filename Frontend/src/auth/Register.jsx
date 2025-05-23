import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const nav = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();
        let data = { name, email, password, contact, address };

        axios.post("http://localhost:5000/volunteer/register", data)
            .then((res) => {
                if (res.data.success) {
                     toast.success(res.data.message)
                let formData={
                    email:email,
                    password:password
                }
        axios.post("http://localhost:5000/api/user/login", formData)
                .then((res)=>{
                    if(res.data.success){
                        toast.success(res.data?.message)
                        sessionStorage.setItem("isLogin", true)
                        localStorage.setItem("isLogin", true)
                        sessionStorage.setItem("token", res.data.token)
                        sessionStorage.setItem("name",res.data.data.name)
                        sessionStorage.setItem("userId",res.data.data._id)
                        sessionStorage.setItem("userType", res.data.data.userType)
                        if(res.data?.data?.userType==2){
                          
                            nav("/home")
                        }
                    }else{
                        toast.error(res.data?.message)
                    }
                })
                .catch((error)=>{
                    toast.error(error?.message)
                })
                } else {
                    toast.error(res.data?.message);
                }
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    return (
        <>
            {/* Header Section */}
            <div className="bradcam_area breadcam_bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bradcam_text text-center">
                                <h3>Register</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cool Card Register Form */}
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                <div
                    className="p-4"
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        background: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "20px",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        animation: "fadeIn 0.5s ease-in-out"
                    }}
                >
                    <h2 className="text-center mb-4 fw-bold">Register Form</h2>

                    <form onSubmit={handleForm}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control rounded-3 shadow-sm"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control rounded-3 shadow-sm"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control rounded-3 shadow-sm"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control rounded-3 shadow-sm"
                                placeholder="Enter your phone number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                       

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn w-100 text-white mb-3"
                            style={{
                                background: "linear-gradient(to right, #f59e0b, #fbbf24)",
                                fontWeight: "600",
                                borderRadius: "12px",
                                transition: "0.3s",
                                border: "none"
                            }}
                        >
                            Submit
                        </button>

                        {/* Radio Buttons for Role Selection */}
                        <div className="d-flex justify-content-center align-items-center gap-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userType"
                                    id="volunteerRadio"
                                    value="volunteer"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="volunteerRadio">
                                    Volunteer
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userType"
                                    id="ngoRadio"
                                    value="ngo"
                                    onClick={() => nav("/ngoregister")}
                                />
                                <label className="form-check-label" htmlFor="ngoRadio">
                                    NGO
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Fade-in Animation */}
            <style>
                {`
                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
        </>
    );
}
