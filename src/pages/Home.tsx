import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Leaf, Map, Activity, ShieldCheck, Truck, Quote, Loader2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Home() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNavigation = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonials = [
    {
      quote: "CityWaste has completely transformed how we handle sanitation. We've reduced our fleet fuel consumption by 30% in just six months.",
      author: "Sarah Jenkins",
      role: "Director of Public Works, Metro City",
      initials: "SJ"
    },
    {
      quote: "The predictive analytics are a game-changer. We no longer wait for citizens to complain about overflowing bins; we fix it before it happens.",
      author: "David Chen",
      role: "Smart City Initiative Lead",
      initials: "DC"
    },
    {
      quote: "An incredibly intuitive command center. Our dispatchers were up to speed in days, and the automated routing saves us hours every morning.",
      author: "Marcus Thorne",
      role: "Operations Manager, EcoWaste Solutions",
      initials: "MT"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-900/10 blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.6)]">
            <Truck className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <span className="font-bold text-xl tracking-wider uppercase">City<span className="text-blue-400">Waste</span></span>
        </div>
        <Button onClick={handleNavigation} disabled={isNavigating} variant="outline" className="border-white/20" aria-label="Enter Command Center">
          {isNavigating ? <Loader2 className="w-4 h-4 mr-2 animate-spin inline" aria-hidden="true" /> : null}
          {isNavigating ? 'Connecting...' : 'Enter Command Center'}
        </Button>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              System Online v2.4
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Smart City
              </span> Waste
            </h1>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform urban sanitation with real-time IoT monitoring, AI-driven route optimization, and predictive analytics.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" onClick={handleNavigation} disabled={isNavigating} className="h-14 px-8 text-lg" aria-label="Launch Dashboard">
                {isNavigating ? (
                  <><Loader2 className="mr-2 w-5 h-5 animate-spin inline" aria-hidden="true" /> Initializing...</>
                ) : (
                  <>Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" /></>
                )}
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold tracking-tight">The Urban Waste Crisis</h2>
              <p className="text-lg text-white/60">
                Traditional waste collection relies on static routes, leading to overflowing bins, wasted fuel, and increased carbon emissions. Cities need a dynamic, data-driven approach.
              </p>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> 40% of collections are unnecessary
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> High fuel consumption and emissions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Overflowing bins cause health hazards
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px]" />
              <h3 className="text-2xl font-bold mb-4 text-green-400">The Intelligent Solution</h3>
              <p className="text-white/70 mb-6">
                CityWaste deploys IoT sensors in every bin, transmitting real-time fill levels to our centralized command center.
              </p>
              
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10 relative h-48 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1000&auto=format&fit=crop" 
                  alt="Smart city network visualization" 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/5">
                  <Activity className="w-6 h-6 text-green-400" />
                  <div>
                    <h4 className="font-medium">Real-time Monitoring</h4>
                    <p className="text-sm text-white/50">Live data from 10,000+ endpoints</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/5">
                  <Map className="w-6 h-6 text-blue-400" />
                  <div>
                    <h4 className="font-medium">Dynamic Routing</h4>
                    <p className="text-sm text-white/50">AI-optimized collection paths</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Command Center Capabilities</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Everything you need to manage city-wide sanitation efficiently.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Map, title: "Live Fleet Tracking", desc: "Monitor garbage trucks and active routes in real-time on a dark-themed interactive map." },
                { icon: Activity, title: "Predictive Analytics", desc: "Machine learning models predict when bins will overflow before it happens." },
                { icon: ShieldCheck, title: "Automated Dispatch", desc: "Automatically assign the nearest truck to critical overflow zones." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <feature.icon className="w-10 h-10 text-blue-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-16">Proven Environmental Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "30%", label: "Fuel Reduction" },
              { value: "45%", label: "Time Saved" },
              { value: "0", label: "Overflows" },
              { value: "12k", label: "Tons CO2 Saved" }
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Trusted by Smart Cities</h2>
              <p className="text-white/60 max-w-2xl mx-auto">See how municipalities are transforming their waste management.</p>
            </div>
            
            <div className="relative h-[380px] md:h-[280px] max-w-4xl mx-auto mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-center"
                >
                  <Quote className="w-12 h-12 text-blue-500/20 absolute top-8 right-8" aria-hidden="true" />
                  <p className="text-xl md:text-2xl text-white/90 mb-8 relative z-10 leading-relaxed italic">"{testimonials[currentTestimonial].quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600/40 to-green-600/40 border border-white/10 flex items-center justify-center font-bold text-white/90 text-lg">
                      {testimonials[currentTestimonial].initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{testimonials[currentTestimonial].author}</h4>
                      <p className="text-white/50">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
                <button 
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-black/50 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-black/50 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Everything you need to know about the CityWaste platform.</p>
          </div>
          <div className="space-y-4">
            <FAQItem 
              question="How do the IoT sensors work?" 
              answer="Our sensors use ultrasonic technology to measure bin fill levels in real-time. They are battery-powered, weather-resistant, and transmit data securely via cellular networks to the command center." 
            />
            <FAQItem 
              question="Can it integrate with our existing garbage trucks?" 
              answer="Yes, CityWaste provides an API and a driver mobile app that works independently of your vehicle hardware, making it easy to deploy across mixed fleets." 
            />
            <FAQItem 
              question="What is the typical ROI for a city?" 
              answer="Most municipalities see a return on investment within 12-18 months. This is achieved through a 30-40% reduction in fuel costs and optimized labor hours." 
            />
            <FAQItem 
              question="Is the city data secure?" 
              answer="Absolutely. All data is encrypted end-to-end. Our platform complies with major data protection regulations and uses enterprise-grade security protocols." 
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center relative">
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full max-w-3xl mx-auto" />
          <div className="relative z-10">
            <h2 className="text-5xl font-bold tracking-tight mb-8">Ready to upgrade your city?</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Experience the future of urban sanitation management today.
            </p>
            <Button size="lg" onClick={handleNavigation} disabled={isNavigating} className="h-14 px-10 text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)]" aria-label="Enter Command Center">
              {isNavigating ? (
                <><Loader2 className="mr-2 w-5 h-5 animate-spin inline" aria-hidden="true" /> Connecting...</>
              ) : (
                'Enter Command Center'
              )}
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 CityWaste Systems. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1" aria-label="About Us">About Us</a>
            <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1" aria-label="Contact">Contact</a>
            <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1" aria-label="Privacy Policy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 bg-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-white/60 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
