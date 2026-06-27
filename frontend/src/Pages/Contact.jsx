import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOwnerSocials } from "../Redux/OwnerSocialsSlice";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";


const Contact = () => {
  const { user } = useContext(AuthContext);  
  const [formData, setFormData] = useState({
    name: user.name ||"",
    email: user.email || "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const ownerSocialsData = useSelector((state) => state.ownerSocials);
  const socials = ownerSocialsData?.socials || {};
  const contacts = ownerSocialsData?.contacts || {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log('Submitting form data:', formData);
    const response = await axios.post("/api/customerSupport/tickets", formData)
    console.log('Response:', response); // Log the response object

    if (response.status >= 200 && response.status < 300) {
      console.log('Form submitted successfully');
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      console.error('Error submitting form:', response.data);
    }
  } catch (error) {
    console.error('Error submitting form:', error.response?.data || error);
  }
};
  useEffect(() => {
    window.scrollTo(0, 0);
  
    const LoadOwnerSocials = async () => {
      try {
        const resp = await fetch(`/api/customerSupport`);
        if (!resp.ok) {
          throw new Error(`Server responded with ${resp.status}`);
        }
        const data = await resp.json();
        console.log("Owner Socials:", data);
        dispatch(setOwnerSocials(data));
      } catch (fetchError) {
        console.error("Error fetching owner socials:", fetchError);
      }
    };

    LoadOwnerSocials();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-50 to-white px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Reach out with any questions or feedback.
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-rose-900 mb-6">Send Us a Message</h2>
            {submitted && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-rose-900 mb-6">Contact Information</h2>

            {/* Direct Contact */}
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="text-rose-500 text-2xl mt-1">✉️</div>
                <div>
                  <h3 className="font-bold text-rose-900 mb-1">Email</h3>
                  <a href={`mailto:${contacts?.email || 'support@scarletrose.com'}`} className="text-gray-700 hover:text-rose-600 transition">
                    {contacts?.email || 'support@scarletrose.com'}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-rose-500 text-2xl mt-1">📞</div>
                <div>
                  <h3 className="font-bold text-rose-900 mb-1">Phone</h3>
                  <a href={`tel:${contacts?.phone || '+1234567890'}`} className="text-gray-700 hover:text-rose-600 transition">
                    {contacts?.phone || '+1 (234) 567-890'}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-rose-500 text-2xl mt-1">📍</div>
                <div>
                  <h3 className="font-bold text-rose-900 mb-1">Address</h3>
                  <p className="text-gray-700">
                    123 Rose Avenue<br />
                    Flower City, FC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-rose-500 text-2xl mt-1">🕒</div>
                <div>
                  <h3 className="font-bold text-rose-900 mb-1">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-rose-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-rose-900 mb-4">Connect With Us</h3>
              <p className="text-gray-700 mb-4">
                Follow us on social media for inspiration, updates, and exclusive offers.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href={socials?.instagram || "https://instagram.com/scarletrose"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-rose-500 hover:text-white text-rose-500 px-4 py-2 rounded-lg border border-rose-500 transition duration-300 font-semibold"
                >
                  <span>📸</span> Instagram
                </a>
                <a
                  href={socials?.facebook || "https://facebook.com/scarletrose"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-rose-500 hover:text-white text-rose-500 px-4 py-2 rounded-lg border border-rose-500 transition duration-300 font-semibold"
                >
                  <span>f</span> Facebook
                </a>
                <a
                  href={socials?.twitter || "https://twitter.com/scarletrose"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-rose-500 hover:text-white text-rose-500 px-4 py-2 rounded-lg border border-rose-500 transition duration-300 font-semibold"
                >
                  <span>𝕏</span> Twitter
                </a>
                <a
                  href={socials?.pinterest || "https://pinterest.com/scarletrose"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-rose-500 hover:text-white text-rose-500 px-4 py-2 rounded-lg border border-rose-500 transition duration-300 font-semibold"
                >
                  <span>📌</span> Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-rose-50 px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-rose-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-rose-900 mb-2">
                How long does shipping take?
              </h3>
              <p className="text-gray-700">
                Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-rose-900 mb-2">
                What's your return policy?
              </h3>
              <p className="text-gray-700">
                We offer 30-day returns for items in original condition. Contact our support team to initiate a return.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-rose-900 mb-2">
                Do you offer custom orders?
              </h3>
              <p className="text-gray-700">
                Yes! We love creating custom pieces. Please reach out to discuss your specific requirements.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-rose-900 mb-2">
                Are your products eco-friendly?
              </h3>
              <p className="text-gray-700">
                We're committed to sustainability and use eco-friendly materials whenever possible.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-rose-900 mb-2">
                Do you ship internationally?
              </h3>
              <p className="text-gray-700">
                Yes, we ship to most countries. Shipping costs and times vary by location. Please check at checkout.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-rose-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-700">
                We accept credit cards, debit cards, digital wallets, and more. All payments are secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-rose-900 mb-6 text-center">Find Us</h2>
        <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Embed Google Map or other map service here</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
