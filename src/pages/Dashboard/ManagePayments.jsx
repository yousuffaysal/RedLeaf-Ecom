import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle, Clock, XCircle, Truck, ChevronDown, Search, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusConfig = {
  pending:    { label: 'Pending',    icon: Clock,       cls: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Processing', icon: Package,     cls: 'bg-blue-100 text-blue-800'    },
  shipped:    { label: 'Shipped',    icon: Truck,       cls: 'bg-indigo-100 text-indigo-800' },
  delivered:  { label: 'Delivered',  icon: CheckCircle, cls: 'bg-green-100 text-green-800'  },
  cancelled:  { label: 'Cancelled',  icon: XCircle,     cls: 'bg-red-100 text-red-800'      },
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
      Swal.fire({ icon: 'success', title: 'Status Updated!', showConfirmButton: false, timer: 1400 });
    } catch {
      Swal.fire({ icon: 'error', title: 'Update Failed', confirmButtonColor: '#0A3D2A' });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0A3D2A] flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Orders</h2>
            <p className="text-sm text-gray-500">{orders.length} total orders</p>
          </div>
        </div>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orders',   value: orders.length,                                           color: 'text-gray-900'   },
          { label: 'Pending',        value: orders.filter(o=>o.status==='pending').length,            color: 'text-yellow-700' },
          { label: 'Delivered',      value: orders.filter(o=>o.status==='delivered').length,          color: 'text-green-700'  },
          { label: 'Revenue',        value: `৳${totalRevenue.toLocaleString()}`,                      color: 'text-[#0A3D2A]'  },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email, order ID, or name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]/30 focus:border-[#0A3D2A]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]/30 focus:border-[#0A3D2A] bg-white"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin w-10 h-10 border-4 border-[#0A3D2A] border-t-transparent rounded-full" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Package className="h-14 w-14 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No orders found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['#', 'Order ID', 'Customer', 'Items', 'Amount', 'Date', 'Status', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filteredOrders.map((order, idx) => {
                    const cfg = statusConfig[order.status] || statusConfig.pending;
                    const SIcon = cfg.icon;
                    return (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-gray-50/50 transition"
                      >
                        <td className="px-4 py-3.5 text-gray-400 font-medium">{idx + 1}</td>
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-[#0A3D2A] font-mono text-xs">
                            #{order._id?.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-gray-800 text-xs">{order.customerName || '—'}</p>
                          <p className="text-gray-400 text-xs">{order.email}</p>
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs">{order.items?.length || 0} items</td>
                        <td className="px-4 py-3.5 font-bold text-gray-900">৳{(order.totalAmount || 0).toLocaleString()}</td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(order.orderedAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}>
                            <SIcon className="h-3 w-3" />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={e => handleStatusUpdate(order._id, e.target.value)}
                              disabled={updating === order._id}
                              className="pl-3 pr-8 py-2 text-xs rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-[#0A3D2A] appearance-none bg-white cursor-pointer disabled:opacity-60"
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManagePayments;
