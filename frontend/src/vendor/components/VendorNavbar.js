// import { Link, useNavigate } from 'react-router-dom';
// import { FiHome, FiBox, FiDollarSign, FiTruck, FiSettings, FiLogOut } from 'react-icons/fi';
// import { useAuth } from '../context/AuthContext';

// const VendorNavbar = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const navItems = [
//     { icon: <FiHome />, label: 'Dashboard', path: '/vendor/dashboard' },
//     { icon: <FiBox />, label: 'Products', path: '/vendor/products' },
//     { icon: <FiTruck />, label: 'Orders', path: '/vendor/orders' },
//     { icon: <FiDollarSign />, label: 'Earnings', path: '/vendor/earnings' },
//     { icon: <FiSettings />, label: 'Settings', path: '/vendor/settings' },
//   ];

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/vendor/dashboard" className="text-xl font-bold text-gray-800">
//               Vendor Panel
//             </Link>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
//           </div>
          
//           <div className="flex items-center">
//             <button
//               onClick={handleLogout}
//               className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
//             >
//               <FiLogOut className="mr-1" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default VendorNavbar;

