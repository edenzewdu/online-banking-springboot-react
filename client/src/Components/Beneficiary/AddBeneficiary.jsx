import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useBankingSystem } from '../Context/UserContext';
import SyncLoader from "react-spinners/SyncLoader";

const ContactUs = () => {
  const navigateTo = useNavigate();
  const { BASE_URL } = useBankingSystem();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!email || !subject || !body) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/user/mail`, { email, subject, body });
      if (resp.status === 200) {
        toast.success("Mail sent successfully!");
        setEmail(""); setSubject(""); setBody("");
      } else {
        toast.error("Error sending mail!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error, try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center items-center h-[100vh]'>
          <SyncLoader
            margin={10}
            size={20}
            speedMultiplier={1}
            color={"#5145CD"}
            loading={isLoading}
          />
        </div>
      ) : (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
          <form
            onSubmit={handleSendMail}
            className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col gap-6"
          >
            <button
              type="button"
              onClick={() => navigateTo("/")}
              className="absolute top-4 left-4 text-gray-300 text-xl hover:text-red-500 transition"
            >
              ← Back
            </button>

            <h2 className="text-3xl font-bold text-center mb-4 text-white">Contact Us</h2>
            <p className="text-gray-400 text-center mb-6">
              Got a technical issue or need help? Let us know.
            </p>

            <label className="flex flex-col w-full">
              <span className="mb-2 font-semibold text-gray-200">Your Email</span>
              <input
                type="email"
                placeholder="name@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="mb-2 font-semibold text-gray-200">Subject</span>
              <input
                type="text"
                placeholder="Enter subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="mb-2 font-semibold text-gray-200">Message</span>
              <textarea
                rows={6}
                placeholder="Enter your message..."
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 font-semibold transition-colors duration-300"
              >
                Send Message
              </button>
            </div>

          </form>
        </section>
      )}
    </div>
  );
};

export default ContactUs;
