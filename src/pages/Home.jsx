import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import FeaturedCategories from '../components/Home/FeaturedCategories';
import PopularProducts from '../components/Home/PopularProducts';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      <main className="flex-grow">
        <HeroBanner />
        <FeaturedCategories />
        <PopularProducts />
        {/* We can add more sections here in the future like Impact Stories, News, etc. */}
      </main>
    </div>
  );
}

export default Home;