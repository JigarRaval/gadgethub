import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";




const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API response
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-12 md:px-20 text-gray-800"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">Contact Us</h1>
        <p className="text-lg leading-relaxed">
          Have questions or need assistance? Our support team is here to help!
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Get in Touch</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Your Name" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
            required 
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Your Email" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
            required 
          />
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Your Message" 
            rows="5" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Customer Support</h2>
        <p>Email: <a href="mailto:support@gadgetzone.com" className="text-indigo-600 hover:underline">support@gadgetzone.com</a></p>
        <p>Phone: <span className="text-gray-700">+1 (800) 123-4567</span></p>
        <p>Address: 123 Tech Street, Silicon Valley,CA</p>
      </div>
    </motion.div>
  );
};

export default Contact;
