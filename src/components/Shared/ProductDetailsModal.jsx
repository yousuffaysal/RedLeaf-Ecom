import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState('Highlights');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  
  // Initialize wishlist from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
      if (stored.includes(product?._id)) {
        setIsWishlisted(true);
      }
    } catch {}
  }, [product?._id]);

  const { data: relatedProducts = [], isLoading } = useQuery({
    queryKey: ['related-products', product?.category, product?._id],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/products?category=${product.category}&limit=5`);
        return (res.data?.products || []).filter(p => p._id !== product._id).slice(0, 4);
      } catch (err) {
        return [];
      }
    },
    enabled: !!product?.category
  });

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!user && location.pathname) {
      Swal.fire({
        title: 'Please Login',
        text: 'Login to add products to your cart!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0A3D2A',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go to Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
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
        title: 'Added to Cart',
        text: `${product.title} has been added to your cart.`,
        showConfirmButton: false,
        timer: 1500,
        position: 'center'
      });
      refetchCart();
      onClose(); // Optional: Close modal after adding
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add product to cart!',
      });
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
        Swal.fire({
          toast: true, position: 'bottom-end', icon: 'info',
          title: 'Removed from Wishlist', showConfirmButton: false, timer: 2000
        });
      } else {
        stored.push(product._id);
        setIsWishlisted(true);
        Swal.fire({
          toast: true, position: 'bottom-end', icon: 'success',
          title: 'Added to Wishlist', showConfirmButton: false, timer: 2000
        });
      }
      localStorage.setItem('wishlist', JSON.stringify(stored));
    } catch (err) {
      console.error('Wishlist error', err);
    }
  };

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/products/${product._id}`;
      // Since it's dynamic but we don't have a single product route yet technically, 
      // we share origin for now or something similar.
      await navigator.clipboard.writeText(url);
      Swal.fire({
        toast: true, position: 'bottom-end', icon: 'success',
        title: 'Link copied to clipboard!', showConfirmButton: false, timer: 2000
      });
    } catch (error) {
      console.error('Failed to copy', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative flex flex-col"
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="flex gap-4">
            <div className="hidden sm:flex flex-col gap-3 w-20">
              <div className="w-full aspect-square border-2 border-[#0A3D2A] rounded-lg overflow-hidden cursor-pointer">
                <img src={product.image} alt="thumb-1" className="w-full h-full object-cover mix-blend-multiply bg-gray-50 p-1" />
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl relative flex items-center justify-center p-8 border border-gray-100 group">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain max-h-[400px] group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              {product.title}
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-gray-900">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through font-medium mt-1">৳{product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ml-2 shadow-sm flex items-center h-6">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="mb-6">
              <div className="inline-block px-4 py-2 border-2 border-green-600 bg-green-50 text-green-800 text-sm font-bold rounded-lg cursor-default shadow-sm ring-2 ring-green-600/20">
                {product.unit || '1 Pack'}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8 text-sm font-semibold text-green-700">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center"><Check size={12} strokeWidth={3} /></div>
              {product.inStock !== false ? 'In Stock and Ready to Ship' : 'Out of Stock'}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-auto mb-8">
              <div className="flex flex-row gap-4 h-12 w-full">
                {/* Quantity */}
                <div className="flex items-center justify-between border-2 border-green-700 bg-[#0A3D2A] rounded-xl overflow-hidden w-32 flex-shrink-0 shadow-lg">
                  <button 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(q => q - 1)} 
                    className="w-10 h-full flex items-center justify-center text-white hover:bg-green-800 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="flex-1 text-center font-bold text-lg text-white">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="w-10 h-full flex items-center justify-center text-white hover:bg-green-800 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  disabled={addingToCart || product.inStock === false}
                  className="flex-1 h-full bg-[#0A3D2A] hover:bg-green-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Buy Now
                    </>
                  )}
                </button>
              </div>

              {/* Extras Row */}
              <div className="flex flex-row gap-4">
                <button 
                  onClick={handleWishlist}
                  className={`flex-1 h-12 flex items-center justify-center gap-2 border rounded-xl font-bold transition-all shadow-sm
                    ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500 hover:bg-red-50'}
                  `}>
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} /> 
                  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 h-12 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-green-200 hover:text-green-600 hover:bg-green-50 rounded-xl font-bold transition-all shadow-sm"
                >
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>

            {/* Details Tabs Segment */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex gap-6 border-b border-gray-100">
                {['Highlights', 'Details', 'Reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === tab ? 'text-[#0A3D2A]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A3D2A]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="py-4 text-sm text-gray-600 leading-relaxed min-h-[100px]">
                {activeTab === 'Highlights' && (
                   product.highlights ? <div dangerouslySetInnerHTML={{__html: product.highlights}} /> : <p>No highlights available.</p>
                )}
                {activeTab === 'Details' && (
                   product.description ? <p>{product.description}</p> : <p>No additional details provided.</p>
                )}
                {activeTab === 'Reviews' && <p>Customer reviews section is coming soon.</p>}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Related Products Section */}
        <div className="bg-gray-50 border-t border-gray-100 p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Related products</h3>
          {isLoading ? (
            <div className="flex justify-center py-8"><div className="animate-spin w-8 h-8 border-4 border-[#0A3D2A] border-t-transparent rounded-full" /></div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp._id} product={rp} disableHoverAnimation={true} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No related products found in this category.</p>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ProductDetailsModal;
