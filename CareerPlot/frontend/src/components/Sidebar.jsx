import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Upload, Mic, Map, Briefcase, Settings } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Upload Resume', path: '/upload', icon: Upload },
  { name: 'Interview Room', path: '/interview', icon: Mic },
  { name: 'Job Match', path: '/match', icon: Briefcase },
  { name: 'Career Roadmap', path: '/roadmap', icon: Map },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-surface border-r border-slate-700/50 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          CareerPilot AI
        </h1>
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative',
                isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary-500/10 border border-primary-500/20 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5 relative z-10" />
              <span className="font-medium relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700/50">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}
