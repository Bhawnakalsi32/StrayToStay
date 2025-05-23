const DonationModel = require("./DonationModel");
const Razorpay = require("razorpay");

// Add Donation
const add = async (req, res) => {
  let validation = "";
  let formData = req.body;

  if (!formData.ngoId) {
    validation += " ngoId is required";
  }
  if (formData.donationAmount === undefined) {
    validation += " donationAmount is required";
  }
  if (!formData.donationDetails) {
    validation += " donationDetails is required";
  }

  if (!!validation.trim()) {
    return res.json({
      status: 422,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    const total = await DonationModel.countDocuments().exec();
    let DonationObj = new DonationModel();
    DonationObj.ngoId = formData.ngoId;
    DonationObj.donationAmount = formData.donationAmount;
    DonationObj.donationDetails = formData.donationDetails;
    DonationObj.addedById = req.decoded.userId;
    DonationObj.autoId = total + 1;

    const DonationData = await DonationObj.save();
    res.json({
      status: 200,
      success: true,
      message: "Donation successfully added!",
      data: DonationData,
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

// Get All Donations with pagination
const all = async (req, res) => {
  try {
    let formData = req.body;
    let limit = formData.limit || 10;
    let currentPage = formData.currentPage || 1;
    delete formData.limit;
    delete formData.currentPage;

    const DonationData = await DonationModel.find(formData)
      .limit(limit)
      .skip((currentPage - 1) * limit)
      .populate([{ path: "addedById", select: "name email" }, { path: "ngoId", select: "ngoName" }])
      .exec();

    if (DonationData.length > 0) {
      const total = await DonationModel.countDocuments().exec();
      return res.json({
        status: 200,
        success: true,
        message: "Donations loaded",
        total: total,
        data: DonationData,
      });
    } else {
      return res.json({
        status: 404,
        success: false,
        message: "No Donation Found!!",
        data: [],
      });
    }
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

// Get single donation by _id
const single = async (req, res) => {
  let validation = "";
  let formData = req.body;

  if (!formData._id) {
    validation += "_id is required";
  }

  if (!!validation.trim()) {
    return res.json({
      status: 422,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    const DonationData = await DonationModel.findOne({ _id: formData._id })
      .populate([{ path: "addedById", select: "name email" }, { path: "ngoId", select: "ngoName" }])
      .exec();

    if (!DonationData) {
      return res.json({
        status: 404,
        success: false,
        message: "No Donation found!!",
      });
    }

    return res.json({
      status: 200,
      success: true,
      message: "Donation exists",
      data: DonationData,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

// Update donation (only donationAmount and donationDetails allowed)
const update = async (req, res) => {
  let validation = "";
  let formData = req.body;

  if (!formData._id) {
    validation += "_id is required";
  }

  if (!!validation.trim()) {
    return res.json({
      status: 422,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    let DonationData = await DonationModel.findOne({ _id: formData._id }).exec();

    if (!DonationData) {
      return res.json({
        status: 404,
        success: false,
        message: "No Donation found!!",
      });
    }

    if (formData.donationAmount !== undefined) {
      DonationData.donationAmount = formData.donationAmount;
    }
    if (formData.donationDetails) {
      DonationData.donationDetails = formData.donationDetails;
    }

    await DonationData.save();

    return res.json({
      status: 200,
      success: true,
      message: "Donation updated successfully!!",
      data: DonationData,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

// Change status of donation (toggle)
const changeStatus = async (req, res) => {
  let validation = "";
  let formData = req.body;

  if (!formData._id) {
    validation += "_id is required";
  }

  if (!!validation.trim()) {
    return res.json({
      status: 422,
      success: false,
      message: validation.trim(),
    });
  }

  try {
    let DonationData = await DonationModel.findOne({ _id: formData._id }).exec();

    if (!DonationData) {
      return res.json({
        status: 404,
        success: false,
        message: "No Donation found!!",
      });
    }

    DonationData.status = !DonationData.status;
    await DonationData.save();

    return res.json({
      status: 200,
      success: true,
      message: "Status updated successfully",
      data: DonationData,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message || err,
    });
  }
};
const createDonationOrder = async (req, res) => {
  const { donationAmount, ngoId, donationDetails } = req.body;
  const errors = [];

  if (!donationAmount || donationAmount < 1) errors.push("Valid donationAmount is required");
  if (!ngoId) errors.push("ngoId is required");

  if (errors.length > 0) {
    return res.status(422).send({
      success: false,
      message: errors,
    });
  }

  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_81m41n13O8OvjC",        // replace with real key
      key_secret: "0yEv1mJbIxS9SowEyrJ1DtTK" // replace with real secret
    });

    const options = {
      amount: donationAmount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    // Optionally save a pending donation in DB
    // const donation = await donationModel.create({
    //   ngoId,
    //   donationAmount,
    //   donationDetails,
    //   razorpayOrderId: order.id,
    //   paymentStatus: "pending"
    // });

    res.status(200).send({
      success: true,
      message: "Donation order created successfully",
      order,
      // donation
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error while creating Razorpay order",
      error: error.message,
    });
  }
};
// Confirm donation payment after Razorpay payment success
const confirmDonationPayment = async (req, res) => {
  const {
    ngoId,
    donationAmount,
    donationDetails,
    razorpayOrderId,
    razorpayPaymentId
  } = req.body;

  if (!ngoId || !donationAmount || !razorpayOrderId || !razorpayPaymentId) {
    return res.status(422).json({
      success: false,
      message: "ngoId, donationAmount, razorpayOrderId, and razorpayPaymentId are required"
    });
  }

  try {
    // Create and save the confirmed donation
    const donation = new DonationModel({
      ngoId,
      donationAmount,
      donationDetails,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus: "paid",  // You might want to add this field to your model
      addedById: req.decoded ? req.decoded.userId : null
    });

    await donation.save();

    return res.status(200).json({
      success: true,
      message: "Donation payment confirmed and saved successfully",
      data: donation
    });
  } catch (error) {
    console.error("Error confirming donation payment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while confirming donation payment",
      error: error.message
    });
  }
};



module.exports = {
  all,
  add,
  single,
  update,
  changeStatus,
  createDonationOrder,
  confirmDonationPayment
};
