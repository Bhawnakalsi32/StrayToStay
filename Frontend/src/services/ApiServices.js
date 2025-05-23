import axios from "axios";
const BASE_URL="http://localhost:5000"
class ApiServices{
    getToken(){
        let headers={
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        }
        return headers
    }
    addPost(formData){
          return axios.post(BASE_URL+"/api/post/add", formData,this.getToken())
      }
      allPost(formData){
        return axios.post(BASE_URL+"/api/post/all", formData,this.getToken())
    }
    singlePost(formData){
        return axios.post(BASE_URL+"/api/post/single", formData,this.getToken())
    }
    updatePost(formData){
        return axios.post(BASE_URL+"/api/post/update", formData,this.getToken())
    }
    allPetType(formData){
        return axios.post(BASE_URL+"/api/petType/all", formData,this.getToken())
    }
    allBreed(formData) {
      return axios.post(BASE_URL + "/api/Breed/all", formData, this.getToken());
    }
    addPet(formData){
        return axios.post(BASE_URL+"/ngo/PetListing/add", formData,this.getToken())
    }
    addPetType(formData){
        return axios.post(BASE_URL+"/admin/petType/add", formData,this.getToken())
    }
    addBreed(formData){
        return axios.post(BASE_URL+"/admin/Breed/add", formData,this.getToken())
    }
     allPetListing(formData){
        return axios.post(BASE_URL+"/api/PetListing/all", formData,this.getToken())
    }
    addAdoptionRequest(formData){
          return axios.post(BASE_URL+"/volunteer/adoptionRequest/add", formData,this.getToken())
      }
      updatePetListing(formData){
          return axios.post(BASE_URL+"/ngo/PetListing/update", formData,this.getToken())
      }
      singlePetListing(formData){
        return axios.post(BASE_URL+"/ngo/PetListing/single", formData,this.getToken())
    }
     allAdoptionRequest(formData) {
      return axios.post(BASE_URL + "/api/adoptionRequest/all", formData, this.getToken());
    }
    singleAdoptionRequest(data) {
  return axios.post(BASE_URL+"/api/adoptionRequest/single", data,this.getToken());
  
}
changeStatus(formData) {
  return axios.post(BASE_URL+"/api/adoptionRequest/changeStatus", formData,this.getToken());

}
updatePetStatus(formData) {
  return axios.post(BASE_URL+"/api/PetListing/changeStatus", formData,this.getToken());

}
 updateProfile(formData){
        return axios.post(BASE_URL+"/volunteer/volunteer/update", formData,this.getToken())
    }
    singleProfile(formData){
        return axios.post(BASE_URL+"/volunteer/volunteer/single", formData,this.getToken())
    }
    updateNgoProfile(formData){
        return axios.post(BASE_URL+"/ngo/Ngo/update", formData,this.getToken())
    }
    singleNgoProfile(formData){
        return axios.post(BASE_URL+"/ngo/Ngo/single", formData,this.getToken())
    }
    changePassword(formData){
        return axios.post(BASE_URL+"/volunteer/password/change", formData,this.getToken())
    }
     ngoChangePassword(formData){
        return axios.post(BASE_URL+"/ngo/password/change", formData,this.getToken())
    }
     adminChangePassword(formData){
        return axios.post(BASE_URL+"/admin/password/change", formData,this.getToken())
    }
    singlePetListing(formData){
        return axios.post(BASE_URL+"/api/PetListing/single", formData,this.getToken())
    }
     simpleList(){
        return axios.post(BASE_URL+"/api/Ngo/simpleList",{},this.getToken())
    }
    createDonationOrder(formData){
        return axios.post(BASE_URL+"/volunteer/donation/createDonationOrder", formData,this.getToken())
    }
    confirmDonation(formData){
        return axios.post(BASE_URL+"/volunteer/donation/confirmDonationPayment", formData,this.getToken())
    }
     allDonations(formData){
        return axios.post(BASE_URL+"/api/donation/all",formData,this.getToken())
    }
    adminDash(formData){
        return axios.post(BASE_URL+"/admin/dashboard",formData,this.getToken())
    }
    allNgo(formData){
        return axios.post(BASE_URL+"/api/Ngo/all",formData,this.getToken())
    }
    allPetTypes(formData){
        return axios.post(BASE_URL+"/api/petType/all",formData,this.getToken())
    }
    




}
export default new ApiServices;