import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle, Clock, XCircle, Truck, ChevronDown, Search, RefreshCw, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusConfig = {
  pending:    { label: 'Pending Review',   icon: Clock,       cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  processing: { label: 'In Processing',    icon: RefreshCw,   cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  shipped:    { label: 'Dispatched',       icon: Truck,       cls: 'bg-red-50 text-red-700 border-red-200' },
  delivered:  { label: 'Delivered',        icon: CheckCircle, cls: 'bg-green-50 text-green-700 border-green-200' },
  cancelled:  { label: 'Cancelled',        icon: XCircle,     cls: 'bg-gray-50 text-gray-500 border-gray-200' },
};

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilter] = useState('all');
  const [updating, setUpdating]   = useState(null);

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/orders');
      return res.data || [];
    },
  });

  const filteredOrders = orders.filter(o => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchSearch = !search ||
      o.email?.toLowerCase().includes(search.toLowerCase()) ||
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + (o.totalAmount || 0), 0);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await axiosSecure.patch(`/orders/${orderId}`, { status: newStatus });
      await refetch();
      Swal.fire({ 
        icon: 'success', 
        title: 'Manifest Synced', 
        showConfirmButton: false, 
        timer: 1400,
        background: '#fff',
        customClass: { popup: 'rounded-2xl shadow-xl border border-gray-50' }
      });
    } catch {
      Swal.fire({ icon: 'error', title: 'Action Failed', confirmButtonColor: '#e63946' });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-4 lg:p-7 space-y-6 font-['Poppins',sans-serif]"
    >
      {/* High-Finesse Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-100">
             <Truck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">Order Fulfillment Ledger</h2>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Pipeline Analytics: {orders.length} Active Transitions</p>
          </div>
        </div>
        <button 
          onClick={() => refetch()} 
          className="flex items-center gap-2 bg-white hover:bg-red-50 text-gray-900 px-5 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border border-gray-100 shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} /> 
          Refresh Registry
        </button>
      </div>

      {/* High-Density Stats Hub */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Volume', value: orders.length, icon: Package, color: 'from-gray-800 to-gray-900' },
          { label: 'Cumulative Revenue', value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-red-600 to-red-700' },
          { label: 'Awaiting Action', value: orders.filter(o=>o.status==='pending').length, icon: Clock, color: 'from-amber-400 to-amber-500' },
          { label: 'Fulfillment Cap', value: orders.filter(o=>o.status==='delivered').length, icon: CheckCircle, color: 'from-gray-900 to-black' },
        ].map((s, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden`}
          >
            <div className="relative z-10">
               <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5">{s.label}</p>
               <p className="text-xl font-bold tracking-tight">{s.value}</p>
            </div>
            <s.icon className="absolute right-[-8px] bottom-[-8px] h-14 w-14 text-white/5 rotate-12" />
          </div>
        ))}
      </div>

      {/* Command Strip */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative group flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
          <input
            type="text"
            placeholder="Filter Ledger by ID, Email or Name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-600 transition-all placeholder:text-gray-300"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilter(e.target.value)}
          className="px-5 py-3.5 rounded-xl border border-gray-100 text-[9px] font-bold uppercase tracking-widest text-gray-500 focus:outline-none focus:ring-4 focus:ring-red-50 bg-white"
        >
          <option value="all">Pipeline Scope: All</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
        </select>
      </div>

      {/* Professional Data Manifest */}
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
           <div className="w-8 h-8 border-3 border-red-50 border-t-red-600 rounded-full animate-spin" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-100 py-20 text-center">
          <Package className="h-10 w-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">Zero Matches Logged</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full">
              <thead className="bg-gray-50/70">
                <tr>
                  {['#', 'Manifest ID', 'Stakeholder Attribution', 'Yield', 'Registration', 'Fulfillment', 'Command'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-[8px] font-bold text-gray-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode='popLayout'>
                  {filteredOrders.map((order, idx) => {
                    const cfg = statusConfig[order.status] || statusConfig.pending;
                    return (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-gray-50/40 transition-all"
                      >
                        <td className="px-5 py-3 text-[9px] font-bold text-gray-300">{idx + 1}</td>
                        <td className="px-5 py-3">
                          <span className="font-mono text-[9px] font-bold text-red-600 bg-red-50/50 px-2 py-0.5 rounded-md border border-red-100/50 tracking-tight">
                            {order._id?.slice(-10).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <p className="font-bold text-gray-900 text-[11px] truncate max-w-[130px] leading-tight">{order.customerName || 'Agent ID Redacted'}</p>
                          <p className="text-[9px] text-gray-400 font-medium truncate max-w-[130px] mt-0.5 tracking-tighter">{order.email}</p>
                        </td>
                        <td className="px-5 py-3">
                           <p className="font-bold text-gray-900 text-[11px] tracking-tighter">৳{(order.totalAmount || 0).toLocaleString()}</p>
                           <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{order.items?.length || 0} Assets</p>
                        </td>
                        <td className="px-5 py-3 text-gray-500 font-bold text-[9px] uppercase tracking-tight">
                          {new Date(order.orderedAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[7px] font-bold uppercase tracking-widest border shadow-xs ${cfg.cls}`}>
                             <cfg.icon size={8} />
                             {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="relative group/select w-36">
                            <select
                              value={order.status}
                              onChange={e => handleStatusUpdate(order._id, e.target.value)}
                              disabled={updating === order._id}
                              className="w-full pl-2 pr-6 py-2 text-[8px] font-bold uppercase tracking-widest rounded-lg border border-gray-100 text-gray-400 focus:outline-none focus:border-red-600 appearance-none bg-white cursor-pointer transition-all"
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{s.toUpperCase()}</option>
                              ))}
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300" />
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50/30 border-t border-gray-50">
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-center">
               Manifest Integrity: {filteredOrders.length} Attributed / {orders.length} Global Entries detected.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManagePayments;
