import { motion } from 'framer-motion';
import { Briefcase, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function JobMatch() {
  const matchData = {
    role: "Full Stack Developer",
    score: 85,
    probability: "High",
    matchingSkills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    missingSkills: ["Docker", "AWS", "Redis"],
    certifications: ["AWS Certified Developer Associate"],
    projects: ["Build a scalable microservices backend"]
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-primary-500" />
          Job Match Analysis
        </h2>
        <p className="text-slate-400">See how your current skills align with your target role.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Match Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 bg-gradient-to-br from-surface to-slate-800 border border-slate-700/50 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-xl font-semibold text-white mb-6">Target Role: {matchData.role}</h3>
          
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
                <circle 
                  cx="64" cy="64" r="60" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={377} 
                  strokeDashoffset={377 - (377 * matchData.score) / 100}
                  className="text-primary-500 transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{matchData.score}%</span>
              </div>
            </div>
            
            <div>
              <p className="text-slate-400 mb-2">Hiring Probability</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-400 font-semibold text-lg">
                <CheckCircle2 className="w-5 h-5" />
                {matchData.probability}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Items */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 bg-surface border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-semibold text-white mb-4">Recommended Actions</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <ChevronRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                Complete Docker basics
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <ChevronRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                Build microservices project
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <ChevronRight className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                Revise System Design
              </li>
            </ul>
          </div>
          <button className="w-full mt-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium">
            View Full Report
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-slate-700/50 rounded-2xl p-6"
        >
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary-500" />
            Matching Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchData.matchingSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-400 border border-primary-500/20 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Missing Skills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-slate-700/50 rounded-2xl p-6"
        >
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Skills to Improve
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchData.missingSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
