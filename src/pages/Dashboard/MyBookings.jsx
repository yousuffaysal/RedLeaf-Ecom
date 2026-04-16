import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, CheckCircle, Clock, XCircle, Truck, Trash2, Calendar, MapPin } from 'lucide-react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const statusConfig = {
  pending:    { label: 'Pending',    icon: Clock,       cls: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  processing: { label: 'Processing', icon: Package,     cls: 'bg-blue-100 text-blue-800 border-blue-200'    },
  shipped:    { label: 'Shipped',    icon: Truck,       cls: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  delivered:  { label: 'Delivered',  icon: CheckCircle, cls: 'bg-green-100 text-green-800 border-green-200'  },
  cancelled:  { label: 'Cancelled',  icon: XCircle,     cls: 'bg-red-100 text-red-800 border-red-200'       },
};

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cart, refetchCart] = useCart();
  const [tab, setTab] = useState('orders');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['my-orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data || [];
    },
  });

  const totalSpent = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const cartTotal  = cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  const handleRemoveFromCart = (id) => {
    Swal.fire({
      title: 'Remove item?',
      text: 'Remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/carts/${id}`);
        refetchCart();
      }
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    Swal.fire({
      title: 'Checkout',
      text: 'Please enter your delivery address:',
      input: 'textarea',
      inputPlaceholder: '123 Main St, City, Country...',
      showCancelButton: true,
      confirmButtonText: 'Execute Order',
      confirmButtonColor: '#111827',
      cancelButtonColor: '#6b7280',
      showLoaderOnConfirm: true,
      preConfirm: async (address) => {
        if (!address) {
          Swal.showValidationMessage('Delivery address is required');
          return false;
        }
        
        setIsCheckingOut(true);
        const orderData = {
          email: user?.email,
          items: cart,
          totalAmount: cartTotal,
          deliveryAddress: address
        };

        try {
          const res = await axiosSecure.post('/orders', orderData);
          if (res.data.insertedId) {
            await refetchCart();
            await queryClient.invalidateQueries({ queryKey: ['my-orders', user?.email] });
            setTab('orders');
            return true;
          }
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        } finally {
          setIsCheckingOut(false);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Procurement Initialized!',
          text: 'Order successfully logged into the fulfillment queue.',
          confirmButtonColor: '#111827'
        });
      }
    });
  };

  const handlePay = (order) => {
    navigate(`/dashboard/payment/${order._id}`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100 shadow-sm">
          <ShoppingBag className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Order Ledger</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Track your active procurements and fulfillment status</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Total Orders</p>
          <p className="text-2xl font-extrabold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Total Spent</p>
          <p className="text-2xl font-extrabold text-red-600">৳{totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Cart Volume</p>
          <p className="text-2xl font-black text-gray-900">{cart.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Cart Total</p>
          <p className="text-2xl font-extrabold text-gray-900">৳{cartTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-50 border border-gray-100 rounded-2xl w-fit mb-8 shadow-inner">
        {[{key:'orders',label:`Purchase History (${orders.length})`},{key:'cart',label:`Active Cart (${cart.length})`}].map(t=>(
          <button
            key={t.key}
            onClick={()=>setTab(t.key)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab===t.key ? 'bg-white text-red-600 shadow-md border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div>
          {ordersLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
              <ShoppingBag className="h-20 w-20 text-gray-100 mx-auto mb-6" />
              <p className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Ledger Empty</p>
              <p className="text-gray-500 text-sm mb-8 font-medium">Your purchase history is currently empty. Initialize a new procurement strategy.</p>
              <Link to="/" className="inline-flex items-center justify-center bg-gray-900 px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-gray-200 hover:bg-black group">
                <span className="text-white group-hover:text-white text-xs uppercase font-black tracking-widest">Explore Catalog</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {orders.map((order, idx) => {
                  const cfg = statusConfig[order.status] || statusConfig.pending;
                  const SIcon = cfg.icon;
                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:shadow-gray-100 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="font-black text-gray-900 font-mono text-lg tracking-tight">
                              #{order._id?.slice(-8).toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest border ${cfg.cls}`}>
                              <SIcon className="h-3.5 w-3.5" />{cfg.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(order.orderedAt).toLocaleDateString('en-BD', { year:'numeric', month:'short', day:'numeric' })}</span>
                            {order.deliveryAddress && (
                              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {order.deliveryAddress}</span>
                            )}
                          </div>
                          {order.items?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {order.items.map((i, idx) => (
                                <span key={idx} className="bg-gray-50 text-gray-600 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-semibold">
                                  {i.title} <span className="text-gray-400 ml-1">×{i.quantity||1}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end justify-center">
                          <p className="text-2xl font-black text-gray-900 tracking-tight">৳{(order.totalAmount||0).toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{order.items?.length||0} units allocated</p>
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => handlePay(order)} 
                              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl text-xs uppercase font-black tracking-widest transition-all shadow-lg shadow-red-100"
                            >
                              Fulfill Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Cart Tab */}
      {tab === 'cart' && (
        <div>
          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
              <ShoppingBag className="h-20 w-20 text-gray-100 mx-auto mb-6" />
              <p className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Staging Area Empty</p>
              <p className="text-gray-500 text-sm font-medium mb-8">You haven't added any assets to your procurement cart yet.</p>
              <Link to="/" className="inline-flex items-center justify-center bg-gray-900 px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-gray-200 hover:bg-black group">
                <span className="text-white group-hover:text-white text-xs uppercase font-black tracking-widest">Browse Asset Catalog</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {cart.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50/50"
                  >
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=80'}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.unit} · Qty: {item.quantity || 1}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-red-600">৳{((item.price||0)*(item.quantity||1)).toLocaleString()}</p>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="mt-1 text-gray-300 hover:text-red-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between rounded-b-2xl">
                <p className="font-black text-gray-900 text-xl tracking-tight">Total Obligation: <span className="text-red-600">৳{cartTotal.toLocaleString()}</span></p>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-2xl text-xs uppercase font-black tracking-widest transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                  ) : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;