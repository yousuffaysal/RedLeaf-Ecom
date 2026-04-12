import React from 'react';
import { PackageSearch, ShieldCheck, DollarSign, Leaf, Container, Users, PlayCircle, Search } from 'lucide-react';

const Export = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[350px] md:h-[450px] bg-sky-100 flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=1600&q=80" 
              alt="Cargo Ship Header" 
              className="w-full h-full object-cover object-right opacity-60" 
           />
           {/* Gradient overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-12 relative z-10 w-full">
           <div className="max-w-xl">
              <h2 className="text-xl md:text-2xl text-gray-700 font-medium mb-1 drop-shadow-sm">From the Heart of</h2>
              <h1 className="text-4xl md:text-7xl font-black text-[#0A3D2A] mb-2 tracking-tight drop-shadow-sm">Bangladesh</h1>
              <h2 className="text-lg md:text-xl text-gray-700 font-medium mb-4 drop-shadow-sm text-right max-w-sm">to Your Shelf</h2>
              
              <h3 className="text-3xl md:text-5xl font-black text-amber-600 tracking-wider drop-shadow-sm">EXPORT-READY</h3>
              <p className="text-xl md:text-2xl font-bold text-gray-600 mt-1 mb-8 drop-shadow-sm">Halal-Certified Groceries</p>
              
              <div className="bg-[#0A3D2A] inline-block px-4 py-1 rounded text-white text-xs font-bold tracking-widest mb-1 shadow-sm">
                 GET IN TOUCH
              </div>
              <p className="text-2xl font-bold text-[#0A3D2A]">+88 01730 715 062</p>
           </div>
        </div>
      </section>

      {/* 2. About Block */}
      <section className="py-12 bg-white container mx-auto px-4 max-w-6xl mt-8 rounded-xl shadow-sm border border-gray-100">
         <h3 className="text-2xl font-bold text-[#0A3D2A] mb-4 border-b pb-2">About Redleaf-BD Export</h3>
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-gray-600 text-sm md:text-base leading-relaxed">
               <p><strong className="text-gray-900">Redleaf-BD</strong> is a purpose-driven food brand from Bangladesh, committed to delivering safe, natural, and high-quality food products to conscious consumers worldwide. Founded by visionary entrepreneurs, our export division ensures global standards of safety, packaging, and halal practices.</p>
               <button className="mt-6 px-6 py-2 bg-[#0A3D2A] hover:bg-green-800 text-white font-semibold rounded transition-colors text-sm">
                  View Certificates
               </button>
            </div>
            {/* Certification Badge Mock */}
            <div className="md:w-72 bg-[#072F20] rounded-xl p-6 text-white flex flex-col gap-3 shadow-lg transform hover:-translate-y-1 transition-transform">
               <div className="flex justify-between items-center mb-2 border-b border-white/20 pb-2">
                 <ShieldCheck className="w-8 h-8 text-amber-400" />
                 <span className="font-bold">ISO 22000:2018</span>
               </div>
               <div className="flex justify-between text-sm"><span>Halal Certified</span> <span className="font-bold">Yes</span></div>
               <div className="flex justify-between text-sm"><span>Export Capacity</span> <span className="font-bold">100+ SKUs</span></div>
               <div className="flex justify-between text-sm"><span>Countries Reached</span> <span className="font-bold">12+</span></div>
               <div className="flex justify-between text-sm"><span>Satisfied Buyers</span> <span className="font-bold">50+ B2B</span></div>
            </div>
         </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-12 container mx-auto px-4 max-w-6xl">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureBox icon={<PackageSearch className="w-8 h-8" />} title="OEM solutions" desc="With custom branding & packaging" />
            <FeatureBox icon={<ShieldCheck className="w-8 h-8" />} title="Food safety" desc="Assurance meeting global standards" />
            <FeatureBox icon={<DollarSign className="w-8 h-8" />} title="Competitive pricing" desc="With ethical sourcing" />
            <FeatureBox icon={<Leaf className="w-8 h-8" />} title="Naturally grown" desc="Chemical-free ingredients" />
            <FeatureBox icon={<Container className="w-8 h-8" />} title="Mixed container loading" desc="Facility available" />
            <FeatureBox icon={<Users className="w-8 h-8" />} title="Social impact" desc="Through farmer empowerment" />
         </div>
      </section>

      {/* 4. Videography Blocks */}
      <section className="py-12 bg-white container mx-auto px-4 max-w-6xl">
         <h3 className="text-xl font-bold text-[#0A3D2A] mb-6 border-b border-gray-200 pb-2">How We Ensure Food Safety</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VideoCard 
               bgImage="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80" 
               title="Redleaf-BD Customer Review" 
            />
            <VideoCard 
               bgImage="https://images.unsplash.com/photo-1582038753761-ad81d45ff2d6?auto=format&fit=crop&w=600&q=80" 
               title="ISO Certificate & Lab Tours" 
            />
            <VideoCard 
               bgImage="https://images.unsplash.com/photo-1587049352851-8d4e891345d9?auto=format&fit=crop&w=600&q=80" 
               title="Pure Honey Extraction Process" 
            />
         </div>
      </section>

      {/* 5. Most Demanding Product */}
      <section className="py-12 bg-gray-50 container mx-auto px-4 max-w-6xl">
         <h3 className="text-xl font-bold text-[#0A3D2A] mb-6">Most Demanding Product</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductDemandingCard title="Aromatic & Puffed Rice" />
            <ProductDemandingCard title="Honey" />
            <ProductDemandingCard title="Spices" />
            <ProductDemandingCard title="Mustard Oil" />
         </div>
         <div className="flex flex-col items-center gap-3 mt-10">
            <button className="px-8 py-3 bg-[#0A3D2A] text-white font-bold rounded shadow hover:bg-green-800 transition-colors">DOWNLOAD FULL CATALOGUE</button>
            <button className="px-8 py-3 bg-white border border-[#0A3D2A] text-[#0A3D2A] font-bold rounded shadow hover:bg-gray-100 transition-colors">REQUEST A QUOTE</button>
         </div>
      </section>

      {/* 6. Success Handover Gallery */}
      <section className="py-12 bg-white container mx-auto px-4 max-w-6xl">
         <h3 className="text-xl font-bold text-[#0A3D2A] mb-6 border-b border-gray-200 pb-2">Some Successful Handover</h3>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=400&q=80" alt="Pallets" className="rounded-xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1530587191344-0c5a2c286e08?auto=format&fit=crop&w=400&q=80" alt="Warehouse Workers" className="rounded-xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=400&q=80" alt="Container Stack" className="rounded-xl w-full h-48 object-cover" />
         </div>
      </section>
      
    </div>
  );
};

const FeatureBox = ({ icon, title, desc }) => (
   <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
      <div className="text-gray-700 mb-4">{icon}</div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
   </div>
);

const VideoCard = ({ bgImage, title }) => (
   <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer shadow-sm shadow-[#0A3D2A]/20">
      <img src={bgImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
         <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#0A3D2A] to-transparent p-3">
         <p className="text-white font-semibold text-sm truncate">{title}</p>
      </div>
   </div>
);

const ProductDemandingCard = ({ title }) => (
   <div className="bg-sky-50 rounded-xl p-4 flex flex-col items-center justify-center h-48 border border-sky-100 hover:border-sky-300 transition-colors">
      <div className="w-full bg-[#0A3D2A] text-white text-xs font-bold text-center py-1 rounded-sm mb-auto">
         {title}
      </div>
      <PackageSearch className="w-16 h-16 text-gray-300 mt-2" />
   </div>
);

export default Export;
