const mongoose = require("mongoose");

const DonationSchema = mongoose.Schema({
  autoId: { type: Number, default: 1 },
  donationAmount: { type: Number, default: 0 },
  donationDetails: { type: String, default: "" },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NgoModel", default: null },
  addedById: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", default: null },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
razorpayOrderId: { type: String, default: "" },
razorpayPaymentId: { type: String, default: "" },

  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("DonationModel", DonationSchema);
