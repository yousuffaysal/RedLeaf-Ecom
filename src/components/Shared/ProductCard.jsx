import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ProductDetailsModal from './ProductDetailsModal';

const ProductCard = ({ product, disableHoverAnimation }) => {
  const { title, image, price, originalPrice, discountPercent, unit } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetchCart] = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
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
      quantity: 1,
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
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Transmission Error', text: 'Failed to sync asset to cart.' });
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={disableHoverAnimation ? {} : { y: -4 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer relative"
      >
        {/* Diagonal Ribbon Badge */}
        {discountPercent && (
          <div className="absolute top-0 left-0 z-10 overflow-hidden w-20 h-20 pointer-events-none">
            <div className="absolute top-4 -left-5 w-24 bg-red-600 text-white text-[11px] font-extrabold text-center py-1 rotate-[-45deg] shadow">
              {discountPercent}%<br />OFF
            </div>
          </div>
        )}

        {/* Image Area */}
        <div className="relative bg-gray-50 flex items-center justify-center px-6 pt-6 pb-4" style={{ minHeight: '200px' }}>
          <img
            src={image}
            alt={title}
            className="w-full h-44 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || product.inStock === false}
            className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
          >
            {addingToCart ? (
              <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <Plus size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Details */}
        <div className="px-4 pt-3 pb-4 flex flex-col gap-1.5">
          {/* Title */}
          <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
            {title}
          </h4>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {originalPrice > price && (
              <span className="text-sm text-gray-400 line-through">৳{originalPrice}</span>
            )}
            <span className="text-lg font-extrabold text-red-600">৳{price}</span>
          </div>

          {/* Unit Tag */}
          <span className="self-end text-xs font-semibold text-red-600 border border-red-400 px-3 py-0.5 rounded-full">
            {unit || '1 Pack'}
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <ProductDetailsModal product={product} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
