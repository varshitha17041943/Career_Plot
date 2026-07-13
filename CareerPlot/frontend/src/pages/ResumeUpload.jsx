import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!file || !role) return;
    setIsUploading(true);

    // Simulate API call and Agent workflow delay
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Start Your Placement Journey</h2>
        <p className="text-slate-400">Upload your resume and select a target role. Our AI Agents will analyze your profile and generate a roadmap.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-slate-700/50 rounded-2xl p-8 shadow-xl"
      >
        <div className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Job Role</label>
            <input 
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Full Stack Developer, Data Scientist..."
              className="w-full bg-background border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Resume (PDF)</label>
            <div 
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors ${
                file ? 'border-primary-500 bg-primary-500/5' : 'border-slate-700 hover:border-primary-500/50 hover:bg-white/5'
              }`}
            >
              <input 
                type="file" 
                accept=".pdf"
                className="hidden" 
                id="resume-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                {file ? (
                  <>
                    <div className="w-16 h-16 bg-primary-500/20 text-primary-500 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8" />
                    </div>
                    <span className="text-white font-medium">{file.name}</span>
                    <span className="text-sm text-slate-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <span className="text-white font-medium mb-1">Click to upload or drag and drop</span>
                    <span className="text-sm text-slate-400">PDF files only (Max 5MB)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || !role || isUploading || isSuccess}
            className="w-full py-4 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing via AI Workflow...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Analysis Complete! Redirecting...
              </>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
