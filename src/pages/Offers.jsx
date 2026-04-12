import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

const Offers = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Banner Section */}
      <div className="relative w-full overflow-hidden bg-[#0A3D2A] px-4 py-16 md:py-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
              <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                 <circle cx="20" cy="20" r="2" fill="currentColor"></circle>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
           </svg>
        </div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-400 rounded-full blur-3xl opacity-20"></div>

        <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          
          {/* Left Block - The curved pill shape text */}
          <div className="bg-white px-8 py-4 rounded-full border-4 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.4)] flex items-center gap-3 transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
             <Sparkles className="text-yellow-500 w-8 h-8 md:w-10 md:h-10 animate-pulse" />
             <h1 className="text-3xl md:text-5xl font-black text-[#0A3D2A] tracking-tight">স্পেশাল অফার !</h1>
             <Sparkles className="text-yellow-500 w-8 h-8 md:w-10 md:h-10 animate-pulse" />
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-1 h-24 bg-yellow-400 rounded-full"></div>

          {/* Right Block */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">রেডলিফ পণ্য পাচ্ছেন</h2>
            <h3 className="text-4xl md:text-6xl font-black text-yellow-400 drop-shadow-md">সাশ্রয়ী দামে</h3>
          </div>
        </div>
      </div>

      {/* Offers Grids */}
      <div className="container mx-auto px-4 mt-12 max-w-6xl">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Offer Card 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow group cursor-pointer border-l-4 border-l-red-500">
               <div className="flex items-center gap-2 mb-3">
                  <Tag className="text-red-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-gray-900">গুড়ে ১৭% ছাড়!</h3>
               </div>
               <p className="text-gray-600 text-sm leading-relaxed mb-4">
                 কেনা গুড়ে স্পেশাল অফার - ১৭% ছাড়ে পাচ্ছেন রেডলিফ বিডি এর স্পেশাল গুড়! 
               </p>
               <button className="mt-auto px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition-colors">
                  Shop Now
               </button>
            </div>

            {/* Offer Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow group cursor-pointer border-l-4 border-l-green-600">
               <div className="flex items-center gap-2 mb-3">
                  <Tag className="text-green-600 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-gray-900">হাঁসে চলছে ১০% ছাড়🎉</h3>
               </div>
               <p className="text-gray-600 text-sm leading-relaxed mb-4">
                 সকল ধরনের দেশি হাঁস পাচ্ছেন ১০% ছাড়ে! এ সুযোগ সীমিত সময়ের জন্য।
               </p>
               <button className="mt-auto px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-100 transition-colors">
                  Shop Now
               </button>
            </div>

            {/* Offer Card 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow group cursor-pointer border-l-4 border-l-yellow-500">
               <div className="flex items-center gap-2 mb-3">
                  <Tag className="text-yellow-600 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-gray-900">হানি কম্বো অফার!</h3>
               </div>
               <p className="text-gray-600 text-sm leading-relaxed mb-4">
                 ৩টি খাঁটি মধুর জার একত্রে কিনলে পাচ্ছেন ২০০ টাকা ফ্ল্যাট ডিসকাউন্ট এবং ফ্রি ডেলিভারি।
               </p>
               <button className="mt-auto px-4 py-2 bg-yellow-50 text-yellow-700 text-sm font-semibold rounded-lg hover:bg-yellow-100 transition-colors">
                  Shop Now
               </button>
            </div>

            {/* Offer Card 4 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow group cursor-pointer border-l-4 border-l-blue-500">
               <div className="flex items-center gap-2 mb-3">
                  <Tag className="text-blue-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-gray-900">প্রথম অর্ডারে ২০% ছাড়</h3>
               </div>
               <p className="text-gray-600 text-sm leading-relaxed mb-4">
                 রেডলিফ বিডি তে আপনার প্রথম অর্ডারের জন্য ব্যবহার করুন কুপন কোড <code className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">WELCOME20</code>.
               </p>
               <button className="mt-auto px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                  Shop Now
               </button>
            </div>

         </div>
      </div>
    </div>
  );
};

export default Offers;
