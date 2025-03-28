import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are securely processed through our encrypted payment gateway."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. We also offer expedited shipping options (2-day and overnight) for an additional fee. International shipping typically takes 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories. Some items like software, opened headphones, and personalized products may not be eligible for return. Please contact our support team for return authorization."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. You'll see the exact shipping costs at checkout based on your location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website and viewing your order history."
    },
    {
      question: "What warranty do your products come with?",
      answer: "Most products come with a 1-year manufacturer's warranty. Some premium products may have extended warranty options available for purchase. Warranty details are included with each product's documentation."
    },
    {
      question: "Can I cancel or modify my order after placing it?",
      answer: "You can request order modifications or cancellations within 1 hour of placing your order by contacting our customer support team. After this window, we cannot guarantee changes as orders enter our fulfillment process quickly."
    },
    {
      question: "Do you price match?",
      answer: "Yes! We offer price matching within 14 days of purchase if you find the same product at a lower price from an authorized retailer. Contact our support team with proof of the lower price to request a refund of the difference."
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-2"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-8"
        >
          Can't find what you're looking for? <Link to="/contact" className="text-blue-500 hover:underline">Contact our support team</Link>
        </motion.p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {item.question}
                </h3>
                <span className="text-blue-500">
                  {activeIndex === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </span>
              </button>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 md:px-6 pb-4 md:pb-6"
                >
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-4">Our customer support team is available 24/7 to assist you.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition"
            >
              Contact Support
            </Link>
            <a
              href="tel:+18005551234"
              className="bg-black bg-opacity-20 px-6 py-3 rounded-lg font-semibold text-center hover:bg-opacity-30 transition"
            >
              Call Now: (800) 555-1234
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;