import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../services/orderAPI";
import { motion } from "framer-motion";
import { 
  FiClipboard, 
  FiCheckCircle, 
  FiXCircle, 
  FiTruck,
  FiDollarSign,
  FiUsers,
  FiPackage 
} from "react-icons/fi";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/"); // Redirect if not an admin
    } else {
      const fetchData = async () => {
        try {
          const data = await getOrders();
          setOrders(data);
          
          // Calculate statistics
          const revenue = data.reduce((sum, order) => sum + order.totalAmount, 0);
          const pending = data.filter(order => order.status !== "Delivered").length;
          const completed = data.filter(order => order.status === "Delivered").length;
          
          setStats({
            totalRevenue: revenue,
            pendingOrders: pending,
            completedOrders: completed
          });
        } catch (error) {
          toast.error("Failed to fetch orders");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user, navigate]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedOrder = await updateOrderStatus(id, status);
      if (updatedOrder) {
        setOrders(orders.map((order) => 
          order._id === id ? updatedOrder : order
        ));
        toast.success(`Order status updated to ${status}`);
        
        // Update stats if needed
        if (status === "Delivered") {
          setStats(prev => ({
            ...prev,
            pendingOrders: prev.pendingOrders - 1,
            completedOrders: prev.completedOrders + 1
          }));
        }
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 bg-blue-100 rounded-full">
              <FiDollarSign className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-600">Total Revenue</h2>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-3 bg-green-100 rounded-full">
              <FiPackage className="text-green-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiTruck className="text-yellow-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-600">Pending Orders</h2>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="p-3 bg-purple-100 rounded-full">
              <FiCheckCircle className="text-purple-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-600">Completed Orders</h2>
              <p className="text-2xl font-bold">{stats.completedOrders}</p>
            </div>
          </motion.div>
        </div>

        {/* Order Management Section */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <motion.tr
                    key={order._id}
                    className="hover:bg-gray-50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.user.name || order.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <select
                          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          onClick={() => navigate(`/admin/orders/${order._id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;