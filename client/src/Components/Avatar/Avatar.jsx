import React, { useEffect, useState } from "react";
import axios from "../Utills/AxiosWithJWT.jsx";
import noFillPng from "../../assets/images/nofillpng.png";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext.jsx";

const Avatar = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const userId = sessionStorage.getItem("userId");
  const { BASE_URL } = useBankingSystem();

  const [src, setSrc] = useState();
  const [image, setImage] = useState();

  const getUserImage = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/api/v1/user/image/${userId}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([resp.data], { type: resp.headers["content-type"] });
      const objectUrl = URL.createObjectURL(blob);
      setSrc(objectUrl);
    } catch (err) {
      console.error("Error fetching user image", err);
    }
  };

  useEffect(() => {
    getUserImage();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleImageUpload = async () => {
    if (!image) return toast.error("Please select an image first!");
    const formData = new FormData();
    formData.append("image", image);
    try {
      const resp = await axios.post(
        `${BASE_URL}/api/v1/user/image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resp.status === 201) {
        getUserImage();
        toast.success("Image uploaded!");
      }
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed, try again!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        <div className="flex justify-center items-center">
          {/* Profile Photo Section */}
          <div className="flex justify-center mb-6 relative w-32 h-32 group">
            <img
              src={src || noFillPng}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />

            {/* Semi-circle camera overlay */}
            <label className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-full overflow-hidden flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-4.553a2 2 0 112.828 2.828L17.828 12M16 21v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* Upload button */}
        <div className="flex justify-center">
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                onClick={handleImageUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
