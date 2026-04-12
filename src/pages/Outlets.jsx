import React, { useState } from 'react';
import { PhoneCall, MapPin } from 'lucide-react';

const Outlets = () => {
  const [activeTab, setActiveTab] = useState('Dhaka');

  const tabs = ['Dhaka', 'Chattogram', 'Sylhet', 'Cumilla'];

  const dhakaOutlets = [
    { name: 'Mohammadpur Outlet', address: 'Mohammadia Housing Main Road, Dhaka 1207', phone: '01713348339' },
    { name: 'Shukrabad Outlet', address: 'Ground Floor, 100/A, Raisa Bhaban, Side of Metro Shopping Mall', phone: '01713422231' },
    { name: 'Shyamoli Outlet', address: 'Samata Plaza, 9/KA, PC Culture Housing Society, Ring Road', phone: '01730715051' },
    { name: 'Bosila 40 Feet Outlet', address: 'Rajdhani Housing ltd, Holding - U/A, Bosila Garden City Bridge', phone: '01805443202' },
    { name: 'Mirpur 10 Outlet', address: 'Shataibi Bhabon, Plot - 18, Road No - 1, Senpara Parbata', phone: '01730715054' },
    { name: 'Gopibag Outlet', address: '93/B, R. K. Mission Road, East Side of Rail Gate, Gopibag', phone: '01730715057' },
    { name: 'Mirpur 60 Feet Outlet', address: '22, IS Sorobag, Mirpur - 2', phone: '01805978395' },
    { name: 'Banasree Outlet', address: 'House - 43, Road - 4, Block - C, Banasree', phone: '01730715053' },
    { name: 'Banasree A Outlet', address: 'House - 13, NS Road, Block - A, Banasree, Dhaka 1219', phone: '01805883161' },
    { name: 'Rupnagar Outlet', address: 'Shop No 2, Holding no 39, Rupnagar Residential Block', phone: '01730715061' },
    { name: 'Gulshan Outlet', address: 'Shop No - 5, K-72/A, C, Gulshan View Tower', phone: '01730715055' },
    { name: 'Uttara Outlet', address: 'House - 97, Road - 1/80, Sector - 14, Uttara', phone: '01730715052' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans py-12">
      <div className="container mx-auto px-4 max-w-6xl">
         
         <div className="mb-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Outlets</h1>
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
               {tabs.map(tab => (
                 <button 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={`pb-3 text-sm font-bold transition-colors whitespace-nowrap ${
                     activeTab === tab 
                     ? 'text-[#0A3D2A] border-b-2 border-[#0A3D2A]' 
                     : 'text-gray-500 hover:text-gray-700'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeTab === 'Dhaka' ? dhakaOutlets.map((outlet, idx) => (
              <div key={idx} className="bg-[#118B3E] rounded-lg p-5 flex flex-col items-center text-center shadow-sm">
                 <h3 className="text-white font-bold text-sm mb-2">{outlet.name}</h3>
                 <p className="text-white/80 text-[10px] mb-4 min-h-[30px] leading-relaxed">{outlet.address}</p>
                 <p className="text-white font-bold text-xs mb-5">{outlet.phone}</p>
                 
                 <div className="w-full flex flex-col gap-2 mt-auto">
                    <button className="w-full py-1.5 bg-white text-[#118B3E] font-bold text-xs rounded shadow flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors">
                       <PhoneCall className="w-3.5 h-3.5" /> Call Now
                    </button>
                    <button className="w-full py-1.5 bg-[#09692D] text-white font-bold text-xs rounded shadow flex items-center justify-center gap-1.5 hover:bg-[#075323] transition-colors border border-[#09692D]">
                       <MapPin className="w-3.5 h-3.5" /> VIEW MAP
                    </button>
                 </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-semibold">
                No outlets currently listed for {activeTab}.
              </div>
            )}
         </div>

      </div>
    </div>
  );
};

export default Outlets;
