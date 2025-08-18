
import React, { useState, useEffect } from 'react';
import { useBankingSystem } from "../Context/UserContext.jsx"
import axios from "../Utills/AxiosWithJWT.jsx"
import { toast } from 'react-hot-toast';
import { useNavigate, NavLink } from "react-router-dom"
import NavbarDashboard from '../Dashboard/NavbarDashboard.jsx';
import Avatar from '../Avatar/Avatar.jsx';

const Profile = () => {

  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  //contextAPI
  const { BASE_URL, setUser: setUserDetails, userDetails, gettingAUser } = useBankingSystem();
  // const [image, setImage] = useState(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [existedUser, setExistedUser] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    userdetails: {
      userdetailsid: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      fyda: "",
      pan: "",
      gender: "",
      mobile: "",
      dateOfBirth: ""

    }
  });



  const navigateTo = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("jwtToken")){
      navigateTo("/")
    }
  },[])

  useEffect(() => {
  setExistedUser(userDetails)
  }, [userDetails])



  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     setImage(file)
  //     setImagePreviewUrl(reader.result);
  //   }

  //   reader.readAsDataURL(file)
  // }


  let user, uservalue;
  const handleAlreadyExistedDetails = (ele) => {
    const fieldsLevel1 = ['userId',
      'firstname',
      'lastname',
      'email'];
    user = ele.target.name;
    uservalue = ele.target.value;
    console.log("+++++ ", user);
    if (fieldsLevel1.indexOf(user?.trim()) < 0) {
      let modifiedUser = {
        ...existedUser,
        userdetails: {
          ...existedUser?.userdetails,
          [user]: uservalue,
        }
      };
      console.log("Modified User: ", modifiedUser);
      setExistedUser(modifiedUser);
    } else {
      let modifiedUser = { ...existedUser, [user]: uservalue };
      console.log("Modified User 2: ", modifiedUser);
      setExistedUser(modifiedUser);
    }


  };


    useEffect(()=>{
      
      },[existedUser])

  const handleCreateProfile = async (event) => {
    event.preventDefault();
    console.log("create profile initiated", existedUser);
    
      

    const { userdetails } = existedUser;

    console.log("fyda length ",userdetails?.fyda?.length);
    console.log("Fan length ",userdetails?.pan?.length);
    console.log("mobile length ",userdetails?.mobile?.length);
    
    const data = {
      address: userdetails?.address,
      city: userdetails?.city,
      state: userdetails?.state,
      pin: userdetails?.pin,
      fyda: userdetails?.fyda,
      pan: userdetails?.pan,
      gender: userdetails?.gender,
      mobile: userdetails?.mobile,
      dateOfBirth: userdetails?.dateOfBirth
    }


    if (!userdetails?.fyda || !userdetails?.mobile || !userdetails?.gender ) {
      //alert("Please fill all fields");
      toast.error("Please fill all mandatory fields");
      return;
    };

    


    if (userdetails?.fyda?.length !== 12) {
      toast.error("Fayda must be of 12 numbers!");
      return;
    }

    if (userdetails?.mobile?.length !== 10) {
      toast.error("Mobile number must be of 10 numbers!");
      return;
    }

    const profileResp = await axios.put(`${BASE_URL}/api/v1/user/updateprofile/${existedUser.userId}`, data);

    setUserDetails(profileResp.data.user);

    console.log(profileResp);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Created,Please Relogin and Request for Account opening!");
      sessionStorage.clear();
      navigateTo("/login")

    } else {
      toast.error("Error in creating Profile!");
    }
  }

  useEffect(()=>{
      
  },[existedUser])


  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    console.log("update profile initiated", existedUser);

    const { userdetails } = existedUser;

    console.log("fyda length ",typeof(userdetails?.fyda));
    
    console.log("Fan length ",userdetails?.pan?.length);
    console.log("Fan length ",typeof(userdetails?.pan));
    console.log("mobile length ",userdetails?.mobile?.length);

    const data = {
      userdetailsid: userdetails?.userdetailsid,
      address: userdetails?.address,
      city: userdetails?.city,
      state: userdetails?.state,
      pin: userdetails?.pin,
      fyda: userdetails?.fyda,
      pan: userdetails?.pan,
      gender: userdetails?.gender,
      mobile: userdetails?.mobile,
      dateOfBirth: userdetails?.dateOfBirth
    }


    if (!userdetails?.fyda || !userdetails?.mobile) {
      //alert("Please fill all fields");
      toast.error("Please fill all mandatory fields");
      return;
    };

    if (userdetails?.fyda?.length !== 12) {
      toast.error("Fayda must be of 12 numbers!");
      return;
    }

    if (userdetails?.mobile?.length !== 10) {
      toast.error("Mobile number must be of 10 numbers!");
      return;
    }



    const profileResp = await axios.put(`${BASE_URL}/api/v1/user/updateprofile/${existedUser.userId}`, data);

    setUserDetails(profileResp.data.user);

    console.log(profileResp);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Updated,Please Relogin and Request for Account opening!");
      sessionStorage.clear();
      navigateTo("/login")

    } else {
      toast.error("Error in creating Profile!");
    }



  }

  if (!existedUser?.userdetails?.userdetailsid) {
  return (
    <>
      <NavbarDashboard />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <Avatar />
          <NavLink
            to="/change-password"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
            Change Password
          </NavLink>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleUpdateProfile}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              name="firstname"
              value={existedUser?.firstname?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input
              name="lastname"
              value={existedUser?.lastname?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              value={existedUser?.email || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <input
              name="mobile"
              value={existedUser?.userdetails?.mobile || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              name="address"
              value={existedUser?.userdetails?.address || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              name="city"
              value={existedUser?.userdetails?.city || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">State</label>
            <input
              name="state"
              value={existedUser?.userdetails?.state || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Fayda (FAN Number)</label>
            <input
              type='text'
              name="fyda"
              value={existedUser?.userdetails?.fyda || ""}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <div className="flex space-x-4 mt-1">
              {["M", "F"].map((g) => (
                <label key={g} className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={existedUser?.userdetails?.gender === g}
                    onChange={handleAlreadyExistedDetails}
                    className="form-radio"
                  />
                  <span>
                    {g === "M" ? "Male" : g === "F" ? "Female" : ""}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={existedUser?.userdetails?.dateOfBirth}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          {/* <div>
            <label className="block font-medium mb-1">FIN Code:</label>
            <input
              type="text"
              name="pin"
              value={existedUser?.userdetails?.pin}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
          <label className="block font-medium mb-1">FAN Code:</label>
            <input
              type="text"
              name="pan"
              value={existedUser?.userdetails?.pan?.toUpperCase()}
              onChange={handleAlreadyExistedDetails}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div> */}
          <div className="col-span-2 flex justify-center items-center space-x-4 mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
} else {
  return (
    <>
      <NavbarDashboard />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <Avatar />

          <div className="flex flex-row items-center justify-center space-x-4 mt-4">

            <NavLink
              to="/change-password"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
              Change Password
            </NavLink>
          </div>
        </div>

        {/* Update Profile Form */}
        <form
          onSubmit={handleUpdateProfile}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="firstname"
              value={existedUser?.firstname?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="lastname"
              value={existedUser?.lastname?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="email"
              name="email"
              value={existedUser?.email || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="address"
              value={existedUser?.userdetails?.address || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="city"
              value={existedUser?.userdetails?.city || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">State</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="state"
              value={existedUser?.userdetails?.state || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          {/* <div>
            <label className="block font-medium mb-1">FIN Code</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="pin"
              value={existedUser?.userdetails?.pin || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div> */}

          <div>
            <label className="block font-medium mb-1">Fayda (FAN Number)</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="fyda"
              value={existedUser?.userdetails?.fyda || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          {/* <div>
            <label className="block font-medium mb-1">FAN Card Number</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="pan"
              value={existedUser?.userdetails?.pan?.toUpperCase() || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div> */}

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <div className="flex space-x-4 mt-1">
              {["M", "F"].map((g) => (
                <label key={g} className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={existedUser?.userdetails?.gender === g}
                    onChange={handleAlreadyExistedDetails}
                    className="form-radio"
                  />
                  <span>
                    {g === "M" ? "Male" : g === "F" ? "Female" : ""}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="tel"
              name="mobile"
              value={existedUser?.userdetails?.mobile || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              type="date"
              name="dateOfBirth"
              value={existedUser?.userdetails?.dateOfBirth || ""}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
};

export default Profile;
