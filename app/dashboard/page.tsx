'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Settings, User, Home, BarChart3, Workflow, Copy, Trash2, Edit3, LogOut, LogIn, Sparkles } from 'lucide-react';

interface WorkflowType {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  lastActive: string;
  color: string;
}

type DashboardSection = 'home' | 'workflows' | 'analytics' | 'settings' | 'signout';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSection, setCurrentSection] = useState<DashboardSection>('home');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [userName, setUserName] = useState('Alex Johnson');
  const [userEmail, setUserEmail] = useState('alex@example.com');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  // Mock workflows data with varied statuses
  const [workflows, setWorkflows] = useState<WorkflowType[]>([
    { id: '1', name: 'User Onboarding', status: 'active', progress: 78, lastActive: '2 min ago', color: 'from-purple-500 to-pink-500' },
    { id: '2', name: 'Content Pipeline', status: 'active', progress: 92, lastActive: '5 min ago', color: 'from-blue-500 to-cyan-500' },
    { id: '3', name: 'Analytics Flow', status: 'paused', progress: 45, lastActive: '1 hour ago', color: 'from-green-500 to-emerald-500' },
    { id: '4', name: 'Email Campaign', status: 'completed', progress: 100, lastActive: '3 hours ago', color: 'from-orange-500 to-red-500' },
    { id: '5', name: 'Data Processing', status: 'active', progress: 23, lastActive: '10 min ago', color: 'from-indigo-500 to-purple-500' },
    { id: '6', name: 'API Integration', status: 'paused', progress: 67, lastActive: '2 hours ago', color: 'from-teal-500 to-blue-500' },
  ]);

  useEffect(() => {
    // Check if user is authenticated (for now, check if they came from trial)
    const isTrialUser = sessionStorage.getItem('rawbify_trial_user');
    if (isTrialUser) {
      setIsAuthenticated(true);
    } else {
      // Show auth overlay if not authenticated
      setShowAuthOverlay(true);
    }

    // Set initial time on client side only
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthOption = (option: 'signin' | 'signup' | 'trial') => {
    setShowAuthOverlay(false);
    
    if (option === 'trial') {
      // Set trial user session
      sessionStorage.setItem('rawbify_trial_user', 'true');
      setIsAuthenticated(true);
    } else if (option === 'signin') {
      // Show sign in form (to be implemented)
      console.log('Show sign in form');
      // For now, redirect to landing page
      window.location.href = '/';
    } else if (option === 'signup') {
      // Show sign up form (to be implemented)
      console.log('Show sign up form');
      // For now, redirect to landing page
      window.location.href = '/';
    }
  };

  const renderAuthOverlay = () => (
    <AnimatePresence>
      {showAuthOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAuthOverlay(false)}
          />
          
          {/* Overlay Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 max-w-md w-full mx-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAuthOverlay(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
            >
              <span className="text-white text-lg">×</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-medium text-white mb-2">
                Welcome to <span className="text-purple-400">Rawbify</span>
              </h2>
              <p className="text-white/60">
                Choose how you'd like to access your dashboard
              </p>
            </div>

            {/* Authentication Options */}
            <div className="space-y-4">
              {/* Sign In Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthOption('signin')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center space-x-3"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </motion.button>

              {/* Use Trial Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthOption('trial')}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/20 flex items-center justify-center space-x-3"
              >
                <Sparkles className="w-5 h-5" />
                <span>Use Trial as Alex Johnson</span>
              </motion.button>

              {/* Sign Up Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAuthOption('signup')}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 p-4 rounded-xl font-medium transition-all duration-200 hover:bg-white/10 hover:text-white flex items-center justify-center space-x-3"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Up</span>
              </motion.button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                Already have an account? <span className="text-purple-400 cursor-pointer hover:underline">Sign in</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDuplicateWorkflow = (workflow: WorkflowType) => {
    const newWorkflow = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      status: 'paused' as const,
      progress: 0,
      lastActive: 'Just created'
    };
    setWorkflows([...workflows, newWorkflow]);
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter(w => w.id !== workflowId));
  };

  const handleRenameWorkflow = (workflowId: string) => {
    const newName = prompt('Enter new workflow name:');
    if (newName && newName.trim()) {
      setWorkflows(workflows.map(w => 
        w.id === workflowId ? { ...w, name: newName.trim() } : w
      ));
    }
  };

  const handleSignOut = () => {
    // Clear session and redirect to home
    sessionStorage.removeItem('rawbify_trial_user');
    window.location.href = '/';
  };

  // If not authenticated, show auth overlay
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        {/* Authentication Overlay */}
        {renderAuthOverlay()}

        {/* Ambient Light Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full pointer-events-none"></div>
      </div>
    );
  }

  const renderHomeSection = () => (
    <div className="text-center space-y-8">
      <div>
                 <h1 className="text-6xl font-light text-white mb-4">
           Welcome back, <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userName}</span>
         </h1>
         <p className="text-white/60 text-xl">
           Your <span className="font-semibold text-purple-400">Rawbify</span> workspace awaits
         </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <div className="text-3xl font-bold text-white mb-2">{workflows.filter(w => w.status === 'active').length}</div>
          <div className="text-white/60">Active Workflows</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <div className="text-3xl font-bold text-white mb-2">{workflows.filter(w => w.status === 'completed').length}</div>
          <div className="text-white/60">Completed</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <div className="text-3xl font-bold text-white mb-2">{Math.round(workflows.reduce((acc, w) => acc + w.progress, 0) / workflows.length)}%</div>
          <div className="text-white/60">Average Progress</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
      </div>

             {/* Go to Workflows Button */}
       <div className="max-w-md mx-auto">
         <button 
           onClick={() => setCurrentSection('workflows')}
           className="group w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
           type="button"
         >
           <div className="flex items-center justify-center space-x-3">
             <Workflow className="w-5 h-5" />
             <span>Go to your workflows</span>
           </div>
         </button>
       </div>

      {/* Recent Activity */}
      <div className="max-w-2xl mx-auto">
                 <h2 className="text-2xl font-medium text-white mb-6">Recent <span className="text-purple-400">Rawbify</span> Activity</h2>
        <div className="space-y-3">
          {workflows.slice(0, 3).map((workflow) => (
            <div key={workflow.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${getStatusColor(workflow.status)} rounded-full`}></div>
                <span className="text-white">{workflow.name}</span>
              </div>
              <span className="text-white/50 text-sm">{workflow.lastActive}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkflowsSection = () => (
    <div>
      <div className="text-center mb-12">
                 <h1 className="text-4xl font-semibold text-white mb-2">
           Your <span className="text-purple-400">Rawbify</span> Workflows
         </h1>
         <p className="text-white/60 text-lg">
           {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''} {searchQuery ? 'found' : 'total'}
         </p>
      </div>

             <div className="max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {filteredWorkflows.map((workflow, index) => (
            <div
              key={workflow.id}
              className={`group relative transform hover:scale-105 transition-all duration-500 hover:rotate-2 ${
                index % 2 === 1 ? 'mt-8' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative w-56 h-56">
                <div className={`absolute inset-0 bg-gradient-to-br ${workflow.color} rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500`}></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
                  
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 ${getStatusColor(workflow.status)} rounded-full ${workflow.status === 'active' ? 'animate-pulse' : ''}`}></div>
                  </div>

                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2">{workflow.name}</h3>
                      <p className="text-white/50 text-sm capitalize">{workflow.status}</p>
                    </div>

                    <div className="flex items-center justify-center my-4">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                          <circle
                            cx="16" cy="16" r="14"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-white/20"
                          />
                          <circle
                            cx="16" cy="16" r="14"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${workflow.progress * 0.88} 88`}
                            className="text-white transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{workflow.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-white/40 text-xs">{workflow.lastActive}</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => handleDuplicateWorkflow(workflow)}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200 group/btn"
                      title="Duplicate"
                    >
                      <Copy className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform duration-200" />
                    </button>
                    <button 
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="p-3 bg-white/20 rounded-full hover:bg-red-500/50 transition-colors duration-200 group/btn"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform duration-200" />
                    </button>
                    <button 
                      onClick={() => handleRenameWorkflow(workflow.id)}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200 group/btn"
                      title="Rename"
                    >
                      <Edit3 className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="group relative transform hover:scale-105 transition-all duration-500 hover:-rotate-2 mt-8">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border-2 border-dashed border-white/30 group-hover:border-white/50 transition-colors duration-500">
                <div className="h-full flex flex-col items-center justify-center space-y-4 cursor-pointer">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                                     <div className="text-center">
                     <h3 className="text-white font-medium text-lg">Create <span className="text-purple-400">Rawbify</span> Workflow</h3>
                     <p className="text-white/50 text-sm">Start something new</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-6xl font-light text-white mb-4">
          Analytics
        </h1>
        <p className="text-white/60 text-xl mb-8">
          Insights and metrics for your workflows
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-medium text-white mb-4">Coming Soon</h2>
          <p className="text-white/60 text-lg leading-relaxed">
            We're building powerful analytics to help you understand your workflow performance, 
            track productivity metrics, and optimize your processes.
          </p>
          <div className="mt-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm">In Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-white mb-4">
          <span className="text-purple-400">Rawbify</span> Settings
        </h1>
        <p className="text-white/60 text-xl">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-medium text-white">Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Company</label>
              <input
                type="text"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your company name"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium">
              Save Profile
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-medium text-white">Preferences</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Email Notifications</div>
                <div className="text-white/50 text-sm">Get updates about your workflows</div>
              </div>
              <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Dark Mode</div>
                <div className="text-white/50 text-sm">Use dark theme interface</div>
              </div>
              <div className="w-12 h-6 bg-purple-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform duration-200"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-medium">Auto-save</div>
                <div className="text-white/50 text-sm">Automatically save your work</div>
              </div>
              <div className="w-12 h-6 bg-purple-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform duration-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-medium text-white">Security</h2>
          </div>
          
          <div className="space-y-4">
            <button className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 text-left">
              <div className="font-medium">Change Password</div>
              <div className="text-white/50 text-sm">Update your account password</div>
            </button>
            
            <button className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 text-left">
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-white/50 text-sm">Add an extra layer of security</div>
            </button>
            
            <button className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 text-left">
              <div className="font-medium">API Keys</div>
              <div className="text-white/50 text-sm">Manage your API access</div>
            </button>
          </div>
        </div>

        {/* Billing & Usage */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 text-white font-bold">$</div>
            </div>
            <h2 className="text-2xl font-medium text-white">Billing</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-white font-medium">Current Plan</div>
              <div className="text-purple-400 font-semibold">Free Tier</div>
              <div className="text-white/50 text-sm mt-1">Up to 10 workflows per month</div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium">
              Upgrade Plan
            </button>
            
            <button className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white hover:bg-white/20 transition-all duration-200">
              View Usage
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home': return renderHomeSection();
      case 'workflows': return renderWorkflowsSection();
      case 'analytics': return renderAnalyticsSection();
      case 'settings': return renderSettingsSection();
      default: return renderWorkflowsSection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Command Palette - Top Center */}
      {currentSection === 'workflows' && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex items-center px-6 py-4 space-x-3">
              <Search className="w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Search workflows, create new, or run commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-white/50 border-0 outline-0 text-sm w-96"
              />
              <div className="flex space-x-2">
                <kbd className="px-2 py-1 text-xs text-white/50 bg-white/10 rounded border border-white/20">⌘</kbd>
                <kbd className="px-2 py-1 text-xs text-white/50 bg-white/10 rounded border border-white/20">K</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile - Top Right Floating */}
      <div className="absolute top-6 right-6 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{userName}</p>
              <p className="text-white/50 text-xs">{currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-24 pb-32 px-8">
        {renderCurrentSection()}
      </div>

      {/* Floating Navigation Dock - Bottom Center */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl px-6 py-4">
          <div className="flex items-center space-x-6">
                         {[
               { icon: Home, label: 'Home', section: 'home' as DashboardSection },
               { icon: Workflow, label: 'Workflows', section: 'workflows' as DashboardSection },
               { icon: BarChart3, label: 'Analytics', section: 'analytics' as DashboardSection },
               { icon: Settings, label: 'Settings', section: 'settings' as DashboardSection },
               { icon: LogOut, label: 'Sign Out', section: 'signout' as DashboardSection },
             ].map(({ icon: Icon, label, section }) => (
              <button
                key={label}
                                 onClick={() => {
                   if (section === 'signout') {
                     handleSignOut();
                   } else {
                     setCurrentSection(section);
                   }
                 }}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  currentSection === section 
                    ? 'bg-white/20 scale-110' 
                    : 'hover:bg-white/10 hover:scale-105'
                }`}
              >
                <Icon className={`w-6 h-6 transition-colors duration-200 ${
                  currentSection === section ? 'text-white' : 'text-white/60 group-hover:text-white'
                }`} />
                
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
                    {label}
                  </div>
                </div>

                {currentSection === section && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      {currentSection !== 'home' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button className="group w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Ambient Light Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full pointer-events-none"></div>
    </div>
  );
}