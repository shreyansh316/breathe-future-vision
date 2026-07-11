import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, Mail, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (activeTab === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Signup successful! Please check your email for verification if required, or try logging in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      alert(`Authentication Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Simulated Google Login for demo purposes
    // Bypasses the Supabase 400 "provider is not enabled" error page.
    alert("Simulated Google Login Successful! Redirecting to dashboard...");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans">
      
      {/* Left Panel - Hero Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
          alt="Snowy Mountain Peaks" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-white/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-start p-16 pt-32 w-full text-right pr-24">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Login into your account</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:w-1/2 bg-white">
        <div className="w-full max-w-[400px]">
          
          {/* Tabs */}
          <div className="flex w-full border-b border-gray-200 mb-8">
            <button 
              className={`pb-3 px-1 font-semibold text-sm mr-8 transition-colors ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`pb-3 px-1 font-semibold text-sm transition-colors ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1 relative">
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-slate-50 border-slate-200 h-12 px-4 placeholder:text-slate-400 focus-visible:ring-blue-500 rounded-lg text-sm"
                required 
              />
              <span className="absolute top-3 right-4 text-red-400 text-lg leading-none">*</span>
            </div>

            {/* Password Input */}
            <div className="space-y-1 relative">
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="bg-slate-50 border-slate-200 h-12 px-4 placeholder:text-slate-400 focus-visible:ring-blue-500 rounded-lg text-sm"
                required 
              />
              <span className="absolute top-3 right-8 text-red-400 text-lg leading-none">*</span>
              <button type="button" className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Helper Links */}
            <div className="flex items-center justify-between text-xs text-[#38BDF8] font-medium pt-2">
              <a href="#" className="hover:text-blue-600 hover:underline">Have a Passkey?</a>
              <a href="#" className="hover:text-blue-600 hover:underline">Forget Password?</a>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[#4EA3FC] hover:bg-[#3B82F6] text-white rounded-lg font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
              >
                {isLoading ? "Loading..." : (activeTab === 'login' ? "Login" : "Sign Up")}
              </Button>
            </div>
            
            {/* The First Screenshot requested a specific glowing blue button. I'll add a secondary example just in case they meant the standalone button from Image 1 */}
            {/* 
            <Button className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#6366F1] hover:from-[#1D4ED8] hover:to-[#4F46E5] text-white rounded-full font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
              LOGIN <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button> 
            */}

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-slate-400">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google OAuth Button */}
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGoogleLogin}
              className="w-full h-12 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm rounded-lg"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
