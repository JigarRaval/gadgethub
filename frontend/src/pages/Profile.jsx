import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiEdit, FiSave, FiLogOut, FiCamera, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";

const Profile = () => {
  // Dummy User Data (Replace with API call later)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, New York, NY",
    birthdate: "1990-01-01",
    role: "Customer",
    profileImage: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-200 via-white to-gray-200 min-h-screen py-10 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-xl text-center relative border border-gray-300"
        >
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={isEditing ? editedUser.profileImage : user.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500 shadow-lg"
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
                <FiCamera className="text-gray-700" />
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">My Profile</h1>

          {/* User Info */}
          <div className="mt-6 space-y-4 text-left">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="border p-2 rounded w-full"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="border p-2 rounded w-full"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                  className="border p-2 rounded w-full"
                  placeholder="Phone Number"
                />
                <input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                  className="border p-2 rounded w-full"
                  placeholder="Address"
                />
                <input
                  type="date"
                  value={editedUser.birthdate}
                  onChange={(e) => setEditedUser({ ...editedUser, birthdate: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <select
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                  className="border p-2 rounded w-full"
                >
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold"><FiUser className="inline-block mr-2" /> {user.name}</h2>
                <p className="text-gray-600"><FiEdit className="inline-block mr-2" /> {user.email}</p>
                <p className="text-gray-600"><FiPhone className="inline-block mr-2" /> {user.phone}</p>
                <p className="text-gray-600"><FiMapPin className="inline-block mr-2" /> {user.address}</p>
                <p className="text-gray-600"><FiCalendar className="inline-block mr-2" /> {user.birthdate}</p>
                <p className="text-blue-600 font-bold">Role: {user.role}</p>
              </div>
            )}
          </div>

          {/* Edit & Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className={`mt-4 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-transform ${
              isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? <FiSave className="inline-block mr-2" /> : <FiEdit className="inline-block mr-2" />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </motion.button>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full w-full font-semibold shadow-lg transition-transform flex items-center justify-center"
        >
          <FiLogOut className="mr-2" /> Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
