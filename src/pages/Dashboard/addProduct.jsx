import { useState } from 'react';
import { motion } from 'framer-motion';
import { PackagePlus, Check, Image as ImageIcon, Sparkles, Navigation } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Fresh Honey', 'Premium Rice', 'Mustard Oil', 'Organic Spices', 'Lentils & Pulses', 'Poultry & Meat', 'Dairy Items', 'Other'];

const EMPTY_FORM = { 
  title: '', category: '', price: '', originalPrice: '', 
  unit: '', image: '', description: '', highlights: '', inStock: true 
};

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.category)     e.category = 'Category is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid sale price required';
    if (!form.unit.trim())  e.unit = 'Unit/Size is required';
    setFormErr(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      Swal.fire({ title: 'Validation Error', text: 'Please fill all required fields correctly (*)', icon: 'error', confirmButtonColor: '#0A3D2A' });
      return;
    }
    
    setSaving(true);
    // Convert Highlights text to basic HTML bullet points if it contains line breaks, assuming it's plain text input
    let formattedHighlights = form.highlights;
    if (form.highlights && !form.highlights.includes('<')) {
        formattedHighlights = `<ul class="list-disc pl-5 space-y-2">` + form.highlights.split('\n').filter(l=>l.trim()).map(line => `<li>${line}</li>`).join('') + `</ul>`;
    }

    const payload = { 
        ...form, 
        price: Number(form.price), 
        originalPrice: Number(form.originalPrice) || 0,
        highlights: formattedHighlights
    };

    try {
      await axiosSecure.post('/products', payload);
      Swal.fire({ 
        icon: 'success', 
        title: 'Product Published!', 
        text: `${form.title} has been added successfully.`,
        showConfirmButton: true,
        confirmButtonColor: '#0A3D2A',
        confirmButtonText: 'Go to Products Page'
      }).then((res) => {
        if (res.isConfirmed) {
            navigate('/dashboard/manage-products');
        } else {
            setForm(EMPTY_FORM);
        }
      });
    } catch {
      Swal.fire({ icon: 'error', title: 'Failed to publish product', confirmButtonColor: '#0A3D2A' });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]/30 focus:border-[#0A3D2A] ${formErr[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A3D2A] to-green-700 flex items-center justify-center shadow-lg shadow-green-900/20">
            <PackagePlus className="h-7 w-7 text-white shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add New Product</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Create a new listing for your store</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Form Fields */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">General Information</h3>
            
            {/* Title */}
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Product Title <span className="text-red-500">*</span></label>
              <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} className={inputCls('title')} placeholder="e.g. Khaas Natural Egg" />
              {formErr.title && <p className="text-xs font-semibold text-red-500 mt-1.5">{formErr.title}</p>}
            </div>

            {/* Category & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Category <span className="text-red-500">*</span></label>
                <select value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} className={inputCls('category')}>
                  <option value="">Select Category…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {formErr.category && <p className="text-xs font-semibold text-red-500 mt-1.5">{formErr.category}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Unit / Size <span className="text-red-500">*</span></label>
                <input value={form.unit} onChange={e => setForm(f=>({...f,unit:e.target.value}))} className={inputCls('unit')} placeholder="e.g. 1 Dozen, 500gm, 1 Ltr" />
                {formErr.unit && <p className="text-xs font-semibold text-red-500 mt-1.5">{formErr.unit}</p>}
              </div>
            </div>

            {/* Descriptions */}
            <div className="pt-4">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Detailed Description</label>
              <textarea rows={4} value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} className={inputCls('description')} placeholder="Write a comprehensive description of the product..." />
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500"/> Product Highlights 
              </label>
              <textarea rows={4} value={form.highlights} onChange={e => setForm(f=>({...f,highlights:e.target.value}))} className={inputCls('highlights')} placeholder="Enter key highlights. Each line will be converted to a bullet point." />
              <p className="text-xs text-gray-400 mt-2">Example: 100% Organic\nNo added preservatives\nSourced directly from farmers</p>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Pricing Config */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
             <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Pricing</h3>
             <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Sale Price (৳) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                  <input type="number" min="0" value={form.price} onChange={e => setForm(f=>({...f,price:e.target.value}))} className={`pl-8 ${inputCls('price')}`} placeholder="e.g. 179" />
                </div>
                {formErr.price && <p className="text-xs font-semibold text-red-500 mt-1.5">{formErr.price}</p>}
             </div>
             <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Original Price (৳)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                  <input type="number" min="0" value={form.originalPrice} onChange={e => setForm(f=>({...f,originalPrice:e.target.value}))} className={`pl-8 ${inputCls('originalPrice')}`} placeholder="e.g. 195 (Optional)" />
                </div>
             </div>
          </div>

          {/* Media & Status */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Media & Status</h3>
            
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">Image Link</label>
              <input value={form.image} onChange={e => setForm(f=>({...f,image:e.target.value}))} className={inputCls('image')} placeholder="https://unsplash.com/..." />
              {form.image ? (
                <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 aspect-video flex items-center justify-center p-2">
                   <img src={form.image} alt="preview" className="h-full object-contain mix-blend-multiply" onError={e=>e.target.style.display='none'} />
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-gray-300 aspect-video flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <ImageIcon size={32} className="mb-2 opacity-50" />
                  <span className="text-xs font-medium">Image Preview</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
               <span className="text-sm font-bold text-gray-700 block">Inventory Status</span>
               <button
                  type="button"
                  onClick={() => setForm(f=>({...f,inStock:!f.inStock}))}
                  className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A3D2A] ${form.inStock ? 'bg-[#0A3D2A]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.inStock ? 'translate-x-6' : ''}`} />
                </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2">
             <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-4 rounded-2xl bg-[#0A3D2A] text-white text-base font-extrabold hover:bg-green-800 transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 active:scale-[0.98]"
              >
                {saving ? (
                  <><span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"/> Publishing...</>
                ) : (
                  <><Navigation size={20} className="mr-1"/> Publish Product</>
                )}
              </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AddProduct;
