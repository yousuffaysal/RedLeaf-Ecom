

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trash2, MessageSquare, Mail, User, Calendar, Eye, X, Crown,
  Search, RefreshCcw, Loader2, Clock, Phone, MapPin, FileText
} from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ShowContactData = () => {
  const axiosSecure = useAxiosSecure();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Fetch contact data on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosSecure.get('/contactCollection');
        setContacts(response.data);
        setFilteredContacts(response.data);
        setIsLoading(false);
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching contacts:', error);
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        let errorMessage = 'Failed to fetch contact data';

        if (status === 401) {
          errorMessage = 'Authentication required. Please log in again.';
        } else if (status === 403) {
          errorMessage = 'Access denied. Admin privileges required to view contact data.';
        } else if (status === 404) {
          errorMessage = 'Contact endpoint not found. The server may not be fully deployed yet.';
        } else if (status === 503) {
          errorMessage = 'Database connection error. Please try again in a moment.';
        } else if (status === 500) {
          errorMessage = error.response?.data?.message || 'Server error. Please try again later.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);
        setIsLoading(false);
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc2626',
          background: "#FBF8F3",
          customClass: {
            title: "text-[#0A3D91] text-xl",
            content: "text-[#6B7280]",
          }
        });
      }
    };
    fetchContacts();
  }, [axiosSecure]);

  // Filter contacts based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  // Close mobile sidebar when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle delete contact
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the contact from ${name}. This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: "#FBF8F3",
      customClass: {
        title: "text-[#0A3D91] text-xl",
        content: "text-[#6B7280]",
      }
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/contactCollection/${id}`);
        const updatedContacts = contacts.filter((contact) => contact._id !== id);
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);
        Swal.fire({
          title: 'Deleted!',
          text: 'Contact has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          background: "#FBF8F3",
          customClass: {
            title: "text-[#0A3D91] text-xl",
            content: "text-[#6B7280]",
          }
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to delete contact.',
          icon: 'error',
          confirmButtonColor: '#dc2626',
          background: "#FBF8F3",
          customClass: {
            title: "text-[#0A3D91] text-xl",
            content: "text-[#6B7280]",
          }
        });
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-[#FBF8F3] rounded-3xl shadow-2xl border border-[#E5E0D5] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A3D91] to-[#08306B] p-4 sm:p-6 lg:p-8 relative">
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-[#D0A96A]" />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#D0A96A] rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 truncate">Contact Messages</h2>
              <p className="text-[#FDF6E9] text-sm sm:text-base lg:text-lg">View and manage contact form submissions</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search messages, names, or subjects..."
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-[#E5E0D5] focus:outline-none focus:ring-2 focus:ring-[#0A3D91] focus:border-[#0A3D91] bg-white text-[#0A3D91] text-sm sm:text-base"
              />
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#D0A96A] absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-[#E5E0D5] bg-white hover:bg-[#0A3D91]/5 text-[#0A3D91] flex items-center gap-2 font-semibold transition-colors text-sm sm:text-base whitespace-nowrap"
                title="Refresh"
              >
                <RefreshCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Email-style Layout */}
        <div className="flex flex-col lg:flex-row h-[500px] sm:h-[600px] lg:h-[600px] relative">
          {/* Mobile Header for Sidebar Toggle */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#E5E0D5] bg-white">
            <h3 className="text-lg font-semibold text-[#0A3D91] flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages ({filteredContacts.length})
            </h3>
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className="p-2 rounded-lg bg-[#0A3D91] text-white hover:bg-[#08306B] transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Overlay */}
          {showMobileSidebar && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setShowMobileSidebar(false)}
            />
          )}

          {/* Left Sidebar - Message List */}
          <div className={`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex w-full lg:w-1/3 border-r border-[#E5E0D5] bg-white flex-col absolute lg:relative z-20 lg:z-auto h-full lg:h-auto transform transition-transform duration-300 ease-in-out ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            {/* Message List Header - Hidden on mobile */}
            <div className="hidden lg:block p-4 border-b border-[#E5E0D5] bg-[#FDF6E9]">
              <h3 className="text-lg font-semibold text-[#0A3D91] flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages ({filteredContacts.length})
              </h3>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0A3D91] mx-auto mb-4" />
                    <p className="text-[#6B7280]">Loading messages...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <X className="h-8 w-8 text-[#B91C1C] mx-auto mb-4" />
                    <p className="text-[#B91C1C] font-semibold">{error}</p>
                  </div>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-[#0A3D91]/30 mx-auto mb-4" />
                    <p className="text-[#6B7280]">
                      {searchTerm ? 'No messages found' : 'No contact messages yet'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#E5E0D5]">
                  {filteredContacts.map((contact, idx) => (
                    <motion.div
                      key={contact._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      onClick={() => {
                        setSelectedContact(contact);
                        // On mobile, hide sidebar after selection
                        if (window.innerWidth < 1024) {
                          setShowMobileSidebar(false);
                        }
                      }}
                      className={`p-3 sm:p-4 cursor-pointer hover:bg-[#0A3D91]/5 active:bg-[#0A3D91]/10 transition-colors border-l-4 touch-manipulation ${selectedContact?._id === contact._id
                          ? 'border-l-[#0A3D91] bg-[#0A3D91]/5'
                          : 'border-l-transparent'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0A3D91]/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-[#0A3D91]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-[#0A3D91] truncate">
                              {contact.name}
                            </h4>
                            <span className="text-xs text-[#6B7280] flex-shrink-0 ml-2">
                              {formatDate(contact.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-[#6B7280] mb-1 truncate">
                            {contact.email}
                          </p>
                          <p className="text-sm font-medium text-[#0A3D91] mb-1 truncate">
                            {contact.subject}
                          </p>
                          <p className="text-xs text-[#6B7280] line-clamp-2">
                            {contact.message}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(contact._id, contact.name);
                            }}
                            className="p-1 text-[#B91C1C] hover:bg-[#B91C1C]/10 rounded transition-colors"
                            title="Delete Message"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Message Content */}
          <div className="flex-1 bg-white flex flex-col min-h-0">
            {selectedContact ? (
              <>
                {/* Message Header */}
                <div className="p-4 sm:p-6 border-b border-[#E5E0D5] bg-[#FDF6E9]">
                  {/* Mobile back button */}
                  <button
                    onClick={() => setShowMobileSidebar(true)}
                    className="lg:hidden mb-4 px-3 py-2 bg-[#0A3D91] text-white rounded-lg hover:bg-[#08306B] transition-colors flex items-center gap-2 text-sm font-semibold"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Back to Messages
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A3D91]/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-[#0A3D91]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0A3D91] mb-1 truncate">
                          {selectedContact.name}
                        </h3>
                        <p className="text-[#6B7280] mb-2 text-sm sm:text-base truncate">{selectedContact.email}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs sm:text-sm text-[#6B7280]">
                            {new Date(selectedContact.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2">
                      <button
                        onClick={() => {
                          window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`;
                        }}
                        className="px-3 sm:px-4 py-2 bg-[#0A3D91] text-white rounded-lg hover:bg-[#08306B] transition-colors flex items-center gap-2 text-sm font-semibold touch-manipulation"
                      >
                        <Mail className="h-4 w-4" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Message */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#0A3D91] mb-3 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </h4>
                      <div className="bg-[#FDF6E9] p-4 sm:p-6 rounded-2xl border border-[#E5E0D5]">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-[#6B7280] leading-relaxed whitespace-pre-wrap break-words">
                            {selectedContact.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 sm:h-16 sm:w-16 text-[#0A3D91]/30 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0A3D91] mb-2">
                    Select a message
                  </h3>
                  <p className="text-[#6B7280] text-sm sm:text-base">
                    Choose a message from the list to view its content
                  </p>
                  {/* Mobile back button */}
                  <button
                    onClick={() => setShowMobileSidebar(true)}
                    className="lg:hidden mt-4 px-4 py-2 bg-[#0A3D91] text-white rounded-lg hover:bg-[#08306B] transition-colors flex items-center gap-2 mx-auto"
                  >
                    <MessageSquare className="h-4 w-4" />
                    View Messages
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShowContactData;