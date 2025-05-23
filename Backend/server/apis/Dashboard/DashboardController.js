const UserModel = require("../User/UserModel");
const NgoModel = require("../Ngo/NgoModel");
const BreedModel = require("../Breed/BreedModel");
const PetListing = require("../PetListing/PetListingModel");

dashboard = async (req, res) => {
    try {
        // User stats
        let totalUsers = await UserModel.countDocuments().exec();
        let activeUsers = await UserModel.countDocuments({ status: true }).exec();
        let inActiveUsers = await UserModel.countDocuments({ status: false }).exec();

        // NGO stats
        let totalNgos = await NgoModel.countDocuments().exec();
        let activeNgos = await NgoModel.countDocuments({ status: true }).exec();
        let inActiveNgos = await NgoModel.countDocuments({ status: false }).exec();

        // Breed stats
        let totalBreeds = await BreedModel.countDocuments().exec();
        let activeBreeds = await BreedModel.countDocuments({ status: true }).exec();
        let inActiveBreeds = await BreedModel.countDocuments({ status: false }).exec();

        // Pet Listing stats
        let totalPets = await PetListing.countDocuments().exec();
        let activePets = await PetListing.countDocuments({ status: true }).exec();
        let inActivePets = await PetListing.countDocuments({ status: false }).exec();

        

        res.json({
            status: 200,
            success: true,
            message: "Dashboard loaded!",
            users: {
                total: totalUsers,
                active: activeUsers,
                inactive: inActiveUsers
            },
            ngos: {
                total: totalNgos,
                active: activeNgos,
                inactive: inActiveNgos
            },
            breeds: {
                total: totalBreeds,
                active: activeBreeds,
                inactive: inActiveBreeds
            },
            pets: {
                total: totalPets,
                active: activePets,
                inactive: inActivePets,
            }
        });
    } catch (err) {
        console.error("Dashboard Error:", err);
        res.json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { dashboard };
