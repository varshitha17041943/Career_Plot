import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Target, Briefcase } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary-500/30">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          CareerPilot
        </div>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/dashboard" className="hover:text-primary-400 transition">Dashboard</Link>
          <Link to="/dashboard" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition">Login</Link>
          <Link to="/dashboard" className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)] transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center relative">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-primary-300 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          Powered by Lemma Agentic Workflow
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
        >
          Your Ultimate AI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
            Placement Copilot
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mb-12"
        >
          Stop jumping between platforms. Analyze your resume, practice mock interviews, get personalized roadmaps, and find job matches—all powered by intelligent AI agents collaborating together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <Link 
            to="/upload" 
            className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all hover:scale-105"
          >
            Upload Resume <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/dashboard" 
            className="px-8 py-4 bg-surface hover:bg-surface/80 border border-slate-700 rounded-full font-semibold text-lg transition-all"
          >
            View Demo
          </Link>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="bg-surface/50 border-t border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Resume Analyzer", desc: "Extracts skills, calculates ATS score, and suggests improvements.", icon: Bot },
            { title: "Interview Coach", desc: "Interactive AI mock interviews with real-time feedback and scoring.", icon: Target },
            { title: "Career Roadmap", desc: "Generates a 30-day personalized learning plan based on your weak areas.", icon: Briefcase },
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/50 border border-slate-700/50 p-8 rounded-2xl hover:border-primary-500/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary-500/10 text-primary-400 rounded-xl flex items-center justify-center mb-6">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
