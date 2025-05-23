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



// NGo
const NgoStorage = multer.memoryStorage()  //buffer object
const NgoUpload = multer({ storage: NgoStorage })
router.post("/register", NgoUpload.single("logo"),  NgoController.register)
router.post("/Ngo/update", NgoUpload.single("logo"), NgoController.update)



//TokenChecker
router.use(require("../Middleware/NgoTokenChecker"))
router.post("/password/change", UserController.changePassword)

// ngo
router.post("/changeStatus",  NgoController.changeStatus)

//adoptionRequest
router.post("/adoptionRequest/all",AdoptionRequestController.all)
router.post("/adoptionRequest/single",AdoptionRequestController.single)

//volunteer
router.post("/volunteer/all", VolunteerController.all)
router.post("/volunteer/single", VolunteerController.single)

//donation

// router.post("/donation/add", DonationController.add)
router.post("/donation/all", DonationController.all)
router.post("/donation/single", DonationController.single)
// router.post("/donation/changeStatus", DonationController.changeStatus)
// router.post("/donation/update", DonationController.update)

//post
const PostStorage = multer.memoryStorage()  //buffer object
const PostUpload = multer({ storage: PostStorage })
router.post("/post/add", PostUpload.single("image"), PostController.add) 
 router.post("/post/update",PostUpload.single("image"),PostController.update)
router.post("/post/changeStatus",PostController.changeStatus)  
router.post("/post/like",PostController.Like) 

//  pet listing
const PetListingStorage = multer.memoryStorage() //buffer object
const PetListingUpload = multer({ storage: PetListingStorage })
router.post("/PetListing/add", PetListingUpload.single("image"), PetListingController.add)
// router.post("/PetListing/all", PetListingController.all)
router.post("/PetListing/update",PetListingUpload.single("image") ,PetListingController.update)
// router.post("/PetListing/single", PetListingController.single)

router.post("/Ngo/single", NgoController.single)

module.exports = router
