import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, name: 'Fresh Honey', icon: '🍯', bgColor: 'bg-amber-100', borderColor: 'border-amber-200' },
  { id: 2, name: 'Premium Rice', icon: '🌾', bgColor: 'bg-green-100', borderColor: 'border-green-200' },
  { id: 3, name: 'Mustard Oil', icon: '🛢️', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-200' },
  { id: 4, name: 'Organic Spices', icon: '🌶️', bgColor: 'bg-red-100', borderColor: 'border-red-200' },
  { id: 5, name: 'Lentils & Pulses', icon: '🫘', bgColor: 'bg-orange-100', borderColor: 'border-orange-200' },
  { id: 6, name: 'Poultry & Meat', icon: '🍗', bgColor: 'bg-rose-100', borderColor: 'border-rose-200' },
  { id: 7, name: 'Dairy Items', icon: '🥛', bgColor: 'bg-blue-100', borderColor: 'border-blue-200' },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
            Shop by Category
          </h3>
          <button className="text-sm font-semibold text-green-700 hover:text-red-600 transition-colors">
            View All →
          </button>
        </div>

        {/* Categories container with horizontal scroll hiding scrollbar */}
        <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`min-w-[120px] md:min-w-[140px] flex gap-3 flex-col items-center justify-center p-4 rounded-xl border-2 ${category.bgColor} ${category.borderColor} shadow-sm snap-start cursor-pointer hover:shadow-md transition-shadow group`}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center">
                {category.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}} />
      </div>
    </section>
  );
};

export default FeaturedCategories;
