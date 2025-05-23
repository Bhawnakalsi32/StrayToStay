import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Addpost from "./components/pages/Addpost";
import Viewpost from "./components/pages/Viewpost";
import About from "./components/pages/About";
import PetListing from "./components/pages/PetListing";
import Login from "./auth/Login";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AdminDash from "./components/admin/pages/AdminDash";
import Users from "./components/admin/pages/Users";
import AddPost from "./components/admin/pages/AddPost";
import AdoptPet from "./components/pages/AdoptPet";
import AdoptionRequests from "./components/admin/pages/AdoptionRequests";
import Register from "./auth/Register";
import Dashboard from "./components/ngo/pages/Dashboard";
import Ngolayout from "./components/ngo/layout/Ngolayout";
import Verification from "./components/pages/Verification";
import PetDetails from "./components/pages/petDetails";
import EditPost from "./components/pages/EditPost";
import AddPet from "./components/pages/AddPet";
import AddPetType from "./components/admin/pages/PetTypeAdd";
import ViewPetType from "./components/admin/pages/ViewPetType";
import NgoPetTable from "./components/ngo/pages/PetListing";
import AddBreed from "./components/admin/pages/Breed";
import PetListings from "./components/admin/pages/PetListings";
import NgoViewPost from "./components/ngo/pages/ViewPost";
import NgoAdoptionRequests from "./components/ngo/pages/AdoptionRequest";
import EditPetListing from "./components/ngo/pages/EditPetListing";
import AdminViewPost from "./components/admin/pages/ViewPosts";
import AdminAdoptionRequests from "./components/admin/pages/AdoptionRequests";
import ViewPetAdoption from "./components/ngo/pages/ViewAdoptionDetails";
import NgoRegister from "./auth/NgoRegister";
import UpdateProfile from "./components/pages/UpdateProfile";
import NgoUpdateProfile from "./components/ngo/pages/NgoUpdateProfile";
import ChangePassword from "./components/pages/ChangePassword";
import NgoChangePassword from "./components/ngo/pages/NgoChangePassword";
import AdminChangePassword from "./components/admin/pages/AdminChangePassword";
import AdminPetDetails from "./components/admin/pages/AdminPetDetails";
import ViewPetListingDetails from "./components/pages/ViewPetListing";
import AdminViewPetListingDetails from "./components/admin/pages/AdminViewPetListings";
import NgoAddPet from "./components/ngo/pages/NgoAddPet";
import NgoPetDetails from "./components/ngo/pages/NgoPetDetails";
import DonationForm from "./components/pages/Donation";
import AdminViewDonations from "./components/admin/pages/AdminDonation";
import NgoViewDonations from "./components/ngo/pages/NgoDonation";
import NgoList from "./components/pages/AddDonation";
import AdminViewPetTypes from "./components/admin/pages/PetTypesAll";
import NgoHome from "./components/ngo/pages/NgoHome";
import Loader from "./Loader";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";





function App() {
  return (
    <>
      <BrowserRouter>
            <Loader/>
        <Routes>
    
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
                <Route path="ngoregister" element={<NgoRegister />} />


          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />}/>
            <Route path="addpost" element={<Addpost/>}/>
            <Route path="viewpost" element={<Viewpost/>}/>
            <Route path="petdetails/:id" element={<PetDetails/>}/>
            <Route path="editpost/:id" element={<EditPost/>}/> 
            <Route path="addpet" element={<AddPet/>}/>

            <Route path="adoptpet" element={<AdoptPet/>}/>
            <Route path="petlisting" element={<PetListing/>}/>
            <Route path="verification/:id" element={<Verification/>}/>
            <Route path="updateprofile/:id" element={<UpdateProfile/>}/>
            <Route path="changepassword/:id" element={<ChangePassword/>}/>
            <Route path="viewpetlisting/:id" element={<ViewPetListingDetails/>}/>
            <Route path="donation/:id" element={<DonationForm/>}/>
            <Route path="list" element={<NgoList/>}/>
            



          </Route>

          {/* Admin Routes */}
          <Route path="admindash" element={<AdminLayout />}>
            <Route index element={<AdminDash />} />
            <Route path="/admindash/users" element={<Users />} />

            <Route path="/admindash/addpost" element={<AddPost />} />
            <Route path="/admindash/addpettype" element={<AddPetType />} />
            <Route path="/admindash/viewpettype" element={<ViewPetType />} />
            <Route path="/admindash/addbreed" element={<AddBreed />} />
           <Route path="/admindash/addpets" element={<PetListings />} />
            <Route path="/admindash/viewposts" element={<AdminViewPost />} />
            <Route path="/admindash/adoptionrequests" element={<AdminAdoptionRequests />} />
            <Route path="/admindash/changepassword/:id" element={<AdminChangePassword />} />
            <Route path="/admindash/petdetails/:id" element={<AdminPetDetails />} />
            <Route path="/admindash/viewpetlisting/:id" element={<AdminViewPetListingDetails />} />
            <Route path="/admindash/donation" element={<AdminViewDonations />} />
            <Route path="/admindash/pettypes" element={<AdminViewPetTypes />} />





          </Route>

          <Route path="users" element={<Navigate to="/admindash/users"  />} />
            <Route path="addpost" element={<Navigate to="/admindash/post/addpost"  />} /> 
            <Route path="adoptionrequests" element={<Navigate to="/admindash/adoption/adoptionrequest"  />} />
       
            <Route> 
                <Route path="ngo" element={<Ngolayout/>}>
                <Route path="/ngo/home" element={<NgoHome/>}/> 
                <Route path="/ngo/petlisting" element={<NgoPetTable/>}/> 
                 <Route path="/ngo/viewpost" element={<NgoViewPost/>}/> 
                 <Route path="/ngo/adoptionrequests" element={<NgoAdoptionRequests/>}/> 
                 <Route path="/ngo/editpetlisting/:id" element={<EditPetListing/>}/> 
                 <Route path="/ngo/viewadoptiondetails/:id" element={<ViewPetAdoption/>}/> 
                 <Route path="/ngo/viewpost" element={<NgoViewPost/>}/> 
                 <Route path="/ngo/updateprofile/:id" element={<NgoUpdateProfile/>}/> 
                 <Route path="/ngo/changepassword/:id" element={<NgoChangePassword/>}/> 
                 <Route path="/ngo/addpet" element={<NgoAddPet/>}/> 
                 <Route path="/ngo/petdetails/:id" element={<NgoPetDetails/>}/> 
                 <Route path="/ngo/donation" element={<NgoViewDonations/>}/> 
                  <Route path="/ngo/contact" element={<Contact />}/>
                  <Route path="/ngo/about" element={<About />} />



                <Route path="/ngo/open+" element={<Dashboard/>}/> 

                 </Route>
                
                

            </Route> 
        </Routes>

        
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
