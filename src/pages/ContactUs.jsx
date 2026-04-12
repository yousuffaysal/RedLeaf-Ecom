import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import useAxiosPublic from '../hooks/useAxiosPublic';

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Name is required';
    if (!form.email.trim())   e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await axiosPublic.post('/contactCollection', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-gray-200 focus:ring-[#0A3D2A]/30 focus:border-[#0A3D2A] bg-white'
    }`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A3D2A] to-[#116638] py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block bg-white/10 border border-white/20 text-green-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📬 Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-green-200 max-w-xl mx-auto">
            Have a question, complaint or suggestion? We'd love to hear from you. Our team responds within 24 hours.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Let's Talk</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Whether it's a delivery concern or a partnership inquiry, our team is here to help every step of the way.
                </p>
              </div>

              {[
                { icon: Phone,  label: 'Phone',    value: '+880 1234-567890',          href: 'tel:+8801234567890' },
                { icon: Mail,   label: 'Email',    value: 'support@redleafbd.com',     href: 'mailto:support@redleafbd.com' },
                { icon: MapPin, label: 'Address',  value: '123 Green Valley Road, Banani, Dhaka-1213', href: '#' },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#0A3D2A]/30 hover:shadow-md transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0A3D2A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A3D2A] transition">
                    <Icon className="h-5 w-5 text-[#0A3D2A] group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-gray-800">{value}</p>
                  </div>
                </a>
              ))}

              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                <p className="text-sm text-green-800 font-semibold mb-1">⏰ Business Hours</p>
                <p className="text-sm text-green-700">Saturday – Thursday: 9 AM – 9 PM</p>
                <p className="text-sm text-green-700">Friday: 2 PM – 8 PM (after Juma)</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>

                {status === 'success' && (
                  <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! We'll get back to you within 24 hours.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Failed to send message. Please try again.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your full name" className={inputCls('name')} />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email *</label>
                      <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" className={inputCls('email')} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+880 1XXX-XXXXXX" className={inputCls('phone')} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Subject</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className={inputCls('subject')}>
                        <option value="">Choose a topic</option>
                        <option>Order Issue</option>
                        <option>Product Quality</option>
                        <option>Delivery Concern</option>
                        <option>Payment Problem</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your concern or question in detail..."
                      className={`${inputCls('message')} resize-none`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#0A3D2A] hover:bg-green-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                        Sending…
                      </>
                    ) : (
                      <><Send className="h-5 w-5" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
