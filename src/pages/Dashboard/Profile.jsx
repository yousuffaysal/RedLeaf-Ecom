import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, Edit3, Check, X, Camera } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) return;
    setSaving(true);
    try {
      await updateUserProfile(displayName.trim(), photoURL.trim() || user?.photoURL);
      setEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        showConfirmButton: false,
        timer: 1800,
        background: '#fff',
      });
    } catch {
      Swal.fire({ icon: 'error', title: 'Update Failed', confirmButtonColor: '#0A3D2A' });
    } finally {
      setSaving(false);
    }
  };

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-BD', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#0A3D2A] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </span>
            My Profile
          </h2>
          <p className="text-gray-500 mt-1 ml-13">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-[#0A3D2A] via-[#116638] to-[#0A3D2A]" />

          {/* Avatar & Name */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-6">
              <div className="relative w-fit">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=0A3D2A&color=fff&size=128`}
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-lg object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=0A3D2A&color=fff&size=128`;
                  }}
                />
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow">
                    <Shield className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
                    >
                      <X className="h-4 w-4" /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A3D2A] text-white text-sm font-medium hover:bg-green-800 transition disabled:opacity-60"
                    >
                      <Check className="h-4 w-4" />
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setDisplayName(user?.displayName || '');
                      setPhotoURL(user?.photoURL || '');
                      setEditing(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Name & Role */}
            {editing ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2A] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Photo URL</label>
                  <div className="flex gap-2 items-center">
                    <Camera className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {user?.displayName || 'User'}
                </h3>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold">
                    <Shield className="h-3 w-3" /> Admin
                  </span>
                )}
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#0A3D2A]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-[#0A3D2A]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Role</p>
                  <p className="text-sm font-medium text-gray-800">{isAdmin ? 'Administrator' : 'Customer'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Member Since</p>
                  <p className="text-sm font-medium text-gray-800">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Auth Provider</p>
                  <p className="text-sm font-medium text-gray-800 capitalize">
                    {user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email / Password'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email verification notice */}
        {!user?.emailVerified && user?.providerData?.[0]?.providerId !== 'google.com' && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <span className="text-amber-600 text-xl">⚠️</span>
            <p className="text-sm text-amber-800 font-medium">
              Your email is not verified. Please check your inbox for a verification link.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
