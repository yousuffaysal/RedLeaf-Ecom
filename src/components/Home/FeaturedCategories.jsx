import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbPlant, TbMeat, TbSoup, TbBottle, TbPepper, TbLeaf, TbCup, TbLemon, TbApple, TbDeviceLaptop, TbShirt, TbRun, TbGrain } from 'react-icons/tb';

const IconWrapper = ({ children }) => (
  <div className="text-red-500 bg-red-50 p-2 rounded-md flex items-center justify-center shrink-0">
    {children}
  </div>
);

const categories = [
  { id: 1,  name: 'Honey',               icon: <IconWrapper><TbSoup className="w-5 h-5 stroke-[2]" /></IconWrapper>,         slug: '/products?cat=honey',       bg: 'bg-amber-50',   border: 'border-amber-200' },
  { id: 2,  name: 'Poultry & Meat',       icon: <IconWrapper><TbMeat className="w-5 h-5 stroke-[2]" /></IconWrapper>,         slug: '/products?cat=meat',        bg: 'bg-rose-50',    border: 'border-rose-200' },
  { id: 3,  name: 'Rice & Grains',        icon: <IconWrapper><TbPlant className="w-5 h-5 stroke-[2]" /></IconWrapper>,        slug: '/products?cat=rice',        bg: 'bg-green-50',   border: 'border-green-200' },
  { id: 4,  name: 'Oil',                  icon: <IconWrapper><TbBottle className="w-5 h-5 stroke-[2]" /></IconWrapper>,       slug: '/products?cat=oil',         bg: 'bg-yellow-50',  border: 'border-yellow-200' },
  { id: 5,  name: 'Spices',               icon: <IconWrapper><TbPepper className="w-5 h-5 stroke-[2]" /></IconWrapper>,       slug: '/products?cat=spices',      bg: 'bg-red-50',     border: 'border-red-200' },
  { id: 6,  name: 'Super Foods',          icon: <IconWrapper><TbLeaf className="w-5 h-5 stroke-[2]" /></IconWrapper>,         slug: '/products?cat=superfoods',  bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 7,  name: 'Tea & Snacks',         icon: <IconWrapper><TbCup className="w-5 h-5 stroke-[2]" /></IconWrapper>,          slug: '/products?cat=tea',         bg: 'bg-orange-50',  border: 'border-orange-200' },
  { id: 8,  name: 'Nuts & Dates',         icon: <IconWrapper><TbGrain className="w-5 h-5 stroke-[2]" /></IconWrapper>,      slug: '/products?cat=nuts',        bg: 'bg-amber-50',   border: 'border-amber-300' },
  { id: 9,  name: 'Pickle',               icon: <IconWrapper><TbLemon className="w-5 h-5 stroke-[2]" /></IconWrapper>,        slug: '/products?cat=pickles',     bg: 'bg-lime-50',    border: 'border-lime-200' },
  { id: 10, name: 'Fruits & Veg',         icon: <IconWrapper><TbApple className="w-5 h-5 stroke-[2]" /></IconWrapper>,        slug: '/products?cat=fruits',      bg: 'bg-green-50',   border: 'border-green-300' },
  { id: 11, name: 'Electronics',          icon: <IconWrapper><TbDeviceLaptop className="w-5 h-5 stroke-[2]" /></IconWrapper>, slug: '/products?cat=electronics', bg: 'bg-blue-50',    border: 'border-blue-200' },
  { id: 12, name: 'Shoes',                icon: <IconWrapper><TbRun className="w-5 h-5 stroke-[2]" /></IconWrapper>,          slug: '/products?cat=shoes',       bg: 'bg-purple-50',  border: 'border-purple-200' },
  { id: 13, name: 'Clothing',             icon: <IconWrapper><TbShirt className="w-5 h-5 stroke-[2]" /></IconWrapper>,        slug: '/products?cat=clothing',    bg: 'bg-pink-50',    border: 'border-pink-200' },
];

const FeaturedCategories = () => {
  return (
    // Only shown on mobile — on desktop the sidebar in HeroBanner handles category nav
    <section className="py-6 bg-white lg:hidden border-b border-gray-100">
      <div className="max-w-[1536px] w-full mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 border-l-4 border-[#0A3D2A] pl-3 uppercase tracking-wide">
            Categories
          </h3>
          <Link to="/products" className="text-xs font-semibold text-[#0A3D2A] hover:text-red-600">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={cat.slug}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 ${cat.bg} ${cat.border} shadow-sm hover:shadow-md transition-all gap-1.5 group`}
              >
                <span className="group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700 text-center leading-tight">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
