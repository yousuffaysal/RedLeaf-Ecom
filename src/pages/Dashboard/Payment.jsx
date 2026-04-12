import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen"
        >
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#0A3D2A] rounded-xl shadow-md">
                            <CreditCard className="text-white h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Secure Payment</h2>
                            <p className="text-gray-500 text-sm mt-1">Complete your order with a secure transaction</p>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Form Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="p-6 sm:p-8">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Payment;
