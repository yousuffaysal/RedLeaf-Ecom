import React from 'react';
import { ShieldCheck, TrendingUp, Landmark, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const HalalInvestment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. Hero Block */}
      <section className="relative w-full py-20 bg-[#072F20] text-center overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
               <pattern id="pattern-islamic" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                 <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="1"/>
               </pattern>
               <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-islamic)"></rect>
            </svg>
         </div>
         <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <h2 className="text-amber-500 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">Grow Your Wealth The Right Way</h2>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Shariah-Compliant Investment with Redleaf-BD</h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">Join our mission to provide pure, Halal, and safe food globally, while earning ethical, Riba-free returns through our transparent Mudarabah principles.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="bg-amber-500 text-[#072F20] px-8 py-3 rounded font-bold hover:bg-amber-400 transition-colors shadow-lg">Become an Investor</button>
               <button className="bg-transparent border border-gray-400 text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition-colors">Download Prospectus</button>
            </div>
         </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Investment Pillars</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
               <div className="w-16 h-16 bg-green-50 text-[#0A3D2A] rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">100% Halal Operations</h3>
               <p className="text-sm text-gray-600 leading-relaxed">Every transaction, sourcing method, and operational flow is rigorously vetted to ensure absolute Shariah compliance, free from Haram elements.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Mudarabah Profit Sharing</h3>
               <p className="text-sm text-gray-600 leading-relaxed">We operate on a transparent profit-sharing model (Mudarabah), where risk and reward are shared ethically between the business and the capital provider.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
               <div className="w-16 h-16 bg-yellow-50 text-amber-600 rounded-full flex items-center justify-center mb-6">
                  <Landmark className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Asset-Backed Growth</h3>
               <p className="text-sm text-gray-600 leading-relaxed">Your investments are directly tied to tangible, real-world assets—specifically our high-demand agricultural and grocery inventory.</p>
            </div>
         </div>
      </section>

      {/* 3. Inquiry Form */}
      <section className="py-16 bg-gray-100 border-t border-gray-200">
         <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
               
               <div className="md:w-2/5 bg-[#0A3D2A] p-8 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Register Your Interest</h3>
                    <p className="text-sm text-green-100 mb-8 leading-relaxed">Leave your details below and our investment relationship manager will contact you with our detailed Shariah-compliance board report and prospectus.</p>
                    <ul className="space-y-4 text-sm text-green-50 font-medium">
                       <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /> Minimum Investment: ৳5,00,000</li>
                       <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /> Contract Duration: 12-36 Months</li>
                       <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /> Expected ROI: Projected 14-18%</li>
                    </ul>
                  </div>
                  <div className="mt-8">
                     <FileText className="w-12 h-12 text-white/20" />
                  </div>
               </div>

               <div className="md:w-3/5 p-8">
                  <form className="flex flex-col gap-5">
                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Full Name</label>
                        <input type="text" className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#0A3D2A] text-sm" placeholder="Enter your full name" />
                     </div>
                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Email Address</label>
                        <input type="email" className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#0A3D2A] text-sm" placeholder="your@email.com" />
                     </div>
                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Phone Number</label>
                        <input type="tel" className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#0A3D2A] text-sm" placeholder="+880 1XXX XXXXXX" />
                     </div>
                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Intended Investment Capital (BDT)</label>
                        <select className="border-b border-gray-300 py-2 focus:outline-none focus:border-[#0A3D2A] text-sm bg-white">
                           <option>Select Range</option>
                           <option>5 Lakh - 10 Lakh</option>
                           <option>10 Lakh - 50 Lakh</option>
                           <option>50 Lakh+</option>
                        </select>
                     </div>
                     <button type="button" className="mt-4 bg-[#0A3D2A] hover:bg-green-800 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2">
                        Submit Inquiry <ArrowRight className="w-4 h-4" />
                     </button>
                  </form>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
};

export default HalalInvestment;
