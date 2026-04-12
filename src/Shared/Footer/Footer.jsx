import React, { useState } from 'react';
import { MapPin, Mail, Phone, ArrowUpRight, ArrowUp, Send } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSubscribed(false);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      await axiosPublic.post("/contactCollection", {
        name: "Newsletter Subscriber",
        email: email,
        message: "Newsletter subscription request from footer"
      });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      setError("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="bg-[#0A3D2A] text-gray-300 pt-16 pb-8 border-t-8 border-green-700 mt-auto font-['Montserrat']">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center rounded-tr-none shadow-[2px_2px_10px_rgba(220,38,38,0.5)]">
                <span className="font-bold text-white text-xl">R</span>
              </div>
              <span className="font-bold text-3xl text-white tracking-tight">Redleaf<span className="text-red-500">-BD</span></span>
            </div>
            <p className="text-sm leading-relaxed text-green-100">
              Redleaf-BD is Bangladesh's most trusted online grocery delivery platform. We bring organic, fresh, and handpicked daily necessities right to your door.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center hover:bg-red-500 hover:-translate-y-1 text-white transition-all duration-300"><FaFacebook size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center hover:bg-red-500 hover:-translate-y-1 text-white transition-all duration-300"><FaTwitter size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center hover:bg-red-500 hover:-translate-y-1 text-white transition-all duration-300"><FaInstagram size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center hover:bg-red-500 hover:-translate-y-1 text-white transition-all duration-300"><FaYoutube size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-red-500 after:rounded-full">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li><Link to="/about" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> About Us</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Terms & Conditions</Link></li>
              <li><Link to="/return" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Return Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-red-500 after:rounded-full">Top Categories</h4>
            <ul className="flex flex-col gap-3 text-sm font-medium">
               <li><a href="#" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Pure Honey</a></li>
               <li><a href="#" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Premium Rice & Grains</a></li>
               <li><a href="#" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Mustard Oil</a></li>
               <li><a href="#" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Organic Spices</a></li>
               <li><a href="#" className="hover:text-red-400 transition-colors flex items-center gap-1 group"><ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" /> Fresh Meat & Poultry</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-lg mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-red-500 after:rounded-full">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm mb-6">
              <li className="flex items-start gap-3 group">
                <MapPin className="text-red-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <span>123 Green Valley Road, Block-B, Banani, Dhaka-1213</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="text-red-500 shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="text-red-500 shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <span>support@redleafbd.com</span>
              </li>
            </ul>

            {/* Newsletter Integration */}
            <div className="bg-green-900/40 p-4 rounded-xl border border-green-800 mt-auto">
              <h5 className="text-sm font-semibold text-white mb-2">Subscribe to Newsletter</h5>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  disabled={subscribed}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2.5 bg-white/10 border border-green-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition text-sm disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {error && <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>}
              {subscribed && <p className="text-green-400 text-xs mt-2 font-medium">✨ Successfully subscribed!</p>}
            </div>
          </div>

        </div>

        {/* Apps & Bottom Bar */}
        <div className="pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-green-400">
          <div className="text-center md:text-left">
             <p className="mb-2 font-medium">© {new Date().getFullYear()} Redleaf-BD. All rights reserved.</p>
             <p className="flex justify-center md:justify-start items-center gap-1">Secure Payments via <span className="font-bold text-white">SSLCommerz</span></p>
          </div>
          
          {/* Apps Layout */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs text-green-200 mb-2 font-semibold">Download our App</p>
            <div className="flex gap-2">
              <div className="bg-gray-900 border border-gray-700 w-28 h-8 rounded shrink-0 flex items-center justify-center text-xs opacity-80 cursor-pointer hover:opacity-100 hover:-translate-y-0.5 transition-all">Google Play</div>
              <div className="bg-gray-900 border border-gray-700 w-28 h-8 rounded shrink-0 flex items-center justify-center text-xs opacity-80 cursor-pointer hover:opacity-100 hover:-translate-y-0.5 transition-all">App Store</div>
            </div>
          </div>

          {/* Quick Actions Scroll */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-800/30 hover:bg-green-800/60 rounded-full text-white transition-all shadow-sm"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;