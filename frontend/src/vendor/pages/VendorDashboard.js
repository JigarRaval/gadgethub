// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   FiPackage, FiDollarSign, FiTruck, FiUser 
// } from 'react-icons/fi';
// import StatsCard from '../components/StatsCard';
// import VendorNavbar from '../components/VendorNavbar';
// import { getVendorStats } from '../../services/vendorAPI';

// const VendorDashboard = () => {
//   const [stats, setStats] = useState({
//     products: 0,
//     orders: 0,
//     earnings: 0,
//     pendingOrders: 0
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const data = await getVendorStats();
//         setStats(data);
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <VendorNavbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Vendor Dashboard</h1>
        
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           <StatsCard 
//             icon={<FiPackage className="text-blue-500" />}
//             title="Total Products"
//             value={stats.products}
//             change="+5 this month"
//           />
//           <StatsCard 
//             icon={<FiDollarSign className="text-green-500" />}
//             title="Total Earnings"
//             value={`$${stats.earnings.toFixed(2)}`}
//             change="+12% from last month"
//           />
//           <StatsCard 
//             icon={<FiTruck className="text-orange-500" />}
//             title="Total Orders"
//             value={stats.orders}
//             change="+8 new orders"
//           />
//           <StatsCard 
//             icon={<FiUser className="text-purple-500" />}
//             title="Pending Orders"
//             value={stats.pendingOrders}
//             change="3 to fulfill"
//           />
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 hover:shadow-lg transition"
//             onClick={() => navigate('/vendor/products/new')}
//           >
//             <div className="bg-blue-100 p-3 rounded-full">
//               <FiPackage className="text-blue-600 text-xl" />
//             </div>
//             <span className="text-lg font-medium">Add New Product</span>
//           </motion.button>
          
//           {/* Other action buttons... */}
//         </div>

//         {/* Recent Orders Preview */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
//           {/* Orders list component */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDashboard;