import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle, Clock, XCircle, Truck, ChevronDown, Search, RefreshCw, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusConfig = {
  pending:    { label: 'Awaiting',   icon: Clock,       cls: 'bg-yellow-50 text-yellow-700 border-yellow-200 shadow-yellow-100/50' },
  processing: { label: 'In Flow',     icon: RefreshCw,   cls: 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100/50' },
  shipped:    { label: 'In Transit',  icon: Truck,       cls: 'bg-red-50 text-red-700 border-red-200 shadow-red-100/50' },
  delivered:  { label: 'Finalized',   icon: CheckCircle, cls: 'bg-green-50 text-green-700 border-green-200 shadow-green-100/50' },
  cancelled:  { label: 'Terminated',  icon: XCircle,     cls: 'bg-gray-50 text-gray-500 border-gray-200 shadow-gray-100/50' },
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
        title: 'Registry Updated', 
        showConfirmButton: false, 
        timer: 1400,
        background: '#fff',
        customClass: { popup: 'rounded-[32px] shadow-2xl' }
      });
    } catch {
      Swal.fire({ icon: 'error', title: 'Action Halted', confirmButtonColor: '#e63946' });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 lg:p-12 space-y-12 font-['Poppins',sans-serif]"
    >
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[32px] bg-red-600 flex items-center justify-center shadow-2xl shadow-red-200 relative group overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Truck className="h-10 w-10 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Order Command</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Overseeing {orders.length} unique market transactions</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => refetch()} 
            className="flex items-center gap-3 bg-white hover:bg-red-50 text-gray-900 hover:text-red-600 px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all border border-gray-100 shadow-lg shadow-gray-100"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> 
            Sync Registry
          </button>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { label: 'Total Intake', value: orders.length, icon: Package, color: 'from-gray-800 to-gray-900', shadow: 'shadow-gray-200' },
          { label: 'Gross Yield', value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-red-600 to-red-700', shadow: 'shadow-red-200' },
          { label: 'Pending Logic', value: orders.filter(o=>o.status==='pending').length, icon: Clock, color: 'from-yellow-400 to-yellow-500', shadow: 'shadow-yellow-100' },
          { label: 'Finalized', value: orders.filter(o=>o.status==='delivered').length, icon: CheckCircle, color: 'from-red-500 to-red-600', shadow: 'shadow-red-200' },
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-br ${s.color} rounded-[40px] p-8 text-white shadow-2xl ${s.shadow} relative overflow-hidden group`}
          >
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-black text-white/60 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-4xl font-black tracking-tighter">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Control Strip */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative group flex-1">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-red-600 transition-colors" />
          <input
            type="text"
            placeholder="Search Identity, Transmission or Personnel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-20 pr-10 py-6 rounded-[32px] border border-gray-100 text-sm font-bold text-gray-800 focus:outline-none focus:ring-8 focus:ring-red-50 focus:border-red-600 shadow-xl shadow-gray-100 transition-all placeholder:text-gray-300"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={e => setFilter(e.target.value)}
            className="px-8 py-6 rounded-[32px] border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-600 focus:outline-none focus:ring-8 focus:ring-red-50 focus:border-red-600 bg-white shadow-xl shadow-gray-100 transition-all outline-none"
          >
            <option value="all">Global Manifest</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      {/* Data Manifest Container */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
           <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-8 border-red-50 rounded-full" />
            <div className="absolute inset-0 border-8 border-red-600 border-t-transparent rounded-full animate-spin transition-all" />
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-[56px] border border-dashed border-gray-100 py-40 text-center shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Package className="h-10 w-10 text-gray-200" />
          </div>
          <p className="text-2xl font-black text-gray-900 tracking-tight uppercase">Registry Empty</p>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">No transaction matches your search parameters</p>
        </div>
      ) : (
        <div className="bg-white rounded-[56px] border border-gray-50 shadow-2xl shadow-gray-100/50 overflow-hidden relative p-4">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  {['#', 'Transaction ID', 'Personnel', 'Yield', 'Registry Date', 'Current Flow', 'Update Path'].map(h => (
                    <th key={h} className="px-8 py-6 text-left text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence mode='popLayout'>
                  {filteredOrders.map((order, idx) => {
                    const cfg = statusConfig[order.status] || statusConfig.pending;
                    const SIcon = cfg.icon;
                    return (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.03 }}
                        className="group hover:bg-gray-50/50 transition-all rounded-[32px] relative"
                      >
                        <td className="px-8 py-8 text-[10px] font-black text-gray-300 group-hover:text-red-600">{idx + 1}</td>
                        <td className="px-8 py-8">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                            <span className="font-black text-gray-900 font-mono text-[10px] tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                              {order._id?.slice(-12).toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-8">
                          <div className="min-w-0">
                            <p className="font-black text-gray-900 text-xs uppercase tracking-tight truncate max-w-[150px]">{order.customerName || 'Agent Unknown'}</p>
                            <p className="text-[10px] text-gray-400 font-bold truncate max-w-[150px] mt-1">{order.email}</p>
                          </div>
                        </td>
                        <td className="px-8 py-8">
                           <p className="font-black text-gray-900 text-sm tracking-tighter">৳{(order.totalAmount || 0).toLocaleString()}</p>
                           <p className="text-[9px] text-red-600 font-black uppercase tracking-widest mt-1">
                             {order.items?.length || 0} Assets Published
                           </p>
                        </td>
                        <td className="px-8 py-8 text-gray-400 font-black text-[10px] uppercase tracking-wider">
                          {new Date(order.orderedAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-8">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm transition-all ${cfg.cls}`}>
                            <SIcon className="h-3.5 w-3.5" />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-8 py-8">
                          <div className="relative group/select w-44">
                            <select
                              value={order.status}
                              onChange={e => handleStatusUpdate(order._id, e.target.value)}
                              disabled={updating === order._id}
                              className="w-full pl-5 pr-12 py-4 text-[9px] font-black uppercase tracking-widest rounded-2xl border border-gray-100 text-gray-400 focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-50 appearance-none bg-white cursor-pointer disabled:opacity-40 transition-all group-hover/select:border-red-100 group-hover/select:text-gray-900"
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{s.toUpperCase()}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none group-focus-within/select:text-red-600" />
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {/* Table Footer Activity */}
          <div className="px-10 py-6 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Data Manifest: {filteredOrders.length} Published / {orders.length} Logged</p>
            <div className="flex gap-2">
               {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-red-600 opacity-20" />)}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManagePayments;
