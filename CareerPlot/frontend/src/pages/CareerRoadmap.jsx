import { motion } from 'framer-motion';
import { CheckCircle, Circle, Map as MapIcon } from 'lucide-react';

const mockRoadmap = [
  {
    week: 1,
    focus: "React & Advanced JS",
    tasks: [
      { id: 1, title: "Master React Hooks (useMemo, useCallback)", category: "Development", completed: true },
      { id: 2, title: "Build a Custom Hook", category: "Projects", completed: true },
      { id: 3, title: "Solve 10 Array/String problems on LeetCode", category: "DSA", completed: false },
    ]
  },
  {
    week: 2,
    focus: "System Design & Node.js",
    tasks: [
      { id: 4, title: "Understand Event Loop deeply", category: "Development", completed: false },
      { id: 5, title: "Design a URL Shortener (System Design)", category: "System Design", completed: false },
      { id: 6, title: "Mock Interview - Backend focus", category: "Interview", completed: false },
    ]
  },
  {
    week: 3,
    focus: "AWS & Deployment",
    tasks: [
      { id: 7, title: "Deploy app to AWS EC2", category: "Projects", completed: false },
      { id: 8, title: "Study AWS S3 and CloudFront", category: "Development", completed: false },
    ]
  },
  {
    week: 4,
    focus: "Final Polish & Soft Skills",
    tasks: [
      { id: 9, title: "Update Resume with new projects", category: "Soft Skills", completed: false },
      { id: 10, title: "Behavioral Mock Interview", category: "Interview", completed: false },
    ]
  }
];

export default function CareerRoadmap() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-primary-500" />
            30-Day Action Plan
          </h2>
          <p className="text-slate-400">Personalized roadmap based on your skill gaps for "Full Stack Developer".</p>
        </div>
        <div className="bg-surface border border-slate-700/50 px-4 py-2 rounded-lg text-center">
          <span className="block text-2xl font-bold text-primary-500">20%</span>
          <span className="text-xs text-slate-400">Completed</span>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {mockRoadmap.map((week, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-slate-800 text-slate-400 group-[.is-active]:bg-primary-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {index + 1}
            </div>

            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-slate-700/50 p-6 rounded-xl shadow">
              <h3 className="text-lg font-bold text-white mb-1">Week {week.week}: {week.focus}</h3>
              <div className="space-y-3 mt-4">
                {week.tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{task.title}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded-full">{task.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
