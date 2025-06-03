import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    event.preventDefault(); // Added to prevent potential implicit form submission
    const file = event.target.files[0];
    if (file) {
      // Ensure a file is selected
      setLoading(true); // Indicate loading for image upload
      try {
        const data = await uploadImageToCloudinary(file);

        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
        toast.success("Photo uploaded successfully!"); // Optional: give feedback for photo upload
      } catch (error) {
        toast.error("Failed to upload photo.");
        console.error("Photo upload error:", error);
      } finally {
        setLoading(false); // End loading for image upload
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading for form submission

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Parse JSON response here

      if (!res.ok) {
        // If response is not OK (e.g., 4xx or 5xx status)
        throw new Error(data.message || "Registration failed"); // Use message from backend or a generic one
      }

      // If registration is successful
      setLoading(false);
      toast.success(data.message || "Registration successful!"); // Use message from backend or a generic one

      // Introduce a small delay before navigating
      setTimeout(() => {
        navigate("/users/profile/me");
      }, 1500); // Delay for 1.5 seconds (adjust as needed)
    } catch (err) {
      // Handle errors (network issues, backend errors, etc.)
      toast.error(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };
  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            area-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label
            htmlFor="gender-select" // Added htmlFor for accessibility
            className="text-headingColor font-bold text-[16px] leading-7"
          >
            Gender
            <select
              id="gender-select" // Added id for htmlFor
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="User Avatar" // Added descriptive alt text
                className="w-full rounded-full object-cover" // Added object-cover for better image fitting
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png, .jpeg" // Added .jpeg for broader compatibility
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload photo"}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading} // Simplified disabled condition
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
          >
            {loading ? (
              <HashLoader size={25} color="#ffffff" className="mx-auto" /> // Centered loader
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
