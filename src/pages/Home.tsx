import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Map, Activity, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Home() {
  const navigate = useNavigate();

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
            <Truck className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-wider uppercase">City<span className="text-blue-400">Waste</span></span>
        </div>
        <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-white/20">
          Enter Command Center
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
              <Button size="lg" onClick={() => navigate('/dashboard')} className="h-14 px-8 text-lg">
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
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
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px]" />
              <h3 className="text-2xl font-bold mb-4 text-green-400">The Intelligent Solution</h3>
              <p className="text-white/70 mb-6">
                CityWaste deploys IoT sensors in every bin, transmitting real-time fill levels to our centralized command center.
              </p>
              <div className="space-y-4">
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

        {/* Final CTA */}
        <section className="py-32 px-6 text-center relative">
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full max-w-3xl mx-auto" />
          <div className="relative z-10">
            <h2 className="text-5xl font-bold tracking-tight mb-8">Ready to upgrade your city?</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Experience the future of urban sanitation management today.
            </p>
            <Button size="lg" onClick={() => navigate('/dashboard')} className="h-14 px-10 text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Enter Command Center
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        <p>© 2026 CityWaste Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
