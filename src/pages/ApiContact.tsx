import React, { useState } from 'react';
import { GlobalHeader } from '@/components/GlobalHeader';
import { AppFooter } from '@/components/AppFooter';
import { Mail, MapPin, Send, Terminal, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ApiContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent Successfully",
        description: "Our API team will contact you shortly with access credentials.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#121416] text-white flex flex-col selection:bg-sky-500/30">
      <GlobalHeader />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16 md:py-24">
        
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Terminal className="w-3 h-3 mr-2" /> Developer APIs
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Enterprise AQI <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Solutions</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Looking for high-fidelity air quality monitoring data? Fill out the form below and our engineers will provision your API keys instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#1a1d20] border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-1">Email Address</h4>
                    <a href="mailto:info@aqi.in" className="text-sky-400 hover:text-sky-300 transition-colors">info@aqi.in</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-1">Office Location</h4>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      Crown Heights, 7th Floor, 706,<br/>
                      Sector - 10, Rohini,<br/>
                      New Delhi 110085, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-sky-600 to-blue-800 p-8 rounded-3xl border border-sky-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full"></div>
              <Terminal className="w-8 h-8 text-white/50 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">REST API & WebSockets</h3>
              <p className="text-sky-100/80 text-sm leading-relaxed">
                Our APIs provide ultra-low latency access to 7,900+ ground nodes and Sentinel-5P satellite rasters. Request your credentials today.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#1a1d20] border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Request Access</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Full Name <span className="text-rose-500">*</span></label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-[#121416] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                  />
                </div>
                
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Phone Number <span className="text-rose-500">*</span></label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#121416] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Email & Organisation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Email <span className="text-rose-500">*</span></label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full bg-[#121416] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Organisation</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    className="w-full bg-[#121416] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Purpose of Contact */}
              <div className="mb-8">
                <label className="text-sm font-semibold text-slate-300 block mb-4">Purpose of Contact</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Products', 'Data', 'Business', 'Others'].map((purpose) => (
                    <label key={purpose} className="flex items-center space-x-2 bg-[#121416] border border-slate-700 p-3 rounded-xl cursor-pointer hover:border-sky-500/50 transition-colors">
                      <input type="radio" name="purpose" value={purpose} className="text-sky-500 focus:ring-sky-500 bg-slate-800 border-slate-600" />
                      <span className="text-sm text-slate-300">{purpose}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <label className="text-sm font-semibold text-slate-300">Write your message here <span className="text-rose-500">*</span></label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about your use case and data requirements..."
                  className="w-full bg-[#121416] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </main>

      <AppFooter />
    </div>
  );
};

export default ApiContact;
