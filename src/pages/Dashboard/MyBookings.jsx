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
      confirmButtonText: 'Place Order',
      confirmButtonColor: '#0A3D2A',
      cancelButtonColor: '#d33',
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
          title: 'Order Placed!',
          text: 'Your order has been successfully placed.',
          confirmButtonColor: '#0A3D2A'
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
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#0A3D2A] flex items-center justify-center">
          <ShoppingBag className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
          <p className="text-sm text-gray-500">Track your grocery orders & cart</p>
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
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">In Cart</p>
          <p className="text-2xl font-extrabold text-[#0A3D2A]">{cart.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Cart Total</p>
          <p className="text-2xl font-extrabold text-gray-900">৳{cartTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-6">
        {[{key:'orders',label:`Orders (${orders.length})`},{key:'cart',label:`Cart (${cart.length})`}].map(t=>(
          <button
            key={t.key}
            onClick={()=>setTab(t.key)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t.key ? 'bg-white text-[#0A3D2A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
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
              <div className="animate-spin w-10 h-10 border-4 border-[#0A3D2A] border-t-transparent rounded-full" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-600 mb-2">No orders yet</p>
              <p className="text-gray-400 text-sm mb-6">Browse products and place your first order!</p>
              <Link to="/" className="inline-block bg-[#0A3D2A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition">
                Shop Now →
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
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900 font-mono text-sm">
                              #{order._id?.slice(-8).toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.cls}`}>
                              <SIcon className="h-3 w-3" />{cfg.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(order.orderedAt).toLocaleDateString('en-BD', { year:'numeric', month:'short', day:'numeric' })}
                          </div>
                          {order.items?.length > 0 && (
                            <p className="text-sm text-gray-600">
                              {order.items.map(i => `${i.title} ×${i.quantity||1}`).join(' • ')}
                            </p>
                          )}
                          {order.deliveryAddress && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                              <MapPin className="h-3.5 w-3.5" />{order.deliveryAddress}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-extrabold text-gray-900">৳{(order.totalAmount||0).toLocaleString()}</p>
                          <p className="text-xs text-gray-400">{order.items?.length||0} items</p>
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => handlePay(order)} 
                              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition shadow"
                            >
                              Pay Now
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
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</p>
              <Link to="/" className="inline-block bg-[#0A3D2A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition">
                Browse Products →
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
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="font-bold text-gray-800">Total: <span className="text-red-600">৳{cartTotal.toLocaleString()}</span></p>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="bg-[#0A3D2A] hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-md disabled:opacity-50"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout →'}
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