import { useState } from 'react';
import {
  Menu,
  X,
  Shield,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  Phone,
  User,
  LogOut,
} from 'lucide-react';
import { User as UserType } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface NavbarProps {
  activePage?: string;
  currentPage?: string;
  setActivePage?: (page: string, param?: string) => void;
  onNavigate?: (page: string, param?: string) => void;
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenLoginModal?: () => void;
  onOpenAuthModal?: () => void;
  onOpenRoleSwitcher?: () => void;
  onQuickRoleSwitch?: (role: 'admin' | 'staff' | 'student' | 'customer') => void;
  theme?: 'mint-pink-white' | 'mint-white' | 'dark';
  onThemeChange?: (theme: 'mint-pink-white' | 'mint-white' | 'dark') => void;
}

export default function Navbar({
  activePage,
  currentPage,
  setActivePage,
  onNavigate,
  currentUser,
  onLogout,
  onOpenLoginModal,
  onOpenAuthModal,
  onOpenRoleSwitcher,
  onQuickRoleSwitch,
  theme = 'mint-pink-white',
  onThemeChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'products', label: 'Products', hasDropdown: true },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'training', label: 'Training / Academy' },
    { id: 'verify-cert', label: 'Verify Certificate' },
    { id: 'careers', label: 'Careers' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const currentActivePage = currentPage || activePage || 'home';
  const handleNav = (pageId: string, param?: string) => {
    if (onNavigate) {
      onNavigate(pageId, param);
    } else if (setActivePage) {
      setActivePage(pageId, param);
    }
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setProductsDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = onOpenAuthModal || onOpenLoginModal || (() => {});
  const handleToggleRoleSwitch = onOpenRoleSwitcher || (() => setRoleSwitcherOpen(!roleSwitcherOpen));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/80 bg-white/95 backdrop-blur-xl transition-all shadow-xs">
      {/* Top micro-bar for direct contact & official domain notice */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-pink-50 border-b border-emerald-200/60 py-1.5 px-4 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              STDTech Group Pvt Ltd • Founded 2026
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline text-slate-600 font-medium">Technology | Innovation | Impact</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:7318514528"
              className="inline-flex items-center gap-1 text-slate-700 hover:text-emerald-700 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>+91 7318514528</span>
            </a>
            <span className="text-slate-300">|</span>

            {/* Background Style & Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-emerald-50 text-[11px] font-bold text-slate-800 border border-emerald-300 transition-all flex items-center gap-1.5 shadow-xs"
                title="Change Background Atmosphere"
              >
                <span className="flex items-center -space-x-0.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-400 border border-white"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-white border border-slate-300"></span>
                </span>
                <span>
                  {theme === 'mint-pink-white' ? 'Mint & 🩷 White' : theme === 'mint-white' ? 'Mint & White' : 'Dark Mode'}
                </span>
                <span className="text-[8px] opacity-60">{themeMenuOpen ? '▲' : '▼'}</span>
              </button>

              {themeMenuOpen && onThemeChange && (
                <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white border border-slate-200 p-2 shadow-2xl z-50 text-xs text-slate-800">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Background Atmosphere
                  </div>
                  <button
                    onClick={() => {
                      onThemeChange('mint-pink-white');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between mb-1 ${
                      theme === 'mint-pink-white'
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-300/50'
                        : 'hover:bg-slate-100 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex -space-x-1">
                        <span className="h-3 w-3 rounded-full bg-emerald-400 border border-white"></span>
                        <span className="h-3 w-3 rounded-full bg-pink-400 border border-white"></span>
                        <span className="h-3 w-3 rounded-full bg-white border border-slate-300"></span>
                      </span>
                      <span>Mint & 🩷 White (Mix)</span>
                    </div>
                    {theme === 'mint-pink-white' && <span className="text-[10px] text-emerald-600 font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      onThemeChange('mint-white');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between mb-1 ${
                      theme === 'mint-white'
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-300/50'
                        : 'hover:bg-slate-100 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex -space-x-1">
                        <span className="h-3 w-3 rounded-full bg-emerald-400 border border-white"></span>
                        <span className="h-3 w-3 rounded-full bg-white border border-slate-300"></span>
                      </span>
                      <span>Mint & Pure White</span>
                    </div>
                    {theme === 'mint-white' && <span className="text-[10px] text-emerald-600 font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => {
                      onThemeChange('dark');
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between ${
                      theme === 'dark'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'hover:bg-slate-100 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-900 border border-slate-600"></span>
                      <span>Tech Slate Dark</span>
                    </div>
                    {theme === 'dark' && <span className="text-[10px] text-slate-400 font-bold">Active</span>}
                  </button>
                </div>
              )}
            </div>

            <span className="text-slate-300">|</span>
            {/* Demo role switch button in top micro-bar */}
            <div className="relative">
              <button
                onClick={handleToggleRoleSwitch}
                className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-800 border border-emerald-300 transition-all flex items-center gap-1 shadow-xs"
                title="Test user roles"
              >
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>Demo Roles {roleSwitcherOpen ? '▲' : '▼'}</span>
              </button>

              {roleSwitcherOpen && onQuickRoleSwitch && (
                <div className="absolute right-0 mt-1 w-52 rounded-xl bg-white border border-emerald-200 p-2 shadow-2xl z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Instant Role Preview
                  </div>
                  <button
                    onClick={() => {
                      onQuickRoleSwitch('admin');
                      setRoleSwitcherOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-emerald-50 text-emerald-800 font-bold flex items-center justify-between"
                  >
                    <span>Admin (Founder)</span>
                    <span className="text-[10px] bg-emerald-100 px-1 rounded text-emerald-800 font-bold">Full Access</span>
                  </button>
                  <button
                    onClick={() => {
                      onQuickRoleSwitch('student');
                      setRoleSwitcherOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-blue-50 text-blue-800 font-bold flex items-center justify-between"
                  >
                    <span>Student Portal</span>
                    <span className="text-[10px] bg-blue-100 px-1 rounded text-blue-800 font-bold">Academy</span>
                  </button>
                  <button
                    onClick={() => {
                      onQuickRoleSwitch('staff');
                      setRoleSwitcherOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-pink-50 text-pink-800 font-bold flex items-center justify-between"
                  >
                    <span>Staff / Engineer</span>
                    <span className="text-[10px] bg-pink-100 px-1 rounded text-pink-800 font-bold">Internal</span>
                  </button>
                  <button
                    onClick={() => {
                      onQuickRoleSwitch('customer');
                      setRoleSwitcherOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-amber-50 text-amber-800 font-bold flex items-center justify-between"
                  >
                    <span>Enterprise Client</span>
                    <span className="text-[10px] bg-amber-100 px-1 rounded text-amber-800 font-bold">Customer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-emerald-300 p-1 flex items-center justify-center group-hover:border-emerald-500 transition-colors shadow-xs">
              <ImageWithFallback
                src="/images/logo.png"
                fallbackSrc="https://i.postimg.cc/6qRt0h7H/file-00000000ee20821182e188b87dbc276d.png"
                alt="STDTech Group Logo"
                className="w-full h-full object-contain"
                fallbackInitials="STD"
                fallbackColor="bg-gradient-to-br from-emerald-600 to-blue-600"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  STDTech Group
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Pvt Ltd
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold tracking-wide">
                Technology | Innovation | Impact
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentActivePage === link.id;

              if (link.id === 'services') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button
                      onClick={() => handleNav('services')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                          : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                      }`}
                    >
                      <span>Services</span>
                      <span className="text-[10px] text-slate-400">▼</span>
                    </button>

                    {servicesDropdown && (
                      <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white border-2 border-emerald-200 p-2 shadow-xl backdrop-blur-xl z-50">
                        <button
                          onClick={() => handleNav('services')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors border-b border-emerald-100 mb-1"
                        >
                          All 5 Core IT Services →
                        </button>
                        <button
                          onClick={() => handleNav('service-detail', 'web-mobile-app-development')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          1. Web & Mobile App Dev
                        </button>
                        <button
                          onClick={() => handleNav('service-detail', 'ai-machine-learning-solutions')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          2. AI & Machine Learning
                        </button>
                        <button
                          onClick={() => handleNav('service-detail', 'software-business-solutions')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          3. Software & Business Solutions
                        </button>
                        <button
                          onClick={() => handleNav('service-detail', 'cybersecurity-cloud-solutions')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          4. Cybersecurity & Cloud
                        </button>
                        <button
                          onClick={() => handleNav('service-detail', 'digital-transformation-it-consulting')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          5. Digital Transformation & IT
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.id === 'products') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setProductsDropdown(true)}
                    onMouseLeave={() => setProductsDropdown(false)}
                  >
                    <button
                      onClick={() => handleNav('products')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                          : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                      }`}
                    >
                      <span>Products</span>
                      <span className="text-[10px] text-slate-400">▼</span>
                    </button>

                    {productsDropdown && (
                      <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white border-2 border-emerald-200 p-2 shadow-xl backdrop-blur-xl z-50">
                        <button
                          onClick={() => handleNav('products')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors border-b border-emerald-100 mb-1"
                        >
                          Product Portfolio Hub →
                        </button>
                        <button
                          onClick={() => handleNav('product-detail', 'swaynis')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-pink-50 transition-colors flex items-center justify-between font-medium"
                        >
                          <span>SWAYNIS AI Platform</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-pink-100 text-pink-800 border border-pink-300">
                            SOON
                          </span>
                        </button>
                        <button
                          onClick={() => handleNav('product-detail', 'loan-approval-prediction-system')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          Loan Approval Prediction
                        </button>
                        <button
                          onClick={() => handleNav('product-detail', 'product-return-prediction-system')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          Product Return Prediction
                        </button>
                        <button
                          onClick={() => handleNav('product-detail', 'heart-disease-prediction-system')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          Heart Disease Prediction
                        </button>
                        <button
                          onClick={() => handleNav('product-detail', 'mobile-user-segment-system')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          Mobile User Segment
                        </button>
                        <button
                          onClick={() => handleNav('product-detail', 'autocad-project')}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors font-medium"
                        >
                          AutoCAD Project Automation
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right side CTA & User Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav(`${currentUser.role}-dashboard`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="capitalize">{currentUser.role} Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleOpenLogin}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition-colors shadow-xs"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => handleNav('contact')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs tracking-wide shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-emerald-300 text-slate-700 hover:text-slate-900 shadow-xs"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-emerald-200 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-1 shadow-2xl">
          {/* Mobile Theme Switcher */}
          {onThemeChange && (
            <div className="p-2 mb-2 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Atmosphere:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onThemeChange('mint-pink-white')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    theme === 'mint-pink-white' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Mint & 🩷 White
                </button>
                <button
                  onClick={() => onThemeChange('mint-white')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    theme === 'mint-white' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Mint & White
                </button>
                <button
                  onClick={() => onThemeChange('dark')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${
                    theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          )}

          <div className="p-2 mb-2 rounded-lg bg-pink-50/70 border border-pink-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Role Preview:</span>
            <button
              onClick={handleToggleRoleSwitch}
              className="text-xs text-pink-700 font-bold underline"
            >
              {currentUser ? `${currentUser.role.toUpperCase()} (Switch)` : 'Choose Role'}
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentActivePage === link.id
                  ? 'text-emerald-800 bg-emerald-100 border border-emerald-300 font-bold'
                  : 'text-slate-700 hover:bg-emerald-50'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => handleNav(`${currentUser.role}-dashboard`)}
                className="w-full py-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-800 text-center"
              >
                Go to {currentUser.role.toUpperCase()} Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  handleOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 text-center"
              >
                Sign In / Student & Client Login
              </button>
            )}

            <button
              onClick={() => handleNav('contact')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black text-center shadow-md"
            >
              Start a Project With Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
