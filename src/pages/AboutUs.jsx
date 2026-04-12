import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Truck, Users, Heart, Award } from 'lucide-react';

const values = [
  { icon: Leaf,       title: 'Pure & Organic',         desc: 'We source only verified organic and natural products directly from trusted Bangladeshi farmers and producers.',  color: 'bg-green-100 text-green-700' },
  { icon: ShieldCheck, title: 'Quality Guaranteed',    desc: 'Every product passes our strict quality check before it reaches your doorstep. No compromise.',                   color: 'bg-blue-100 text-blue-700' },
  { icon: Truck,       title: 'Fast Delivery',          desc: 'From your cart to your kitchen — delivered fresh within 24 hours across Dhaka and major Bangladeshi cities.',      color: 'bg-amber-100 text-amber-700' },
  { icon: Users,       title: 'Community First',        desc: 'We support local farmers and micro-entrepreneurs, building a stronger food supply chain for Bangladesh.',         color: 'bg-purple-100 text-purple-700' },
  { icon: Heart,       title: 'Customer Love',          desc: 'Our 24/7 support team ensures a seamless shopping experience. Your satisfaction is our #1 priority.',            color: 'bg-red-100 text-red-700' },
  { icon: Award,       title: 'Trusted Since 2022',     desc: 'Thousands of happy families trust Redleaf-BD daily for their grocery needs. Join Bangladesh\'s growing community.', color: 'bg-orange-100 text-orange-700' },
];

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '500+',    label: 'Products Available' },
  { value: '24h',     label: 'Delivery Time' },
  { value: '99%',     label: 'Satisfaction Rate' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const AboutUs = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0A3D2A] via-[#116638] to-[#0A3D2A] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🌿 About Redleaf-BD
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Bangladesh's Most Trusted<br />
              <span className="text-red-400">Grocery Delivery</span> Platform
            </h1>
            <p className="text-green-100 text-lg max-w-2xl mx-auto leading-relaxed">
              Redleaf-BD connects Bangladeshi families with premium, organic grocery products — from honey and rice to spices and oil — delivered fresh to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0A3D2A] py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-green-300 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <span className="text-[#0A3D2A] font-bold text-sm uppercase tracking-widest mb-2 block">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Bringing Purity Back<br />to Your Kitchen 🍚
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In a market full of adulterated products, Redleaf-BD was born with a simple mission: provide Bangladeshi families with genuine, pure, and fresh groceries they can trust. We work directly with local farmers, cooperatives, and verified producers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every product on our platform — from Khaas Honey Sachets to premium Katari rice — is handpicked, quality tested, and delivered with care. Because you deserve nothing but the best.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full"
            >
              <div className="rounded-2xl overflow-hidden border-4 border-green-100 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=700"
                  alt="Fresh groceries"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#0A3D2A] font-bold text-sm uppercase tracking-widest mb-2 block">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0A3D2A] to-[#116638] text-white text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Order Fresh?</h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">
            Join thousands of happy families who trust Redleaf-BD for their daily grocery needs.
          </p>
          <a
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all text-lg"
          >
            Shop Now →
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
