import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, User, Users, Home, LogOut, Shield, Eye,
  Package, ShoppingBag, LayoutDashboard, ChevronRight, History, Leaf, PackagePlus
} from "lucide-react";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect from /dashboard root
  useEffect(() => {
    if (location.pathname === "/dashboard" && !isAdminLoading && user) {
      navigate(isAdmin ? "/dashboard/admin-overview" : "/dashboard/profile", { replace: true });
    }
  }, [isAdmin, isAdminLoading, user, navigate, location.pathname]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setSidebarOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A3D2A",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
    }).then((r) => {
      if (r.isConfirmed) {
        logOut().then(() => {
          Swal.fire({ icon: "success", title: "Logged out", showConfirmButton: false, timer: 1500 });
          navigate("/");
        });
      }
    });
  };

  if (isAdminLoading) return <Loading />;

  const adminNavItems = [
    { to: "/dashboard/admin-overview",  icon: LayoutDashboard, label: "Overview"         },
    { to: "/dashboard/add-product",     icon: PackagePlus,     label: "Add Product"      },
    { to: "/dashboard/manage-products", icon: Package,         label: "Manage Products"  },
    { to: "/dashboard/manage-users",    icon: Users,           label: "Manage Users"     },
    { to: "/dashboard/manage-payments", icon: ShoppingBag,     label: "Manage Orders"    },
    { to: "/dashboard/showContact",     icon: Eye,             label: "Contact Messages" },
  ];

  const userNavItems = [
    { to: "/dashboard/profile",      icon: User,        label: "My Profile"   },
    { to: "/dashboard/my-bookings",  icon: ShoppingBag, label: "My Orders"    },
    { to: "/dashboard/payment-history", icon: History,  label: "Order History"},
  ];

  const commonNavItems = [
    { to: "/", icon: Home, label: "Back to Store" },
  ];

  const navItems = isAdmin ? [...adminNavItems, ...commonNavItems] : [...userNavItems, ...commonNavItems];

  const renderLink = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
          isActive
            ? "bg-[#0A3D2A] text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <item.icon className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm font-semibold truncate">{item.label}</span>
      </div>
      <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
    </NavLink>
  );

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row w-full h-full overflow-hidden bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md shadow-sm z-50 flex items-center justify-between px-4 border-b border-gray-100">
        <button
          onClick={() => setSidebarOpen(s => !s)}
          className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-700"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0A3D2A] rounded-lg flex items-center justify-center">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-base">
            Redleaf<span className="text-red-600">-BD</span>
          </span>
        </div>
        <div className="w-9" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 h-full w-72 bg-white border-r border-gray-100 shadow-xl transition-transform duration-300 ease-in-out z-40 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A3D2A] rounded-xl flex items-center justify-center shadow-md">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg leading-none">
                Redleaf<span className="text-red-600">-BD</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">{isAdmin ? "Admin Panel" : "Customer Dashboard"}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {isAdmin && (
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Admin</p>
          )}
          {isAdmin && adminNavItems.map(renderLink)}

          {!isAdmin && (
            <>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 mt-2">Account</p>
              {userNavItems.map(renderLink)}
            </>
          )}

          <div className="pt-3 mt-3 border-t border-gray-100">
            {commonNavItems.map(renderLink)}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName||'U')}&background=0A3D2A&color=fff&size=64`}
              alt={user?.displayName || "User"}
              className="w-10 h-10 rounded-xl object-cover border-2 border-[#0A3D2A]/20 flex-shrink-0"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName||'U')}&background=0A3D2A&color=fff&size=64`;
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{user?.displayName || "User"}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            {isAdmin && (
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0" title="Admin">
                <Shield className="h-3.5 w-3.5 text-white" />
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-md"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative w-full h-full overflow-hidden bg-gray-50 pt-14 lg:pt-0">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="min-h-full w-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Dashboard;