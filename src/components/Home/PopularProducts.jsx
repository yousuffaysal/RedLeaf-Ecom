import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from '../Shared/ProductCard';
import { Loader2 } from 'lucide-react';

const PopularProducts = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch top 4 popular products
  const { data: result = { products: [] }, isLoading } = useQuery({
    queryKey: ['popular-products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products?sort=popular&limit=4');
      return res.data || { products: [] };
    },
  });

  const products = result.products || [];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-[#0A3D2A] pl-3">
            Most Popular Items
          </h3>
          <Link 
            to="/products"
            className="text-sm font-semibold text-green-700 hover:text-red-600 transition-colors"
          >
            See More →
          </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
             <Loader2 className="animate-spin text-[#0A3D2A] h-8 w-8" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10 font-semibold bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            No popular products available right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
