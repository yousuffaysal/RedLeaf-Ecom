import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Leaf, Star, UploadCloud } from 'lucide-react';

import SocialLogin from "../components/SocialLogin";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    useEffect(() => { loadCaptchaEnginge(6); }, []);

    const handleValidateCaptcha = () => {
        const captchaValue = document.getElementById('signupCaptchaInput')?.value;
        if (validateCaptcha(captchaValue)) {
            setCaptchaVerified(true);
            Swal.fire({ icon: 'success', title: 'Verified!', showConfirmButton: false, timer: 1000 });
        } else {
            setCaptchaVerified(false);
            Swal.fire({ icon: 'error', title: 'Wrong Captcha', confirmButtonColor: '#dc2626' });
        }
    };

    const handleImageUpload = async (photo) => {
        const formData = new FormData();
        formData.append('image', photo);
        try {
            const response = await fetch(image_hosting_api, { method: 'POST', body: formData });
            const data = await response.json();
            return data.data.url;
        } catch { return null; }
    };

    const onSubmit = async (data) => {
        if (!termsAccepted) { Swal.fire({ title: 'Agree to Terms', icon: 'warning', confirmButtonColor: '#dc2626' }); return; }

        let photoURL = data.photoURL;
        if (data.photo && data.photo[0]) {
            photoURL = await handleImageUpload(data.photo[0]);
            if (!photoURL) { Swal.fire({ icon: 'error', title: 'Image Upload Failed', confirmButtonColor: '#dc2626' }); return; }
        }

        try {
            const result = await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoURL);
            const userInfo = { uid: result.user.uid, name: data.name, email: data.email, photoURL, emailVerified: false };
            const res = await axiosPublic.post("/users", userInfo);

            if (res.data.insertedId) {
                reset();
                await signOut(auth);
                await Swal.fire({
                    title: 'Account Created!',
                    text: `Check ${data.email} to verify before signing in.`,
                    icon: 'success',
                    confirmButtonColor: '#dc2626',
                    confirmButtonText: 'Go to Login',
                });
                navigate("/login");
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Signup Failed', text: error.message, confirmButtonColor: '#dc2626' });
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden font-['Poppins',sans-serif]">

            {/* ══ LEFT PANEL — White, Logo, Brand Story ══ */}
            <div className="hidden lg:flex w-1/2 h-full flex-col relative overflow-hidden bg-white">

                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(220,38,38,0.07) 1.5px, transparent 1.5px)',
                        backgroundSize: '28px 28px'
                    }}
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-50 blur-3xl opacity-60 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full p-10 xl:p-12">

                    <Link to="/" className="block">
                        <img
                            src="https://ik.imagekit.io/2lax2ytm2/Logo-v1%20(1).png"
                            alt="Redleaf-BD"
                            className="h-20 xl:h-24 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex-1 flex flex-col justify-center mt-6">
                        <div className="mb-2 inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                            <Leaf size={12} /><span>Join 10,000+ Happy Customers</span>
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mt-3">
                            Start Your<br/><span className="text-red-600">Fresh Journey</span>
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm leading-relaxed max-w-xs">
                            Create your account and get access to premium organic groceries delivered fresh to your home.
                        </p>

                        <div className="mt-6 flex flex-col gap-2.5">
                            {[
                                { icon: <ShieldCheck size={15} className="text-red-500" />, text: 'Formalin-free, certified products' },
                                { icon: <Star size={15} className="text-yellow-500" />, text: 'Free delivery on first order' },
                                { icon: <Leaf size={15} className="text-green-500" />, text: 'Directly sourced from trusted farmers' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                                    <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">{item.icon}</div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto bg-gray-900 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-600 rounded-full blur-2xl opacity-30" />
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">Already a member?</p>
                        <p className="text-white font-bold text-sm mb-3">Sign in to your account</p>
                        <Link to="/login" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-400/20">
                            Sign In <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Red, Form (Compact) ══ */}
            <div className="flex-1 h-full bg-gradient-to-br from-red-600 to-red-800 flex flex-col relative overflow-hidden">

                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '22px 22px'
                    }}
                />
                <div className="absolute top-1/4 -right-24 w-72 h-72 bg-red-500 rounded-full blur-[100px] opacity-50 pointer-events-none" />
                <div className="absolute bottom-10 -left-20 w-80 h-80 bg-red-900 rounded-full blur-[100px] opacity-50 pointer-events-none" />

                {/* Header Strip */}
                <div className="relative z-10 px-8 xl:px-14 pt-10 lg:pt-14 pb-4 shrink-0 text-center lg:text-left">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-4">
                        <img src="https://ik.imagekit.io/2lax2ytm2/Logo-v1%20(1).png" alt="Redleaf-BD" className="h-14 w-auto mx-auto object-contain brightness-0 invert" />
                    </div>
                    <h2 className="text-white font-black text-3xl xl:text-4xl leading-none drop-shadow-md tracking-tight">Create Account</h2>
                    <p className="text-red-100 text-xs font-medium mt-1.5">Fresh groceries delivered to you</p>
                </div>

                {/* Form Wrapper — sits directly on red background */}
                <div className="relative z-10 flex-1 w-full overflow-y-auto no-scrollbar">
                    <div className="px-8 xl:px-14 pb-12 flex flex-col justify-center h-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-xl mx-auto w-full">

                            {/* Name + Photo URL row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        {...register("name", { required: true })}
                                        className="w-full px-4 py-3 text-[13px] font-bold bg-white/95 border-none rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder:text-gray-400 transition-all shadow-xl shadow-black/10"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Photo URL"
                                        {...register("photoURL")}
                                        className="w-full px-4 py-3 pr-8 text-[13px] font-bold bg-white/95 border-none rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder:text-gray-400 transition-all shadow-xl shadow-black/10"
                                    />
                                    <UploadCloud size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email Address *"
                                {...register("email", { required: true })}
                                className="w-full px-4 py-3 text-[13px] font-bold bg-white/95 border-none rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder:text-gray-400 transition-all shadow-xl shadow-black/10"
                            />

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password (min 6 chars) *"
                                    {...register("password", { required: true, minLength: 6 })}
                                    className="w-full px-4 py-3 text-[13px] font-bold bg-white/95 border-none rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-gray-900 placeholder:text-gray-400 transition-all shadow-xl shadow-black/10"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Captcha Row */}
                            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl shadow-black/10 mt-1">
                                <div className="shrink-0 bg-gray-900/60 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-inner overflow-hidden">
                                    <div className="scale-90 origin-left">
                                        <LoadCanvasTemplate />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2 min-w-0">
                                    <input
                                        type="text"
                                        id="signupCaptchaInput"
                                        placeholder="Type captcha"
                                        className="w-full px-4 py-3 text-[13px] font-bold bg-white border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-400 shadow-inner transition-all"
                                    />
                                    <button type="button" onClick={handleValidateCaptcha}
                                        className={`w-full py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 ${captchaVerified ? 'bg-green-500 text-white' : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'}`}>
                                        {captchaVerified ? '✓ Verified' : 'Verify'}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-4 h-4 rounded border-none text-yellow-400 focus:ring-yellow-400 accent-yellow-400 cursor-pointer shadow-sm" />
                                <span className="text-[11px] text-red-50 font-medium">
                                    I agree to the{' '}
                                    <Link to="/terms" target="_blank" className="text-yellow-300 hover:text-yellow-100 font-bold underline decoration-yellow-400/30 underline-offset-2">Terms & Conditions</Link>
                                </span>
                            </label>

                            {/* Submit + Google */}
                            <div className="pt-2 space-y-2">
                                <button
                                    type="submit"
                                    disabled={!termsAccepted}
                                    className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Create Account <ArrowRight size={14} />
                                </button>
                                <div className="w-full -mt-2">
                                    <SocialLogin />
                                </div>
                            </div>

                            {/* Mobile footer */}
                            <div className="flex justify-center pt-2">
                                <Link to="/login" className="text-xs font-bold text-white hover:text-yellow-300 transition-all">
                                    Already have an account? Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;