import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-12 md:px-20 text-gray-800"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">About GadgetZone</h1>
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-teal-600">GadgetZone</span>, your one-stop destination for the latest and greatest in electronic gadgets and accessories. Our mission is to bring you cutting-edge technology with a seamless shopping experience.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto mt-10 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">Who We Are</h2>
          <p className="text-gray-700">
            GadgetZone is a trusted online marketplace specializing in high-quality tech products, including smartphones, laptops, wearables, and home gadgets. We partner with top brands to offer you the best deals.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Curated selection of top-rated gadgets</li>
            <li>Secure and easy checkout process</li>
            <li>Fast and reliable shipping</li>
            <li>Excellent customer support</li>
            <li>Hassle-free returns and warranty services</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
