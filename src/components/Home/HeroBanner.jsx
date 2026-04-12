import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HeroBanner = () => {
  const honeyDripRef = useRef(null);

  useEffect(() => {
    // GSAP slow drip animation for the honey shapes
    gsap.to('.drip', {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        from: 'random'
      }
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-green-50 to-orange-50 py-12 md:py-20 lg:py-28">
      {/* Decorative Honey/Leaf elements */}
      <div ref={honeyDripRef} className="absolute top-0 left-0 w-full h-12 flex justify-center gap-10 opacity-30 pointer-events-none z-0">
         <div className="drip w-8 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-full"></div>
         <div className="drip w-6 h-24 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-full hidden md:block"></div>
         <div className="drip w-10 h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-full"></div>
         <div className="drip w-4 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-b-full hidden lg:block"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-block bg-green-100 text-[#0A3D2A] px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-green-200">
              🌿 100% Organic & Fresh
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Fresh Groceries <br className="hidden md:block" />
              <span className="text-[#0A3D2A]">Delivered Fast</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6 drop-shadow-sm">
              ঘরে বসে তাজা মুদি সামগ্রী
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 text-base md:text-lg">
              Get the best quality rice, fresh honey, organic oil, and daily essentials delivered directly to your doorsteps.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-red-600/30 transition-all text-lg flex items-center gap-2 mx-auto md:mx-0"
            >
              Order Now <span className="font-sans">→</span>
            </motion.button>
          </motion.div>

          {/* Image/Mockup Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-lg relative"
          >
            {/* Visual placeholder for Hero Image */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 p-4 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A3D2A]/10 to-transparent rounded-2xl"></div>
              <div className="w-full h-full bg-gray-200 rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
                  alt="Fresh Groceries" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg flex items-center justify-between border border-white/50">
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded bg-[#0A3D2A] flex items-center justify-center text-xl">🍯</div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Fresh Honey</p>
                      <p className="text-xs text-green-600 font-semibold">Premium Quality</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">In Stock</div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full p-2 shadow-xl border border-gray-100 hidden md:block"
              >
                <img src="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=200" alt="Rice" className="w-full h-full rounded-full object-cover" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
