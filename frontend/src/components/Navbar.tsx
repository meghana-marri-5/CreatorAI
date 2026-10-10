import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Compass, 
  Briefcase, 
  FileText, 
  User, 
  Bookmark, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Layers,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isCreator, isBrand, logout, loginAsDemoCreator, loginAsDemoBrand } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080a10]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Demo Quick Bar */}
      <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-indigo-950 border-b border-indigo-500/20 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline font-medium">Hackathon Demo Mode:</span>
            <span className="text-slate-400">Current Role:</span>
            <span className="font-semibold text-brand-300 bg-brand-500/20 px-2 py-0.5 rounded border border-brand-500/30">
              {user ? (isBrand ? `🏢 Brand (${user.company_name || 'Apex Volt'})` : `🎨 Creator (${user.full_name})`) : '👤 Guest Visitor'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden md:inline text-[11px]">Instant Role Switch:</span>
            <button
              onClick={() => { loginAsDemoBrand(); navigate('/brand-dashboard'); }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${isBrand ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              🏢 Apex Volt (Brand)
            </button>
            <button
              onClick={() => { loginAsDemoCreator(); navigate('/creator-dashboard'); }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${isCreator ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              🎨 Elena (Creator)
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-accent-cyan p-0.5 shadow-glow-sm group-hover:shadow-glow-md transition-all">
              <div className="w-full h-full bg-[#080a10] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center">
                Creator<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-cyan">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider -mt-1 uppercase">Marketplace</span>
            </div>
          </Link>

          {/* Navigation Links based on role */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Common Public Navigation */}
            <Link
              to="/discover-creators"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/discover-creators') 
                  ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Explore Creators
            </Link>

            <Link
              to="/explore-projects"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive('/explore-projects') 
                  ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Explore Projects
            </Link>

            {/* Brand specific links */}
            {isBrand && (
              <>
                <Link
                  to="/brand-dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/brand-dashboard') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Brand Dashboard
                </Link>
                <Link
                  to="/ai-brief-builder"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    isActive('/ai-brief-builder') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-brand-400 hover:text-brand-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Brief Assistant
                </Link>
                <Link
                  to="/create-brief"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/create-brief') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Post Brief
                </Link>
                <Link
                  to="/project-management"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/project-management') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Projects & Status
                </Link>
              </>
            )}

            {/* Creator specific links */}
            {isCreator && (
              <>
                <Link
                  to="/creator-dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/creator-dashboard') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/creator-portfolio"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/creator-portfolio') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  My Portfolio
                </Link>
                <Link
                  to="/creator-profile-builder"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive('/creator-profile-builder') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Profile Builder
                </Link>
                <Link
                  to="/portfolio-assistant"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    isActive('/portfolio-assistant') 
                      ? 'text-brand-300 bg-brand-500/10 border border-brand-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
                  Portfolio AI
                </Link>
              </>
            )}

            {!user && (
              <a
                href="/#how-it-works"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
              >
                How It Works
              </a>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isBrand && (
              <Link
                to="/shortlist"
                className="p-2 text-slate-300 hover:text-brand-400 hover:bg-slate-800/60 rounded-lg transition"
                title="Saved Creators"
              >
                <Bookmark className="w-5 h-5" />
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 border border-slate-800 transition"
                >
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.full_name}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-semibold text-white leading-tight">{user.full_name}</div>
                    <div className="text-[11px] text-slate-400 capitalize">{user.role}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
                      Signed in as <strong className="text-white block">{user.email}</strong>
                    </div>

                    {isCreator && (
                      <>
                        <Link
                          to="/creator-dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Compass className="w-4 h-4 text-brand-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/creator-portfolio"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Layers className="w-4 h-4 text-brand-400" />
                          My Portfolio
                        </Link>
                        <Link
                          to="/creator-profile-builder"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <User className="w-4 h-4 text-brand-400" />
                          Edit Profile
                        </Link>
                      </>
                    )}

                    {isBrand && (
                      <>
                        <Link
                          to="/brand-dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Compass className="w-4 h-4 text-brand-400" />
                          Brand Dashboard
                        </Link>
                        <Link
                          to="/create-brief"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <FileText className="w-4 h-4 text-brand-400" />
                          Create New Brief
                        </Link>
                        <Link
                          to="/project-management"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                          <Briefcase className="w-4 h-4 text-brand-400" />
                          Manage Projects
                        </Link>
                      </>
                    )}

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 text-left transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth?mode=login"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/discover-creators"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
          >
            Explore Creators
          </Link>
          <Link
            to="/explore-projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
          >
            Explore Projects
          </Link>

          {isBrand && (
            <>
              <Link
                to="/brand-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-brand-300 hover:bg-slate-800"
              >
                Brand Dashboard
              </Link>
              <Link
                to="/ai-brief-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-brand-300 hover:bg-slate-800"
              >
                ✨ AI Brief Assistant
              </Link>
              <Link
                to="/create-brief"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
              >
                Post a Brief
              </Link>
              <Link
                to="/project-management"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
              >
                Project Statuses
              </Link>
            </>
          )}

          {isCreator && (
            <>
              <Link
                to="/creator-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-brand-300 hover:bg-slate-800"
              >
                Creator Dashboard
              </Link>
              <Link
                to="/creator-portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
              >
                My Portfolio Gallery
              </Link>
              <Link
                to="/creator-profile-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800"
              >
                Edit Creator Profile
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20"
              >
                Sign Out ({user.full_name})
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/auth?mode=login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
