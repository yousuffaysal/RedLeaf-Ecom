import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import ProductCard from './ProductCard';

const ProductDetailsModal = ({ product, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [, refetchCart] = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Details');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
      if (stored.includes(product?._id)) setIsWishlisted(true);
    } catch {}
  }, [product?._id]);

  const { data: relatedProducts = [], isLoading } = useQuery({
    queryKey: ['related-products', product?.category, product?._id],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/products?category=${product.category}&limit=5`);
        return (res.data?.products || []).filter(p => p._id !== product._id).slice(0, 4);
      } catch (err) { return []; }
    },
    enabled: !!product?.category
  });

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!user && location.pathname) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Access granted after secure login.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#111827',
        confirmButtonText: 'Secure Login'
      }).then((result) => {
        if (result.isConfirmed) navigate('/login', { state: { from: location } });
      });
      return;
    }
    
    setAddingToCart(true);
    const cartItem = {
      productId: product._id,
      email: user.email,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      unit: product.unit
    };
    
    try {
      await axiosSecure.post('/carts', cartItem);
      Swal.fire({
        icon: 'success',
        title: 'Asset Added',
        text: `${product.title} synced to your procurement list.`,
        showConfirmButton: false,
        timer: 1500,
        position: 'center'
      });
      refetchCart();
      onClose();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Transmission Error', text: 'Failed to sync asset to cart.' });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = () => {
    try {
      let stored = JSON.parse(localStorage.getItem('wishlist')) || [];
      if (isWishlisted) {
        stored = stored.filter(id => id !== product._id);
        setIsWishlisted(false);
        Swal.fire({ toast: true, position: 'bottom-end', icon: 'info', title: 'Registry Updated', showConfirmButton: false, timer: 2000 });
      } else {
        stored.push(product._id);
        setIsWishlisted(true);
        Swal.fire({ toast: true, position: 'bottom-end', icon: 'success', title: 'Curated to Wishlist', showConfirmButton: false, timer: 2000 });
      }
      localStorage.setItem('wishlist', JSON.stringify(stored));
    } catch (err) {}
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/products/${product._id}`);
      Swal.fire({ toast: true, position: 'bottom-end', icon: 'success', title: 'Link Secured', showConfirmButton: false, timer: 2000 });
    } catch (error) {}
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-gray-900/80 backdrop-blur-md flex justify-center items-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[40px] shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto no-scrollbar relative flex flex-col"
      >
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 z-10 w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-12">
          <div className="flex gap-4 self-start sticky top-8">
            <div className="hidden sm:flex flex-col gap-4 w-24 shrink-0">
              <div className="w-full aspect-square border-2 border-red-600 rounded-2xl overflow-hidden cursor-pointer p-1 bg-white">
                <img src={product.image} alt="thumb-1" className="w-full h-full object-cover mix-blend-multiply rounded-xl" />
              </div>
            </div>
            <div className="w-full sm:flex-1 aspect-square bg-gray-50/50 rounded-[32px] relative flex items-center justify-center p-8 lg:p-12 border border-gray-100 group overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" 
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-full w-fit uppercase tracking-widest mb-4">
              Premium Collection
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] mb-4 tracking-tighter">
              {product.title}
            </h2>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-gray-900 tracking-tighter">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-xl text-gray-300 line-through font-bold">৳{product.originalPrice}</span>
                  <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-3 py-1 rounded-lg shadow-sm uppercase">
                    Value Save: {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-2xl shadow-lg uppercase tracking-wider">
                Measurement: {product.unit || 'Standard'}
              </div>
              <div className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${product.inStock !== false ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                {product.inStock !== false ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
                {product.inStock !== false ? 'Verified: In Stock' : 'Depleted'}
              </div>
            </div>

            {/* Procurement Strategy */}
            <div className="flex flex-col gap-5 mt-auto mb-10">
              <div className="flex flex-row gap-4 h-[60px] w-full">
                {/* Quantity Command */}
                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden w-40 flex-shrink-0">
                  <button 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(q => q - 1)} 
                    className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-red-600 disabled:opacity-30 transition-colors"
                  >
                    <Minus size={20} strokeWidth={3} />
                  </button>
                  <div className="flex-1 text-center font-black text-xl text-gray-900">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Plus size={20} strokeWidth={3} />
                  </button>
                </div>

                {/* Primary Action */}
                <button 
                  onClick={handleAddToCart}
                  disabled={addingToCart || product.inStock === false}
                  className="flex-1 h-full bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-[0.15em] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-200 disabled:opacity-50"
                >
                  {addingToCart ? (
                    <span className="animate-spin w-5 h-5 border-3 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>
                      <ShoppingCart size={20} strokeWidth={2.5} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Auxiliary Operations */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleWishlist}
                  className={`h-[56px] flex items-center justify-center gap-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                    ${isWishlisted ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600'}
                  `}>
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={2.5} /> 
                  Curate
                </button>
                <button 
                  onClick={handleShare}
                  className="h-[56px] flex items-center justify-center gap-3 bg-gray-50 text-gray-500 hover:bg-yellow-400 hover:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  <Share2 size={18} strokeWidth={2.5} /> Network Share
                </button>
              </div>
            </div>

            {/* Specifications Ledger */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex gap-8 border-b border-gray-100">
                {['Highlights', 'Details', 'Reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative ${activeTab === tab ? 'text-red-600' : 'text-gray-300 hover:text-gray-500'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
              <div className="py-6 text-sm text-gray-700 font-medium leading-relaxed min-h-[150px]">
                {activeTab === 'Highlights' && (
                   product.highlights ? <div dangerouslySetInnerHTML={{__html: product.highlights}} /> : <p>High-priority highlights encrypted or unavailable.</p>
                )}
                {activeTab === 'Details' && (
                   product.description ? <p>{product.description}</p> : <p>Full technical details in development.</p>
                )}
                {activeTab === 'Reviews' && <p>Consolidated feedback module pending synchronization.</p>}
              </div>
            </div>

          </div>
        </div>

        {/* Global Catalog Integration */}
        <div className="bg-gray-50/50 border-t border-gray-100 p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest">Recommended Inventory</h3>
             <Link to="/products" className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">View All Assets</Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-10"><div className="animate-spin w-8 h-8 border-4 border-red-100 border-t-red-600 rounded-full" /></div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp._id} product={rp} disableHoverAnimation={true} />
              ))}
            </div>
          ) : (
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center py-10">No matching assets in local database.</p>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ProductDetailsModal;
