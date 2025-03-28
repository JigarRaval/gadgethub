import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBox,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import vendorAPI from "../services/vendorAPI";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const vendorData = await vendorAPI.getVendorProfile();
        setVendor(vendorData);
      } catch (error) {
        setError(error.message || "Please login to continue");
        navigate("/vendor/login");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await vendorAPI.logoutVendor();
      navigate("/vendor/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-md hidden md:block"
      >
        <div className="p-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-gray-800"
          >
            {vendor?.companyName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-500"
          >
            Vendor Dashboard
          </motion.p>
        </div>

        <nav className="mt-6">
          <NavItem
            icon={<FiHome className="w-5 h-5" />}
            text="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={<FiBox className="w-5 h-5" />}
            text="Products"
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          />
          <NavItem
            icon={<FiDollarSign className="w-5 h-5" />}
            text="Orders"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
          <NavItem
            icon={<FiUsers className="w-5 h-5" />}
            text="Customers"
            active={activeTab === "customers"}
            onClick={() => setActiveTab("customers")}
          />
          <NavItem
            icon={<FiSettings className="w-5 h-5" />}
            text="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {activeTab === "dashboard" && "Dashboard Overview"}
            {activeTab === "products" && "Product Management"}
            {activeTab === "orders" && "Order Management"}
            {activeTab === "customers" && "Customer Insights"}
            {activeTab === "settings" && "Account Settings"}
          </h1>

          {activeTab === "dashboard" && <DashboardTab vendor={vendor} />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "settings" && <SettingsTab vendor={vendor} />}
        </motion.div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick }) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center w-full px-6 py-3 ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
    } transition-colors`}
  >
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </motion.button>
);

const DashboardTab = ({ vendor }) => {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      change: "+5 this month",
      icon: <FiBox className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Total Orders",
      value: "156",
      change: "+12 this month",
      icon: <FiDollarSign className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+8% this month",
      icon: <FiDollarSign className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full h-12 w-12 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500">You'll see your recent orders here</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Vendor Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Company Name" value={vendor?.companyName} />
          <InfoField label="Business Type" value={vendor?.businessType} />
          <InfoField label="Email" value={vendor?.email} />
          <InfoField
            label="Account Status"
            value={vendor?.approved ? "Active" : "Pending"}
          />
        </div>
      </motion.div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-gray-50 p-4 rounded-lg"
  >
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base text-gray-800 mt-1">{value}</p>
  </motion.div>
);

// Placeholder components for other tabs
const ProductsTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Add New Product
      </motion.button>
    </div>
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <p className="text-gray-500">Your products will appear here</p>
    </div>
  </motion.div>
);

const OrdersTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <p className="text-gray-500">Your orders will appear here</p>
    </div>
  </motion.div>
);

const CustomersTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Customer Insights
    </h2>
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <p className="text-gray-500">Customer analytics will appear here</p>
    </div>
  </motion.div>
);

const SettingsTab = ({ vendor }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Account Settings
    </h2>
    <div className="bg-gray-50 rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Name" value={vendor?.name} />
        <InfoField label="Email" value={vendor?.email} />
        <InfoField label="Company" value={vendor?.companyName} />
        <InfoField label="Business Type" value={vendor?.businessType} />
      </div>
    </div>
  </motion.div>
);

export default VendorDashboard;
