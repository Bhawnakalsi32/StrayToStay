import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();
        let data = { email, password };

        axios.post("http://localhost:5000/api/user/login", data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data?.message);
                    sessionStorage.setItem("isLogin", true);
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("name", res.data.data.name);
                    sessionStorage.setItem("userId", res.data.data._id);

                    if (res.data?.data?.userType == 1) {
                        nav("/admindash");
                    } else if(res.data?.data?.userType == 2){
                        nav("/home");
                    }
                    else if(res.data?.data?.userType == 3){
                        nav("/ngo/home");
                    }
                    // else(res.data?.data?.userType == 3)
                    //  nav("/ngo/home");
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
                                <h3>Login</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cool Card Login Form */}
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div
                    className="p-4"
                    style={{
                        width: "100%",
                        maxWidth: "450px",
                        background: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "20px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        animation: "fadeIn 0.5s ease-in-out"
                    }}
                >
                    <h2 className="text-center mb-4 fw-bold">Login Form</h2>

                    <form onSubmit={handleForm}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control rounded-3 shadow-sm"
                                id="exampleInputEmail1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control rounded-3 shadow-sm"
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 text-white"
                            style={{
                                background: "linear-gradient(to right, #f59e0b, #f97316)",
                                fontWeight: "600",
                                borderRadius: "12px",
                                transition: "0.3s"
                            }}
                        >
                            Submit
                        </button>

                        <div className="text-center mt-3">
                            <span>Are you a new user?</span>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary ms-2"
                                onClick={() => nav("/register")}
                            >
                                Register Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Optional Animation */}
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
