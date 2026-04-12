import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import ProductCard from '../components/Shared/ProductCard';
import { Package, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState('');

  const { data: result = { products: [] }, isLoading } = useQuery({
    queryKey: ['public-products', search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?search=${search}&limit=100`);
      return res.data || { products: [] };
    },
  });

  const products = result.products || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-[#0A3D2A] pl-4">
              All Products
            </h1>
            <p className="text-gray-500 mt-2 pl-4">Discover our premium quality products</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]/30 focus:border-[#0A3D2A] transition-all bg-white"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-[#0A3D2A] border-t-transparent rounded-full" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-semibold mb-2">No products found</p>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
