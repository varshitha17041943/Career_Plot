import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-6 z-10">
      <div className="flex items-center bg-background border border-slate-700 rounded-lg px-3 py-1.5 w-64">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder-slate-500"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-slate-400">Software Engineer</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
