import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Footer";
import { AddProducts } from "./pages/AddProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Card from "./pages/Card";
import WishlistPage from "./pages/WishlistPage ";
import FAQPage from "./pages/Faq";
import ProductCard from "./components/ProductCard";
import VendorRegister from "./pages/VendorRegister";
import VendorDashboard from "./pages/VendorDashboard";
import VendorLogin from "./pages/VendorLogin";



const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <PageWrapper>
              <ProductList />
            </PageWrapper>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PageWrapper>
              <ProductDetails />
            </PageWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <PageWrapper>
              {" "}
              <Cart />
            </PageWrapper>
          }
        />
        <Route
          path="/card"
          element={
            <PageWrapper>
              {" "}
              <Card />
            </PageWrapper>
          }
        />
        <Route
          path="/orders"
          element={
            <PageWrapper>
              <Orders />
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper>
              <Profile />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />
        <Route
          path="/addproduct"
          element={
            <PageWrapper>
              <AddProducts />
            </PageWrapper>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageWrapper>
              {" "}
              <WishlistPage />
            </PageWrapper>
          }
        />
        <Route
          path="/faq"
          element={
            <PageWrapper>
              <FAQPage />
            </PageWrapper>
          }
        />
        {/* <Route 
          path="/vendor/dashboard" 
          element={
            <ProtectedRoute vendorOnly>
              <PageWrapper><VendorDashboard/></PageWrapper>
            </ProtectedRoute>
          } 
        /> */}

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Checkout />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/login"
          element={
            <ProtectedRoute>
              <VendorLogin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/register"
          element={
            <ProtectedRoute>
              <VendorRegister />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AnimatedRoutes />
        <Footer/>
        

      </Router>

    </AuthProvider>
  );
}

export default App;
