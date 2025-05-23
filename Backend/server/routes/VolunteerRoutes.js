const UserController = require("../apis/User/UserController")
const NgoController = require("../apis/Ngo/NgoController")
const BreedController = require("../apis/Breed/BreedController")
const PetListingController = require("../apis/PetListing/PetListingController")
const multer = require("multer")
const VolunteerController = require("../apis/Volunteer/VolunteerController")
const DonationController = require("../apis/Donation/DonationController")
const AdoptionRequestController = require("../apis/AdoptionRequest/AdoptionRequestController")
const PostController = require("../apis/Post/PostController")

const router = require("express").Router()
// auth apis


router.post("/login", UserController.login)


// //volunteer


router.post("/register", VolunteerController.register)
// ngo
// router.post("/ngo/login",UserController.login)
// router.post("/Ngo/register", NgoController.register)
// router.post("/Ngo/all", NgoController.all)
// router.post("/Ngo/single", NgoController.single)
// router.post("/Ngo/changeStatus", NgoController.changeStatus)
// router.post("/Ngo/update", NgoController.update)

//TokenChecker
router.use(require("../Middleware/VolunteerTokenChecker"))
router.post("/password/change", UserController.changePassword)


//donation

router.post("/donation/add", DonationController.add)
router.post("/donation/createDonationOrder", DonationController.createDonationOrder)
router.post("/donation/confirmDonationPayment", DonationController.confirmDonationPayment)


// router.post("/donation/all", DonationController.all)
router.post("/donation/single", DonationController.single)
router.post("/donation/changeStatus", DonationController.changeStatus)
router.post("/donation/update", DonationController.update)


// breed
// const BreedStorage = multer.memoryStorage() //buffer object
// const BreedUpload = multer({ storage: BreedStorage })
// router.post("/Breed/changeStatus", BreedController.changeStatus)
// router.post("/Breed/update", BreedController.update)
// router.post("/Breed/all", BreedController.all)
//  router.post("/Breed/add", BreedUpload.single("image"), BreedController.add)
// router.post("/Breed/single", BreedController.single)


// volunteer


// router.post("/volunteer/all", VolunteerController.all)
router.post("/volunteer/single", VolunteerController.single)
router.post("/volunteer/changeStatus", VolunteerController.changeStatus)
router.post("/volunteer/update", VolunteerController.update)




// petListing

// const PetListingStorage = multer.memoryStorage() //buffer object
// const PetListingUpload = multer({ storage: PetListingStorage })
// router.post("/PetListing/add", PetListingUpload.single("image"), PetListingController.add)
// router.post("/PetListing/all", PetListingController.all)
// router.post("/PetListing/changeStatus", PetListingController.changeStatus)
// router.post("/PetListing/update", PetListingController.update)
// router.post("/PetListing/single", PetListingController.single)

// // /AdoptionRequest

let AdoptionRequestStorage = multer.memoryStorage()  //buffer object
let AdoptionRequestUpload = multer({ storage: AdoptionRequestStorage })

router.post("/adoptionRequest/add", AdoptionRequestUpload.fields([{ name: "idProof", maxCount: 1 }, { name: "incomeCertificate", maxCount: 1 }, { name: "bankStatement", maxCount: 1 }, { name: "addressProof", maxCount: 1 }]), AdoptionRequestController.add);
router.post("/adoptionRequest/update", AdoptionRequestUpload.fields([{ name: "idProof", maxCount: 1 }, { name: "incomeCertificate", maxCount: 1 }, { name: "bankStatement", maxCount: 1 }, { name: "addressProof", maxCount: 1 }]), AdoptionRequestController.update);
router.post("/adoptionRequest/changeStatus",AdoptionRequestController.changeStatus)




///post

const PostStorage = multer.memoryStorage()  //buffer object
const PostUpload = multer({ storage: PostStorage })
router.post("/post/add", PostUpload.single("image"), PostController.add)
router.post("/post/like",PostController.Like)
router.post("/post/all",PostController.all)
router.post("/post/single",PostController.single)
router.post("/post/update",PostUpload.single("image"),PostController.update)
router.post("/post/changeStatus",PostController.changeStatus)

// Post



module.exports = router
