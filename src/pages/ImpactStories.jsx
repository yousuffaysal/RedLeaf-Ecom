import React from 'react';
import { Target, Leaf, Search, TrendingUp, Sprout, ShieldCheck, HardHat, Store, HeartHandshake, MapPin } from 'lucide-react';

const ImpactStories = () => {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pt-8">
      
      {/* 1. Hero Block */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
         <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center shadow-inner">
            <div className="flex-1">
               <h1 className="text-3xl md:text-4xl font-bold text-[#0A3D2A] mb-2 leading-tight">Scaling Safe Food with Farmer</h1>
               <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 font-serif">Driven Traceability and Franchising Model</h2>
               
               <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                     <Target className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                     <p className="text-sm text-gray-700 leading-relaxed"><strong>Empowering Farmers:</strong> With cutting post-harvest losses, ensuring fair prices, and eliminating middlemen exploitation.</p>
                  </li>
                  <li className="flex items-start gap-3">
                     <Leaf className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                     <p className="text-sm text-gray-700 leading-relaxed"><strong>Removes more than 30 types of contaminants:</strong> from food through strict quality standards.</p>
                  </li>
                  <li className="flex items-start gap-3">
                     <Search className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                     <p className="text-sm text-gray-700 leading-relaxed"><strong>Unlocking Financing for production:</strong> ensuring safe food distribution.</p>
                  </li>
                  <li className="flex items-start gap-3">
                     <TrendingUp className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                     <p className="text-sm text-gray-700 leading-relaxed"><strong>Driving Investment Growth:</strong> through an expanding franchise network.</p>
                  </li>
               </ul>
            </div>
            
            <div className="md:w-1/3">
               <div className="rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                  <img src="https://images.unsplash.com/photo-1595856455110-38e55e8c9735?auto=format&fit=crop&w=600&q=80" alt="Clay Pot" className="w-full h-64 object-cover" />
               </div>
            </div>
         </div>
      </section>

      {/* 2. Process / SDG Diagram Simulation */}
      <section className="container mx-auto px-4 max-w-6xl mb-24 relative hidden md:block">
         <div className="flex items-center justify-between relative px-12">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10 w-48 text-center">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-green-200 text-green-600">
                  <Sprout className="w-10 h-10" />
               </div>
               <p className="text-xs font-bold text-gray-800">Climate Smart Farming with Emission Reduction</p>
               {/* SDG Flag */}
               <div className="absolute -top-16 bg-green-600 text-white w-20 h-20 shadow-md flex flex-col items-center justify-center border border-white p-2">
                  <span className="font-bold text-xs self-start">13</span>
                  <Leaf className="w-8 h-8" />
               </div>
            </div>

            {/* Line connecting Steps */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-green-200 -z-10 translate-y-[-2rem]"></div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10 w-48 text-center mt-32">
               <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-yellow-200 text-yellow-600">
                  <ShieldCheck className="w-10 h-10" />
               </div>
               <p className="text-xs font-bold text-gray-800">Ensures Food Safety with Quality Control</p>
               {/* SDG Flag */}
               <div className="absolute -bottom-16 bg-yellow-500 text-white w-20 h-20 shadow-md flex flex-col items-center justify-center border border-white p-2">
                  <span className="font-bold text-xs self-start">2</span>
                  <Target className="w-8 h-8" />
               </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10 w-48 text-center">
               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-red-200 text-red-600">
                  <HardHat className="w-10 h-10" />
               </div>
               <p className="text-xs font-bold text-gray-800">Creating jobs and ensuring quality control at local levels</p>
               {/* SDG Flag */}
               <div className="absolute -top-16 bg-red-700 text-white w-20 h-20 shadow-md flex flex-col items-center justify-center border border-white p-2">
                  <span className="font-bold text-xs self-start">8</span>
                  <TrendingUp className="w-8 h-8" />
               </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center relative z-10 w-48 text-center mt-32">
               <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-blue-200 text-blue-600">
                  <Store className="w-10 h-10" />
               </div>
               <p className="text-xs font-bold text-gray-800">Scaling Safe Food Access</p>
               {/* SDG Flag */}
               <div className="absolute -bottom-16 bg-[#071E40] text-white w-20 h-20 shadow-md flex flex-col items-center justify-center border border-white p-2">
                  <span className="font-bold text-xs self-start">17</span>
                  <HeartHandshake className="w-8 h-8" />
               </div>
            </div>

         </div>
      </section>

      {/* 3. Stats Section */}
      <section className="mt-auto bg-gray-50 border-t border-gray-200">
         <div className="container mx-auto px-4 max-w-6xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
               
               <div className="flex flex-col items-center p-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-500">
                     <Target className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-600 mb-1">Unique Customers Served</h4>
                  <p className="text-3xl font-black text-gray-900">200K+</p>
               </div>
               
               <div className="flex flex-col items-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-[#0A3D2A]">
                     <Sprout className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-600 mb-1">Farmers Engaged</h4>
                  <p className="text-3xl font-black text-gray-900">2000+</p>
               </div>
               
               <div className="flex flex-col items-center p-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
                     <MapPin className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-600 mb-1">Cities & Districts Reached</h4>
                  <p className="text-3xl font-black text-gray-900">11</p>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
};

export default ImpactStories;
