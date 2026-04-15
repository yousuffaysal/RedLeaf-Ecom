import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Leaf, Star } from 'lucide-react';

import SocialLogin from '../components/SocialLogin';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => { loadCaptchaEnginge(6); }, []);

    const onSubmit = (data) => {
        if (!termsAccepted) {
            Swal.fire({ title: 'Agree to Terms', icon: 'warning', confirmButtonColor: '#dc2626' });
            return;
        }
        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({ title: 'Welcome back!', icon: 'success', showConfirmButton: false, timer: 1500 });
                navigate(from, { replace: true });
            })
            .catch(() => {
                Swal.fire({ title: 'Login Failed', text: 'Invalid email or password', icon: 'error', confirmButtonColor: '#dc2626' });
            });
    };

    const handleValidateCaptcha = () => {
        const captchaValue = document.getElementById('captchaInput')?.value;
        if (validateCaptcha(captchaValue)) {
            setCaptchaVerified(true);
            Swal.fire({ icon: 'success', title: 'Verified!', showConfirmButton: false, timer: 1000 });
        } else {
            setCaptchaVerified(false);
            Swal.fire({ icon: 'error', title: 'Wrong Captcha', text: 'Try again', confirmButtonColor: '#dc2626' });
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden font-['Poppins',sans-serif]">

            {/* ══ LEFT PANEL — White, Logo, Brand Story ══ */}
            <div className="hidden lg:flex w-1/2 h-full flex-col relative overflow-hidden bg-white">
                {/* Dot-grid texture */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.08) 1.5px, transparent 1.5px)',
                        backgroundSize: '28px 28px'
                    }}
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-50 blur-3xl opacity-60 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
                    <Link to="/">
                        <img src="https://ik.imagekit.io/2lax2ytm2/Logo-v1%20(1).png" alt="Redleaf-BD" className="h-20 xl:h-24 w-auto object-contain" />
                    </Link>

                    <div className="flex-1 flex flex-col justify-center mt-8">
                        <div className="mb-3 inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                            <Leaf size={12} /><span>100% Fresh & Organic</span>
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mt-3">
                            Shop <span className="text-red-600">Fresh.</span><br />
                            Live <span className="text-red-600">Healthy.</span>
                        </h1>
                        <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-xs">
                            Premium quality groceries delivered to your doorstep. No chemicals. No compromise.
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            {[
                                { icon: <ShieldCheck size={16} className="text-red-500" />, text: 'Formalin-free products, certified' },
                                { icon: <Star size={16} className="text-yellow-500" />, text: 'Rated 4.9/5 by 10,000+ customers' },
                                { icon: <Leaf size={16} className="text-green-500" />, text: 'Sourced directly from local farmers' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                    <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">{item.icon}</div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-30" />
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">New here?</p>
                        <p className="text-white font-bold text-base mb-4">Create a free account today</p>
                        <Link to="/signup" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-400/20">
                            Get Started Free <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

                {/* ══ RIGHT PANEL — Red background, full-width form ══ */}
            <div className="flex-1 h-full bg-gradient-to-br from-red-600 to-red-800 flex flex-col relative overflow-hidden">

                {/* Red background textures */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                        backgroundSize: '22px 22px'
                    }}
                />
                <div className="absolute top-1/4 -right-32 w-96 h-96 bg-red-500 rounded-full blur-[100px] opacity-40 pointer-events-none" />
                <div className="absolute bottom-0 -left-20 w-80 h-80 bg-red-900 rounded-full blur-[100px] opacity-50 pointer-events-none" />

                {/* Header Strip */}
                <div className="relative z-10 px-10 xl:px-20 pt-16 pb-6 shrink-0 text-center lg:text-left">
                    <div className="lg:hidden mb-6">
                        <img src="https://ik.imagekit.io/2lax2ytm2/Logo-v1%20(1).png" alt="Redleaf-BD" className="h-16 w-auto mx-auto object-contain brightness-0 invert" />
                    </div>
                    <h2 className="text-white font-black text-4xl xl:text-5xl leading-none drop-shadow-md tracking-tight">Sign In</h2>
                    <p className="text-red-100 text-sm font-medium mt-2">Welcome back to Redleaf-BD</p>
                </div>

                {/* Form Wrapper — sits directly on red background */}
                <div className="relative z-10 flex-1 w-full overflow-y-auto no-scrollbar">
                    <div className="px-10 xl:px-20 pb-16 flex flex-col justify-center h-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto w-full">

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email address"
                                {...register("email", { required: true })}
                                className="w-full px-5 py-4 text-sm font-bold bg-white/95 border-none rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder:text-gray-400 transition-all shadow-xl shadow-black/10"
                            />

                            {/* Password & Forgot Password */}
                            <div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                        className="w-full px-5 py-4 text-sm font-bold bg-white/95 border-none rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder:text-gray-400 transition-all shadow-xl shadow-black/10"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <div className="text-right mt-1.5 pr-2">
                                    <Link to="/forgot-password" className="text-xs text-yellow-400 hover:text-yellow-300 font-bold hover:underline decoration-yellow-400/50 underline-offset-4 transition-all">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {/* Captcha Row */}
                            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl shadow-black/10">
                                <div className="shrink-0 bg-gray-900/60 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-inner overflow-hidden">
                                    <div className="scale-90 origin-left">
                                        <LoadCanvasTemplate />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2 min-w-0">
                                    <input
                                        type="text"
                                        id="captchaInput"
                                        placeholder="Type captcha"
                                        className="w-full px-4 py-3 text-[13px] font-bold bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-400 shadow-inner transition-all"
                                    />
                                    <button type="button" onClick={handleValidateCaptcha}
                                        className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 ${captchaVerified ? 'bg-green-500 text-white' : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'}`}>
                                        {captchaVerified ? '✓ Verified' : 'Verify'}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
                                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-5 h-5 rounded border-none text-yellow-400 focus:ring-yellow-400 accent-yellow-400 cursor-pointer shadow-sm" />
                                <span className="text-xs text-red-50 font-medium">
                                    I agree to the{' '}
                                    <Link to="/terms" target="_blank" className="text-yellow-300 hover:text-yellow-100 font-bold underline decoration-yellow-400/30 underline-offset-2">Terms & Conditions</Link>
                                </span>
                            </label>

                            {/* Submit + Google (Vertical Stacking) */}
                            <div className="pt-2 space-y-2">
                                <button
                                    type="submit"
                                    disabled={!termsAccepted}
                                    className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Sign In <ArrowRight size={16} />
                                </button>
                                <div className="w-full -mt-2">
                                    {/* SocialLogin contains its own 'OR' divider the daisyUI way */}
                                    <SocialLogin />
                                </div>
                            </div>

                            {/* Mobile Footer */}
                            <div className="flex justify-center pt-2">
                                <Link to="/signup" className="text-xs font-bold text-white hover:text-yellow-300 lg:hidden">
                                    Don't have an account? Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;