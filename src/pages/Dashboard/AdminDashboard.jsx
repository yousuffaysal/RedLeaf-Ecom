import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, Clock, CheckCircle, Truck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const statusConfig = {
  pending:    { label: 'Pending',    cls: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Processing', cls: 'bg-blue-100 text-blue-800'    },
  shipped:    { label: 'Shipped',    cls: 'bg-indigo-100 text-indigo-800' },
  delivered:  { label: 'Delivered',  cls: 'bg-green-100 text-green-800'  },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-100 text-red-800'      },
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    },
    refetchInterval: 60000,
  });

  const statCards = [
    { label: 'Total Revenue',  value: stats ? `৳${(stats.totalRevenue||0).toLocaleString()}` : '—',  icon: DollarSign, color: 'from-[#0A3D2A] to-[#116638]', shadow: 'shadow-green-200' },
    { label: 'Total Orders',   value: stats?.totalOrders  ?? '—',                                      icon: ShoppingBag, color: 'from-red-600 to-red-700',   shadow: 'shadow-red-200'   },
    { label: 'Registered Users',value: stats?.totalUsers  ?? '—',                                      icon: Users,       color: 'from-blue-600 to-blue-700',  shadow: 'shadow-blue-200'  },
    { label: 'Products Listed', value: stats?.totalProducts?? '—',                                      icon: Package,     color: 'from-amber-500 to-amber-600',shadow: 'shadow-amber-200' },
  ];

  const maxBar = stats?.weeklyData ? Math.max(...stats.weeklyData.map(d => d.revenue), 1) : 1;

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-12 h-12 border-4 border-[#0A3D2A] border-t-transparent rounded-full" />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white shadow-lg ${card.shadow} cursor-default`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-white/60" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{card.value}</p>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-yellow-700" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Pending Orders</p>
            <p className="text-xl font-extrabold text-gray-900">{stats?.pendingOrders ?? 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Delivered</p>
            <p className="text-xl font-extrabold text-gray-900">{stats?.deliveredOrders ?? 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Truck className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Delivery Rate</p>
            <p className="text-xl font-extrabold text-gray-900">
              {stats?.totalOrders
                ? `${Math.round(((stats.deliveredOrders||0)/stats.totalOrders)*100)}%`
                : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Weekly Revenue Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Weekly Revenue</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-gray-500"><span className="w-3 h-3 rounded-sm bg-[#0A3D2A] inline-block"/>Revenue</span>
              <span className="flex items-center gap-1.5 text-gray-500"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block"/>Orders</span>
            </div>
          </div>

          {stats?.weeklyData ? (
            <div className="flex items-end gap-2 h-44">
              {stats.weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: '140px' }}>
                    {/* Orders bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(4, (d.orders / Math.max(...stats.weeklyData.map(x=>x.orders),1)) * 50)}%` }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="w-full rounded-t-md bg-red-400 opacity-70"
                    />
                    {/* Revenue bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(4, (d.revenue / maxBar) * 100)}%` }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="w-full rounded-t-md bg-[#0A3D2A]"
                    />
                  </div>
                  <span className="text-xs text-gray-400">{d.day}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-44 flex items-center justify-center text-gray-300 text-sm">No data yet</div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <p className="text-xs text-gray-400 mt-0.5">Latest 6 orders</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {stats?.recentOrders?.length ? stats.recentOrders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              return (
                <div key={order._id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0A3D2A] font-mono">#{order._id?.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-500 truncate">{order.email}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.orderedAt).toLocaleDateString('en-BD', { month:'short', day:'numeric' })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.cls}`}>{cfg.label}</span>
                    <span className="text-xs font-bold text-gray-900">৳{(order.totalAmount||0).toLocaleString()}</span>
                  </div>
                </div>
              );
            }) : (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">No recent orders</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
