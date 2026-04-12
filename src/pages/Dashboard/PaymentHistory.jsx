import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, CheckCircle, Clock, XCircle, Truck, CreditCard, Calendar } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const statusConfig = {
  pending:    { label: 'Pending',    icon: Clock,        cls: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  processing: { label: 'Processing', icon: Package,      cls: 'bg-blue-100 text-blue-800 border-blue-200'   },
  shipped:    { label: 'Shipped',    icon: Truck,        cls: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  delivered:  { label: 'Delivered',  icon: CheckCircle,  cls: 'bg-green-100 text-green-800 border-green-200' },
  cancelled:  { label: 'Cancelled',  icon: XCircle,      cls: 'bg-red-100 text-red-800 border-red-200'     },
};

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['my-orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data || [];
    },
  });

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-[#0A3D2A] border-t-transparent rounded-full" />
    </div>
  );

  const handlePay = (order) => {
    navigate(`/dashboard/payment/${order._id}`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#0A3D2A] flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
          <p className="text-sm text-gray-500">Track all your past orders</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Total Orders</p>
          <p className="text-2xl font-extrabold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Total Spent</p>
          <p className="text-2xl font-extrabold text-red-600">৳{totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 col-span-2 sm:col-span-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Delivered</p>
          <p className="text-2xl font-extrabold text-green-700">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700 mb-2">No orders yet</p>
          <p className="text-gray-400 text-sm mb-6">Start shopping and your orders will appear here.</p>
          <a href="/" className="inline-block bg-[#0A3D2A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition">
            Shop Now →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order, idx) => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0A3D2A]/10 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-6 w-6 text-[#0A3D2A]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm mb-0.5">
                          Order #{order._id?.slice(-8).toUpperCase()}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(order.orderedAt).toLocaleDateString('en-BD', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                          {order.items?.length > 0 && (
                            <span className="ml-1">— {order.items.map(i => i.title).join(', ').slice(0, 50)}{order.items.map(i => i.title).join(', ').length > 50 ? '…' : ''}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {cfg.label}
                      </span>
                      <p className="text-lg font-extrabold text-gray-900 mb-1">৳{(order.totalAmount || 0).toLocaleString()}</p>
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => handlePay(order)} 
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition shadow"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.deliveryAddress && (
                    <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500">
                      📍 {order.deliveryAddress}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentHistory;
