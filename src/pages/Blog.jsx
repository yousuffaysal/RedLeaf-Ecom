import React, { useState } from 'react';
import { MessageSquare, Eye, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [activeTab, setActiveTab] = useState('সব পোস্ট');

  const categories = [
    'সব পোস্ট', 'Vlog', 'কোরবানি', 'খাদ্যের গুণাগুণ', 'নিউট্রিশন', 'মৌসুমি ফল', 'রমজান', 'রূপচর্চা', 'রেসিপি', 'রোগ প্রতিরোধ', 'শীতকালীন সুস্থতা', 'হেলথ টিপস'
  ];

  const blogPosts = [
    {
      id: 1,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'সর্বরোগের মহৌষধ কালোজিরা তেল!',
      image: null,
      excerpt: 'November 10, 2020 কালো জিরার আমাদের সবারই পরিচিত। খাবারে একটু ভিন্ন স্বাদ আনতে কালো জিরার তুলনা নেই। কিন্তু কালো জিরার ব্যবহার শুধু খাবারের স্বাদ বৃদ্ধির জন্যই স...',
      comments: 0,
      views: 0
    },
    {
      id: 2,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'খাঁটি এবং প্রাকৃতিক মধু চেনা নিয়ে মধুর বিড়ম্বনা (পর্ব: ২)',
      image: null,
      excerpt: 'আমরা গত পর্বে বেশ কিছু পরীক্ষার কথা বলেছি যেগুলোর মাধ্যমে আসল মধু ও খাঁটি মধু নির্ণয় করতে গিয়ে ক্রেতা ভাইয়েরা চরমভাবে ধোকার শিকার হচ্ছি যা আমরা আগে জেন...',
      comments: 0,
      views: 0
    },
    {
      id: 3,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'খাঁটি এবং প্রাকৃতিক মধু চেনা নিয়ে মধুর বিড়ম্বনা (পর্ব: ১)',
      image: null,
      excerpt: 'আসছে শীতকাল। এই শীতে আপনার খাদ্য তালিকায় যোগ হবে খাঁটি ও প্রাকৃতিক মধু। কিন্তু, ভালো মানের খাঁটি মধু পাবেন কোথায় ? খাঁটি মধু বুঝবেন কীভাবে খাঁটি মধু চেনা...',
      comments: 0,
      views: 0
    },
    {
      id: 4,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'কীভাবে বুঝবেন, দুধে পানি মিশ্রিত আছে?',
      image: null,
      excerpt: 'খাঁটি দুধ চেনার উপায় জানতে চান? তাহলে আপনার জন্যই খাসফুডের আজকের এই আয়োজন। ভেজালমুক্ত দুধ কীভাবে চিনবেন? বয়স্কদের শরীরের জন্য আমাদের...',
      comments: 0,
      views: 0
    },
    {
      id: 5,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'কিটো ডায়েট: কী, কেন, কীভাবে?',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80',
      excerpt: 'অল্পদিনেই স্বাস্থ্যের আমূল পরিবর্তন করে দেখিয়ে দেওয়ায়, বর্তমানে বেশ পরিচিত এক নাম কিটো ডায়েট। নানারকম ডায়েটের মধ্য থেকে অনেকেই এখন এ ডায়েটকে বেছে নিচ্ছেন। কিটো...',
      comments: 0,
      views: 0
    },
    {
      id: 6,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'আপনার কেনা আম কি কেমিক্যাল মুক্ত?',
      image: null,
      excerpt: 'ফরমালিনমুক্ত আম যদি জিজ্ঞাসা করা হয় যে অফ মৌসুম ছাড়া আম কি কখনও খেয়েছেন? অনেকেই বলবেন খেয়েছি। দেখতে কেমন? খেতে কি মজার? বলবেন, একদমই না। তবে...',
      comments: 0,
      views: 0
    },
    {
      id: 7,
      date: '24 MAR',
      category: 'হেলথ টিপস',
      title: 'অতিরিক্ত খেয়ে ফেলে অস্বস্তিতে ভুগছেন? জেনে নিন সমাধান!',
      image: null,
      excerpt: 'খেতে আমরা সবাই কম বেশি ভালোবাসি। কিন্তু অনেক সময় দেখা যায় আমরা প্রয়োজনের অতিরিক্ত খেয়ে ফেলি। যার ফলে দেখা দেয় নানা ধরণের সমস্যা। যে কোন উৎসব...',
      comments: 0,
      views: 0
    },
    {
      id: 8,
      date: '24 MAR',
      category: 'শীতের আয়োজন',
      title: 'সরিষার তেলের উপকারিতা জেনে নিন।',
      image: null,
      excerpt: 'সরিষা বীজ থেকে তৈরি হয় সরিষার তেল এটা আমাদের সবারই জানা। কিন্তু সরিষার তেলের উপকারিতা জানে কজন? এটি গাঢ় হলুদ বর্ণের হয় এবং স্বাদের মত সামান্য ঝাঁঝালো...',
      comments: 0,
      views: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Top Background Mock */}
      <div className="w-full h-32 md:h-48 overflow-hidden bg-[#0A3D2A] relative">
         <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" 
            alt="Grocery Banner" 
            className="w-full h-full object-cover opacity-30"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">Redleaf Blog</h1>
         </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
         
         {/* Categories Navigation */}
         <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start mb-10 pb-4 border-b border-gray-200">
            {categories.map(category => (
               <button 
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`text-sm font-bold pb-1 transition-colors ${
                     activeTab === category 
                     ? 'text-[#5E9B3B] border-b-2 border-[#5E9B3B]' 
                     : 'text-gray-600 hover:text-[#5E9B3B]'
                  }`}
               >
                  {category}
               </button>
            ))}
         </div>

         {/* Blog Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogPosts.map(post => (
               <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative flex flex-col group overflow-hidden">
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white shadow-md border border-[#5E9B3B] text-center w-12 py-1 rounded">
                     <span className="block text-xl font-black text-gray-900 leading-none">{post.date.split(' ')[0]}</span>
                     <span className="block text-[10px] font-bold text-[#5E9B3B]">{post.date.split(' ')[1]}</span>
                  </div>

                  {/* Image Container */}
                  <div className="w-full h-48 bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                     {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     ) : (
                        <ImageIcon className="w-16 h-16 text-gray-200" strokeWidth={1} />
                     )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                     
                     <div className="mb-3">
                        <span className="bg-[#5E9B3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                           {post.category}
                        </span>
                     </div>
                     
                     <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#5E9B3B] transition-colors cursor-pointer">
                        {post.title}
                     </h2>
                     
                     <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                        <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer"><MessageSquare className="w-3.5 h-3.5" /> {post.comments}</span>
                        <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                     </div>
                     
                     <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                     </p>
                     
                     <Link to="#" className="text-[#5E9B3B] text-xs font-bold flex items-center gap-1 group-hover:text-green-700 mt-auto">
                        CONTINUE READING <ChevronRight className="w-3.5 h-3.5" />
                     </Link>
                  </div>
               </article>
            ))}
         </div>

      </div>
    </div>
  );
};

export default Blog;
