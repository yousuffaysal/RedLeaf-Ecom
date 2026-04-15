import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, Edit3, Check, X, Camera } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';
import ImageUploadField from '../../components/Dashboard/ImageUploadField';

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
        title: 'Identity Synched',
        showConfirmButton: false,
        timer: 1800,
        background: '#fff',
        customClass: { popup: 'rounded-3xl shadow-xl' }
      });
    } catch {
      Swal.fire({ icon: 'error', title: 'Action Failed', confirmButtonColor: '#e63946' });
    } finally {
      setSaving(false);
    }
  };

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-BD', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'Registry Start: —';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 lg:p-12 font-['Poppins',sans-serif]"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[24px] bg-red-600 flex items-center justify-center shadow-2xl shadow-red-200">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Personnel Profile</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Manage your administrative identity</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[40px] shadow-2xl border border-gray-50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-yellow-400 opacity-30" />
          
          {/* Cover Area */}
          <div className="h-40 bg-gradient-to-br from-red-600 via-red-700 to-black relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          {/* Identity Section */}
          <div className="px-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 -mt-16 mb-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-400 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=e63946&color=fff&size=200`}
                  alt="Profile"
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-[32px] border-4 border-white shadow-2xl object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=e63946&color=fff&size=200`;
                  }}
                />
                {isAdmin && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                    <Shield className="h-5 w-5 text-red-700" />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-6 py-3 rounded-2xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all active:scale-90"
                    >
                      Abort
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-90 disabled:opacity-50"
                    >
                      <Check className="h-4 w-4" />
                      {saving ? 'Syncing...' : 'Commit Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setDisplayName(user?.displayName || '');
                      setPhotoURL(user?.photoURL || '');
                      setEditing(true);
                    }}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-gray-100 bg-white text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-red-600 hover:border-red-100 transition-all shadow-lg shadow-gray-100 active:scale-95"
                  >
                    <Edit3 className="h-4 w-4" /> Refine Identity
                  </button>
                )}
              </div>
            </div>

            {/* Editable Content */}
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Display Identity</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-sm font-bold text-gray-800 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all"
                    placeholder="Your Full Name"
                  />
                </div>
                <ImageUploadField 
                  label="Visual Endpoint (Avatar)"
                  value={photoURL} 
                  onChange={(url) => setPhotoURL(url)} 
                  placeholder="https://visuals..." 
                />
              </div>
            ) : (
              <div className="mb-10">
                <h3 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                  {user?.displayName || 'Unauthorized User'}
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {isAdmin && (
                    <span className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-100">
                      <Shield className="h-3.5 w-3.5" /> High Command
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-400 text-red-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-yellow-100">
                    Verified Agent
                  </span>
                </div>
              </div>
            )}

            {/* Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Transmission', value: user?.email, icon: Mail, color: 'text-red-500', bg: 'bg-red-50' },
                { label: 'Operational Role', value: isAdmin ? 'Administrator' : 'Client', icon: Shield, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Registry Date', value: joinDate, icon: Calendar, color: 'text-gray-900', bg: 'bg-gray-50' },
                { label: 'Provider', value: user?.providerData?.[0]?.providerId === 'google.com' ? 'Google Cloud' : 'Native Auth', icon: User, color: 'text-gray-400', bg: 'bg-gray-50' },
              ].map((m, i) => (
                <div key={i} className={`${m.bg} p-6 rounded-[32px] border border-white transition-all hover:scale-105 shadow-sm`}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                    <m.icon className={`h-5 w-5 ${m.color}`} />
                  </div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-xs font-black text-gray-900 truncate uppercase tracking-tight">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {!user?.emailVerified && user?.providerData?.[0]?.providerId !== 'google.com' && (
          <div className="p-6 bg-red-600 rounded-[32px] text-white flex items-center gap-6 shadow-2xl shadow-red-200">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
              <span className="text-2xl font-black">!</span>
            </div>
            <div>
               <h4 className="font-black uppercase tracking-widest text-sm mb-1">Identity Pending Verification</h4>
               <p className="text-[10px] font-bold opacity-80 max-w-lg">Your contact endpoint is not verified. Check your registry inbox to finalize authentication.</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
