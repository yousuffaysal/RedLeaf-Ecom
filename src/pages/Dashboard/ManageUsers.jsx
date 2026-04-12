





import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, Shield, Trash2, ArrowUpDown, ArrowUp, ArrowDown, 
  User, Mail, Calendar, MoreVertical, Eye, Edit, Crown, UserCheck
} from "lucide-react";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  // Fetch users
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users", searchQuery, currentPage, sortField, sortOrder, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { 
          search: searchQuery, 
          page: currentPage, 
          limit: usersPerPage,
          sort: sortField,
          order: sortOrder,
          role: filterRole
        },
      });
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0A3D91",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Yes, make admin",
      background: "#FBF8F3",
      customClass: {
        title: "text-[#0A3D91] text-xl",
        content: "text-[#6B7280]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now an admin`,
                showConfirmButton: false,
                timer: 1500,
                background: "#FBF8F3",
                customClass: {
                  title: "text-[#0A3D91] text-xl",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to make admin",
              text: error.message,
              background: "#FBF8F3",
              customClass: {
                title: "text-[#0A3D91] text-xl",
                content: "text-[#6B7280]",
              }
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A3D91",
      cancelButtonColor: "#B91C1C",
      confirmButtonText: "Yes, delete",
      background: "#FBF8F3",
      customClass: {
        title: "text-[#0A3D91] text-xl",
        content: "text-[#6B7280]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                icon: "success",
                title: "User Deleted",
                text: `${user.name} has been deleted successfully.`,
                background: "#FBF8F3",
                customClass: {
                  title: "text-[#0A3D91] text-xl",
                  content: "text-[#6B7280]",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to delete",
              text: error.message,
              background: "#FBF8F3",
              customClass: {
                title: "text-[#0A3D91] text-xl",
                content: "text-[#6B7280]",
              }
            });
          });
      }
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortOrder === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const SkeletonRow = () => (
    <div className="bg-[#FBF8F3] rounded-2xl shadow-lg p-6 animate-pulse border border-[#E5E0D5]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="w-12 h-12 bg-[#0A3D91]/10 rounded-xl"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-[#0A3D91]/10 rounded-lg w-1/4"></div>
          <div className="h-4 bg-[#0A3D91]/10 rounded-lg w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-[#0A3D91]/10 rounded-lg w-16"></div>
            <div className="h-6 bg-[#0A3D91]/10 rounded-lg w-20"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="h-10 bg-[#0A3D91]/10 rounded-xl w-full sm:w-28"></div>
          <div className="h-10 bg-[#0A3D91]/10 rounded-xl w-full sm:w-24"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center p-8 bg-[#FBF8F3] rounded-2xl shadow-lg border border-[#E5E0D5]">
          <div className="w-16 h-16 bg-[#B91C1C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-[#B91C1C]" />
          </div>
          <p className="text-[#0A3D91] text-lg font-semibold mb-2">Error Loading Users</p>
          <p className="text-[#6B7280]">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6E9] p-3 sm:p-4 lg:p-6 xl:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#FBF8F3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[#E5E0D5] shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#0A3D91] to-[#08306B] rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0A3D91] mb-1 sm:mb-2">Manage Users</h2>
                <p className="text-[#6B7280] text-sm sm:text-base lg:text-lg">Administrate user accounts and permissions</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="bg-[#0A3D91]/10 px-3 sm:px-4 py-2 rounded-xl border border-[#0A3D91]/20">
                <span className="text-[#0A3D91] font-semibold text-sm sm:text-base lg:text-lg">Total: {users.length}</span>
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-[#E5E0D5] text-[#0A3D91] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3D91] focus:border-[#0A3D91] bg-white shadow-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>

                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-[#FBF8F3] rounded-2xl p-4 sm:p-6 border border-[#E5E0D5] shadow-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-14 rounded-xl border border-[#E5E0D5] text-[#0A3D91] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0A3D91] focus:border-[#0A3D91] bg-white shadow-sm"
              />
              <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-[#D0A96A] h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>

        {/* Users List */}
        <motion.div
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
          ) : paginatedUsers.length === 0 ? (
            <div className="bg-[#FBF8F3] rounded-2xl p-8 sm:p-12 text-center border border-[#E5E0D5] shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0A3D91]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-[#0A3D91]" />
              </div>
              <p className="text-[#0A3D91] text-lg sm:text-xl font-semibold mb-2">No users found</p>
              <p className="text-[#6B7280] text-sm sm:text-base">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <AnimatePresence>
              {paginatedUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  className="bg-[#FBF8F3] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border border-[#E5E0D5] hover:border-[#D0A96A]/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0A3D91] to-[#08306B] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-lg">{index + 1 + (currentPage - 1) * usersPerPage}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0A3D91] truncate">{user.name}</h3>
                        {user.role === 'admin' && <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-[#D0A96A]" />}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="h-4 w-4 text-[#6B7280]" />
                        <p className="text-[#6B7280] truncate">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          user.role === 'admin' ? 'bg-[#0A3D91] text-white' :
                          user.role === 'teacher' ? 'bg-[#D0A96A] text-white' :
                          'bg-[#0A3D91]/10 text-[#0A3D91] border border-[#0A3D91]/20'
                        }`}>
                          {user.role === 'admin' ? <><Shield className="inline h-4 w-4 mr-1" />Admin</> :
                           user.role === 'teacher' ? <><UserCheck className="inline h-4 w-4 mr-1" />Teacher</> :
                           <><User className="inline h-4 w-4 mr-1" />User</>}
                        </span>
                        <span className="px-3 py-1 rounded-lg text-sm font-medium bg-[#D0A96A]/10 text-[#D0A96A] border border-[#D0A96A]/20">
                          {user.status || "Active"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="flex items-center px-4 py-3 bg-gradient-to-r from-[#0A3D91] to-[#08306B] text-white rounded-xl hover:from-[#08306B] hover:to-[#0A3D91] transition-all duration-300 text-sm font-semibold w-full sm:w-auto justify-center sm:justify-start shadow-md hover:shadow-lg"
                        >
                          <Shield className="mr-2 h-4 w-4" /> Make Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="flex items-center px-4 py-3 bg-gradient-to-r from-[#B91C1C] to-[#991B1B] text-white rounded-xl hover:from-[#991B1B] hover:to-[#B91C1C] transition-all duration-300 text-sm font-semibold w-full sm:w-auto justify-center sm:justify-start shadow-md hover:shadow-lg"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="bg-[#FBF8F3] rounded-2xl p-4 border border-[#E5E0D5] shadow-sm">
            <nav className="inline-flex rounded-xl shadow-sm -space-x-px">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-3 rounded-l-xl border border-[#E5E0D5] bg-white text-sm font-semibold text-[#0A3D91] hover:bg-[#0A3D91]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-3 border border-[#E5E0D5] text-sm font-semibold transition-colors ${
                    currentPage === page
                        ? "bg-[#0A3D91] text-white border-[#0A3D91]"
                        : "bg-white text-[#0A3D91] hover:bg-[#0A3D91]/5"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-3 rounded-r-xl border border-[#E5E0D5] bg-white text-sm font-semibold text-[#0A3D91] hover:bg-[#0A3D91]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;