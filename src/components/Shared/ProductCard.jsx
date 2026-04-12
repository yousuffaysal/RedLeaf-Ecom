import React, { useState } from 'react';
import { Heart, Plus, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductDetailsModal from './ProductDetailsModal';

const ProductCard = ({ product, disableHoverAnimation }) => {
  const { id, title, image, price, originalPrice,  discountPercent, unit } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={disableHoverAnimation ? {} : { y: -4 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer"
      >
        {/* Product Image Area */}
        <div className="relative aspect-square p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
          {/* Discount Badge */}
          {discountPercent && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              {discountPercent}% OFF
            </div>
          )}
          
          {/* Quick Actions Hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300 z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); /* Add wishlist logic */ }}
              className="bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Heart size={18} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); /* Add share logic */ }}
              className="bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Image */}
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 flex flex-col flex-grow">
          <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-green-700 transition-colors">
            {title}
          </h4>
          
          {/* Units / Variants mockup */}
          <div className="flex gap-2 mb-3 mt-auto pt-2">
            <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded">
              {unit || '1 Pack'}
            </span>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">৳{price}</span>
              </div>
              {originalPrice > price && (
                <span className="text-sm text-gray-400 line-through">৳{originalPrice}</span>
              )}
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); /* Add to cart logic here */ }}
              className="w-10 h-10 rounded-full bg-[#0A3D2A] text-white flex items-center justify-center hover:bg-green-700 transition-colors shadow-md active:scale-95"
            >
              <Plus size={20} />
            </button>
          </div>
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
