import React, { useContext } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import useCart from '../../hooks/useCart';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate('/');
    });
  };

  const totalCartItems = cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full shadow-md flex flex-col">
      {/* ── Top Main Green Header ── */}
      <div className="w-full bg-[#0A3D2A] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button className="md:hidden p-1 text-white mr-2">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-2 md:mr-4">
              <div className="w-8 h-8 rounded-full bg-red-600 outline-2 outline-white flex items-center justify-center rounded-tr-none shadow-lg">
                <span className="font-bold text-white text-lg leading-none">R</span>
              </div>
              <span className="font-bold text-2xl tracking-tight hidden sm:block">Redleaf<span className="text-red-500">-BD</span></span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <div className="w-full relative group">
              <input 
                type="text" 
                placeholder="পণ্য খুঁজুন..." 
                className="w-full py-2.5 pl-4 pr-12 rounded-lg text-gray-800 bg-white border-2 border-transparent focus:border-red-500 focus:outline-none shadow-sm transition-all text-sm font-medium"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-[#0A3D2A] hover:bg-green-50 rounded-r-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-6">
            {user ? (
              <div className="relative group/user cursor-pointer">
                <div className="flex items-center gap-2 hover:text-red-400 transition-colors">
                   <div className="p-1 bg-green-800/50 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center w-9 h-9">
                     {user?.photoURL ? (
                       <img src={user.photoURL} alt="profile" className="w-full h-full rounded-full object-cover" />
                     ) : (
                       <User className="w-5 h-5 text-white" />
                     )}
                   </div>
                   <span className="hidden lg:block text-sm font-medium overflow-hidden text-ellipsis max-w-[100px] whitespace-nowrap">
                     {user.displayName || 'Account'}
                   </span>
                </div>
                {/* Dropdown Menu */}
                 <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200 z-50">
                    <div className="py-1">
                       <div className="px-4 py-2 border-b border-gray-100 mb-1">
                         <p className="text-sm font-medium text-gray-900 truncate">{user.displayName}</p>
                         <p className="text-xs text-gray-500 truncate">{user.email}</p>
                       </div>
                       <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0A3D2A]">Dashboard</Link>
                       <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-[#0A3D2A]">Profile</Link>
                       <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1">Logout</button>
                    </div>
                 </div>
              </div>
            ) : (
               <Link to="/login" className="flex items-center gap-2 hover:text-red-400 transition-colors">
                 <div className="p-2 bg-green-800/50 rounded-full hover:bg-green-700 transition-colors">
                   <User className="w-5 h-5 text-white" />
                 </div>
                 <span className="hidden lg:block text-sm font-medium">Login/Register</span>
               </Link>
            )}

            <Link to="/dashboard/my-bookings" className="flex items-center gap-2 hover:text-red-400 transition-colors relative group">
              <div className="p-2 bg-green-800/50 rounded-full group-hover:bg-green-700 transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#0A3D2A]">
                  {totalCartItems}
                </span>
              </div>
              <span className="hidden lg:block text-sm font-medium">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on small screens */}
        <div className="md:hidden px-4 pb-3">
          <div className="w-full relative">
            <input 
              type="text" 
              placeholder="পণ্য খুঁজুন..." 
              className="w-full py-2 pl-4 pr-10 rounded-lg text-gray-800 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <button className="absolute right-0 top-0 h-full px-3 text-gray-500">
               <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Secondary White Header ── */}
      <div className="w-full bg-white hidden md:block">
        <div className="container mx-auto px-4 flex items-center">
          {/* Shop By Category Button */}
          <div className="flex items-center gap-2 px-5 py-3.5 hover:bg-gray-50 cursor-pointer border-x border-gray-100 transition-colors">
            <Menu className="w-5 h-5 text-gray-800" />
            <span className="font-extrabold text-gray-900 uppercase text-xs tracking-wider">Shop By Category</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 ml-8 font-semibold text-gray-800 text-sm">
            <Link to="/offers" className="flex items-center gap-1 hover:text-[#0A3D2A] transition-colors relative group">
              Offers
              <span className="absolute -top-2.5 -right-3.5 bg-red-600 text-white text-[9px] font-black w-4 h-4 flex flex-col justify-center items-center rounded-full ring-2 ring-white">2</span>
            </Link>
            <Link to="/products" className="hover:text-[#0A3D2A] transition-colors">Products</Link>
            <Link to="/corporate" className="hover:text-[#0A3D2A] transition-colors">Corporate</Link>
            <Link to="/export" className="hover:text-[#0A3D2A] transition-colors">Export</Link>
            <Link to="/outlets" className="hover:text-[#0A3D2A] transition-colors">Outlets</Link>
            <Link to="/impact" className="hover:text-[#0A3D2A] transition-colors">Impact Stories</Link>
            <Link to="/halal-investment" className="hover:text-[#0A3D2A] transition-colors">Halal Investment</Link>
            <Link to="/blog" className="hover:text-[#0A3D2A] transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-[#0A3D2A] transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-[#0A3D2A] transition-colors">Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;