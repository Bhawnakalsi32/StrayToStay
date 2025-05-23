import React, { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"; // ✅ Import useParams

const DonationForm = () => {
  const { id } = useParams(); // ✅ Get NGO ID from URL
  const [ngos, setNgos] = useState([]);
  const [selectedNgoName, setSelectedNgoName] = useState("");
  const [formData, setFormData] = useState({
    ngoId: "",
    donationAmount: "",
    donationDetails: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ApiServices.simpleList()
      .then((res) => {
        if (res.data.success) {
          setNgos(res.data.data);

          // ✅ Find NGO from list by ID in URL
          const foundNgo = res.data.data.find((ngo) => ngo._id === id);
          if (foundNgo) {
            setSelectedNgoName(foundNgo.ngoName);
            setFormData((prev) => ({
              ...prev,
              ngoId: foundNgo._id,
            }));
          } else {
            toast.error("NGO not found");
          }
        } else {
          setNgos([]);
          toast.error("Failed to load NGOs");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch NGOs:", err);
        setNgos([]);
        toast.error("Failed to load NGOs");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ngoId || !formData.donationAmount) {
      toast.warn("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await ApiServices.createDonationOrder(formData);
      const { order } = res.data;

      const options = {
        key: "rzp_test_81m41n13O8OvjC",
        amount: order.amount,
        currency: "INR",
        name: "Donation to NGO",
        description: "Secure Payment",
        image: "https://example.com/logo.png",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment Successful!");

          try {
            await ApiServices.confirmDonation({
              ...formData,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            });
            toast.success("Donation recorded!");
            setFormData({ ngoId: "", donationAmount: "", donationDetails: "" });
          } catch (err) {
            toast.error("Error confirming donation");
          }
        },
        prefill: {
          name: "Your Name",
          email: "your@email.com",
          contact: "987654321",
        },
        theme: {
          color: "#ff8c00",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error("Donation Error:", err);
      toast.error("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bradcam_area breadcam_bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcam_text text-center">
                <h3>Donation</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-6 col-lg-5 mt-5 p-4 shadow-sm rounded"
            style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          >
            <h4 className="mb-4 text-center text-uppercase" style={{ color: "#ff8c00" }}>
              Donation Form
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="ngoId" className="form-label fw-bold">
                  NGO Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedNgoName}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="donationAmount" className="form-label fw-bold">
                  Donation Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="donationAmount"
                  name="donationAmount"
                  placeholder="Enter donation amount"
                  min="1"
                  value={formData.donationAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="donationDetails" className="form-label fw-bold">
                  Donation Details
                </label>
                <textarea
                  className="form-control"
                  id="donationDetails"
                  name="donationDetails"
                  placeholder="Any specific instructions or notes (optional)"
                  value={formData.donationDetails}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(45deg, orange 70%, gold 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  padding: "10px 0",
                  borderRadius: "8px",
                  transition: "0.3s",
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationForm;
