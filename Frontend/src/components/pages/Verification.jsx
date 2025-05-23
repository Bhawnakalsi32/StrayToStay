import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function Verification() {
  const { id } = useParams();
  const nav = useNavigate();

  const [idProof, setIdProof] = useState({});
  const [idProofName, setIdProofName] = useState("");
  const [incomeCertificate, setIncomeCertificate] = useState({});
  const [incomeCertificateName, setIncomeCertificateName] = useState("");
  const [bankStatement, setBankStatement] = useState({});
  const [bankStatementName, setBankStatementName] = useState("");
  const [addressProof, setAddressProof] = useState({});
  const [addressProofName, setAddressProofName] = useState("");

  const [loading, setLoading] = useState(false); // loading state

  const changeImg = (e) => {
    const { name, value, files } = e.target;
    const file = files[0];

    switch (name) {
      case "idProof":
        setIdProof(file);
        setIdProofName(value);
        break;
      case "incomeCertificate":
        setIncomeCertificate(file);
        setIncomeCertificateName(value);
        break;
      case "bankStatement":
        setBankStatement(file);
        setBankStatementName(value);
        break;
      case "addressProof":
        setAddressProof(file);
        setAddressProofName(value);
        break;
      default:
        break;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    setLoading(true); // show loader & disable UI

    let formData = new FormData();
    formData.append("petId", id);
    formData.append("idProof", idProof);
    formData.append("incomeCertificate", incomeCertificate);
    formData.append("bankStatement", bankStatement);
    formData.append("addressProof", addressProof);

    ApiServices.addAdoptionRequest(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIdProof({});
          setIdProofName("");
          setIncomeCertificate({});
          setIncomeCertificateName("");
          setBankStatement({});
          setBankStatementName("");
          setAddressProof({});
          setAddressProofName("");
          nav("/petlisting");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false); // hide loader & enable UI
      });
  };

  return (
    <>
      {/* Loader Overlay with rotating circle loader */}
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
            <div className="col-lg-12 text-center">
              <div className="bradcam_text">
                <h3>Pet Adoption Form</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: "40px",
          maxWidth: "600px",
          pointerEvents: loading ? "none" : "auto",
          opacity: loading ? 0.5 : 1,
        }}
      >
        <div
          className="card"
          style={{
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
          }}
        >
          <div className="card-body px-4 py-5">
            <h2 className="text-center mb-4" style={{ color: "#fd7e14", fontWeight: "bold" }}>
              Adoption Verification
            </h2>

            <form onSubmit={handleForm}>
              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>
                  ID Proof
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="idProof"
                  value={idProofName}
                  onChange={changeImg}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>
                  Income Certificate
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="incomeCertificate"
                  value={incomeCertificateName}
                  onChange={changeImg}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>
                  Bank Statement
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="bankStatement"
                  value={bankStatementName}
                  onChange={changeImg}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: "bold", color: "#000" }}>
                  Address Proof
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="addressProof"
                  value={addressProofName}
                  onChange={changeImg}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#fd7e14",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                disabled={loading}
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
