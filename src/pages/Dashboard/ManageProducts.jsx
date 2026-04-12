import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Pencil, Trash2, Search, X, Check, Image as ImageIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CATEGORIES = ['Fresh Honey', 'Premium Rice', 'Mustard Oil', 'Organic Spices', 'Lentils & Pulses', 'Poultry & Meat', 'Dairy Items', 'Other'];

const EMPTY_FORM = { title: '', category: '', price: '', originalPrice: '', unit: '', image: '', description: '', inStock: true };

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState({});

  const { data: result = { products: [] }, isLoading, refetch } = useQuery({
    queryKey: ['admin-products', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?search=${search}&limit=100`);
      return res.data || { products: [] };
    },
  });

  const products = result.products || [];

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.category)     e.category = 'Required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required';
    if (!form.unit.trim())  e.unit = 'Required';
    setFormErr(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => { setForm(EMPTY_FORM); setFormErr({}); setEditId(null); setModal('add'); };
  const openEdit = (p) => {
    setForm({ title: p.title, category: p.category, price: p.price, originalPrice: p.originalPrice || '', unit: p.unit, image: p.image || '', description: p.description || '', inStock: p.inStock !== false });
    setFormErr({});
    setEditId(p._id);
    setModal('edit');
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    const payload = { ...form, price: Number(form.price), originalPrice: Number(form.originalPrice) || 0 };
    try {
      if (modal === 'add') {
        await axiosSecure.post('/products', payload);
      } else {
        await axiosSecure.put(`/products/${editId}`, payload);
      }
      await refetch();
      setModal(null);
      Swal.fire({ icon: 'success', title: modal === 'add' ? 'Product Added!' : 'Product Updated!', showConfirmButton: false, timer: 1500 });
    } catch {
      Swal.fire({ icon: 'error', title: 'Failed to save product', confirmButtonColor: '#0A3D2A' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (product) => {
    Swal.fire({
      title: 'Delete Product?',
      text: `"${product.title}" will be permanently deleted.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/products/${product._id}`);
        await refetch();
        Swal.fire({ icon: 'success', title: 'Deleted!', showConfirmButton: false, timer: 1200 });
      }
    });
  };

  const inputCls = (field) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]/30 focus:border-[#0A3D2A] ${formErr[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0A3D2A] flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
            <p className="text-sm text-gray-500">{products.length} products total</p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#0A3D2A] hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-md"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D2A]/30"
        />
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin w-10 h-10 border-4 border-[#0A3D2A] border-t-transparent rounded-full" />
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-semibold mb-4">No products yet</p>
          <button onClick={openAdd} className="bg-[#0A3D2A] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-800 transition">
            Add First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['#', 'Product', 'Category', 'Price', 'Unit', 'Stock', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {products.map((p, i) => (
                    <motion.tr
                      key={p._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-gray-50/50 transition"
                    >
                      <td className="px-4 py-3.5 text-gray-400 text-xs font-medium">{i + 1}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {p.image ? (
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 text-xs truncate max-w-[160px]">{p.title}</p>
                            {p.description && <p className="text-gray-400 text-xs truncate max-w-[160px]">{p.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-block px-2 py-0.5 bg-green-50 text-green-800 text-xs rounded-full font-medium">{p.category}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-red-600 text-sm">৳{p.price}</p>
                        {p.originalPrice > 0 && <p className="text-xs text-gray-400 line-through">৳{p.originalPrice}</p>}
                      </td>
                      <td className="px-4 py-3.5 text-gray-600 text-xs">{p.unit}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.inStock !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {p.inStock !== false ? <><Check className="h-3 w-3"/>In Stock</> : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
                <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl transition">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Product Title *</label>
                  <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} className={inputCls('title')} placeholder="Khaas Honey Sachet" />
                  {formErr.title && <p className="text-xs text-red-500 mt-1">{formErr.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Category *</label>
                    <select value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} className={inputCls('category')}>
                      <option value="">Select…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {formErr.category && <p className="text-xs text-red-500 mt-1">{formErr.category}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Unit *</label>
                    <input value={form.unit} onChange={e => setForm(f=>({...f,unit:e.target.value}))} className={inputCls('unit')} placeholder="1 kg, 500ml…" />
                    {formErr.unit && <p className="text-xs text-red-500 mt-1">{formErr.unit}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Sale Price (৳) *</label>
                    <input type="number" min="0" value={form.price} onChange={e => setForm(f=>({...f,price:e.target.value}))} className={inputCls('price')} placeholder="214" />
                    {formErr.price && <p className="text-xs text-red-500 mt-1">{formErr.price}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Original Price (৳)</label>
                    <input type="number" min="0" value={form.originalPrice} onChange={e => setForm(f=>({...f,originalPrice:e.target.value}))} className={inputCls('originalPrice')} placeholder="240" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Image URL</label>
                  <input value={form.image} onChange={e => setForm(f=>({...f,image:e.target.value}))} className={inputCls('image')} placeholder="https://…" />
                  {form.image && <img src={form.image} alt="preview" className="mt-2 h-20 rounded-lg object-cover border border-gray-100" onError={e=>e.target.style.display='none'} />}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} className={`${inputCls('description')} resize-none`} placeholder="Short product description…" />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(f=>({...f,inStock:!f.inStock}))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.inStock ? 'bg-[#0A3D2A]' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.inStock ? 'translate-x-6' : ''}`} />
                  </button>
                  <span className="text-sm font-medium text-gray-700">{form.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>

              <div className="flex gap-3 p-5 border-t border-gray-100">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-[#0A3D2A] text-white text-sm font-bold hover:bg-green-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/>Saving…</> : <><Check className="h-4 w-4"/>{modal==='add'?'Add Product':'Save Changes'}</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageProducts;
