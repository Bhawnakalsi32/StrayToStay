const UserController = require("../apis/User/UserController")
const NgoController = require("../apis/Ngo/NgoController")
const BreedController = require("../apis/Breed/BreedController")
const PetListingController = require("../apis/PetListing/PetListingController")
const multer = require("multer")
const VolunteerController = require("../apis/Volunteer/VolunteerController")
const DonationController = require("../apis/Donation/DonationController")
const AdoptionRequestController = require("../apis/AdoptionRequest/AdoptionRequestController")
const PostController = require("../apis/Post/PostController")
const PetTypeController = require("../apis/PetType/PetTypeController")
const DashboardController = require("../apis/Dashboard/DashboardController")
const router = require("express").Router()

// auth apis


router.post("/login", UserController.login)


router.use(require("../Middleware/AdminTokenChecker"))
router.post("/password/change", UserController.changePassword)



//volunteer/user

// const VolunteerStorage = multer.memoryStorage() //buffer object
// const VolunteerUpload = multer({ storage: VolunteerStorage })
// router.post("/volunteer/register", VolunteerUpload.single("image"), VolunteerController.register)


// ngo


// // router.post("/ngo/login",UserController.login)
// router.post("/Ngo/register", NgoController.register)
// router.post("/Ngo/all", NgoController.all)
// router.post("/Ngo/single", NgoController.single)
router.post("/Ngo/changeStatus", NgoController.changeStatus)
router.post("/Ngo/update", NgoController.update)




//donation

// router.post("/donation/add", DonationController.add)
router.post("/donation/single", DonationController.single)
router.post("/donation/changeStatus", DonationController.changeStatus)
// router.post("/donation/update", DonationController.update)


// breed
const BreedStorage = multer.memoryStorage() //buffer object
const BreedUpload = multer({ storage: BreedStorage })
router.post("/Breed/changeStatus", BreedController.changeStatus)
router.post("/Breed/update", BreedUpload.single("image"),BreedController.update)
// router.post("/Breed/all", BreedController.all) //common
router.post("/Breed/add", BreedUpload.single("image"), BreedController.add)
// router.post("/Breed/single", BreedController.single)       //common


// volunteer

//common
router.post("/volunteer/all", VolunteerController.all)
router.post("/volunteer/single", VolunteerController.single)
router.post("/volunteer/changeStatus", VolunteerController.changeStatus)
// router.post("/volunteer/update", VolunteerController.update)




// petListing

const PetListingStorage = multer.memoryStorage() //buffer object
const PetListingUpload = multer({ storage: PetListingStorage })
// router.post("/PetListing/add", PetListingUpload.single("image"), PetListingController.add)
// router.post("/PetListing/all", PetListingController.all)
router.post("/PetListing/changeStatus", PetListingController.changeStatus)
router.post("/PetListing/update",PetListingUpload.single("image") ,PetListingController.update)
// router.post("/PetListing/single", PetListingController.single)

// /AdoptionRequest

// const AdoptionRequestStorage = multer.memoryStorage()  //buffer object
// const AdoptionRequestUpload = multer({ storage: AdoptionRequestStorage })
// router.post("/adoptionRequest/add",AdoptionRequestUpload.single("idProof"),AdoptionRequestController.add)
// router.post("/adoptionRequest/all",AdoptionRequestController.all)
// router.post("/adoptionRequest/single",AdoptionRequestController.single)
// router.post("/adoptionRequest/changeStatus",AdoptionRequestController.changeStatus)
// router.post("/adoptionRequest/update",AdoptionRequestController.update)
// router.post("/adoptionRequest/add", AdoptionRequestUpload.fields(
//     [{ name: "idProof", maxCount: 1 }, { name: "incomeCertificate", maxCount: 1 }, { name: "bankStatement", maxCount: 1 }, { name: "addressProof", maxCount: 1 }]), AdoptionRequestController.add);


///post

const PostStorage = multer.memoryStorage()  //buffer object
const PostUpload = multer({ storage: PostStorage })
router.post("/post/add", PostUpload.single("image"), PostController.add) 
 router.post("/post/update",PostUpload.single("image"),PostController.update)
router.post("/post/changeStatus",PostController.changeStatus)  
router.post("/post/like",PostController.Like)                   //common

//petType

const PetStorage = multer.memoryStorage() //buffer object
const PetTypeUpload = multer({ storage: PetStorage })
router.post("/petType/add",PetTypeUpload.single("image"),PetTypeController.add)
router.post("/petType/update",PetTypeUpload.single("image"),PetTypeController.update)

//dashboard
router.post("/dashboard", DashboardController.dashboard)



module.exports = router
