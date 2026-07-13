import { motion } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Target, Trophy, BrainCircuit, Activity } from 'lucide-react';

const mockRadarData = [
  { subject: 'React', A: 90, fullMark: 100 },
  { subject: 'Node.js', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'DSA', A: 85, fullMark: 100 },
  { subject: 'MongoDB', A: 80, fullMark: 100 },
  { subject: 'AWS', A: 40, fullMark: 100 },
];

const mockProgressData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 89 },
];

export default function Dashboard() {
  const stats = [
    { label: 'Readiness Score', value: '89%', icon: Trophy, color: 'text-primary-500' },
    { label: 'ATS Score', value: '92', icon: Target, color: 'text-blue-500' },
    { label: 'Job Match %', value: '85%', icon: BrainCircuit, color: 'text-purple-500' },
    { label: 'Interviews Prep', value: '4/5', icon: Activity, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, John!</h2>
        <p className="text-slate-400">Here's your placement preparation summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-xl p-5 border border-slate-700/50 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 bg-background rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface rounded-xl p-6 border border-slate-700/50 col-span-1"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Skill Radar</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar name="Skills" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-surface rounded-xl p-6 border border-slate-700/50 col-span-1 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Interview Progress</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#22c55e' }}
                />
                <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* AI Suggestions Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-surface to-background border border-primary-500/30 rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary-400" />
          AI Insight
        </h3>
        <p className="text-slate-300 leading-relaxed max-w-3xl">
          Based on your latest mock interview, you're strong in React fundamentals but struggle slightly with System Design concepts. Focus your next 3 days on the "System Design" module in your roadmap. Your overall hiring probability is currently <strong>High</strong>.
        </p>
      </motion.div>
    </div>
  );
}
