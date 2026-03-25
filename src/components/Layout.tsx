import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, Quote, GraduationCap, LayoutDashboard, LogOut, Menu, X, Globe } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { logOut } from '../firebase';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/library', label: t('nav.library'), icon: BookOpen },
    { path: '/assistant', label: t('nav.assistant'), icon: Sparkles },
    { path: '/citations', label: t('nav.citations'), icon: Quote },
    { path: '/learning', label: t('nav.learning'), icon: GraduationCap },
  ];

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#003366] text-white shadow-xl z-20">
        <div className="p-6 flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-[#D4AF37]" />
          <span className="text-xl font-bold tracking-tight">Emmaus BiblioMethod</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#004080] text-[#D4AF37] font-medium'
                    : 'text-gray-300 hover:bg-[#004080] hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#004080]">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-3 w-full px-4 py-2 mb-2 text-gray-300 hover:text-white hover:bg-[#004080] rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span>{i18n.language.startsWith('en') ? 'Français' : 'English'}</span>
          </button>
          <div className="flex items-center space-x-3 mb-4 px-2">
            <img 
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=D4AF37&color=fff`} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-[#D4AF37]"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.displayName || 'Student'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-[#004080] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('nav.signOut')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#003366] text-white flex items-center justify-between px-4 z-30 shadow-md">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-[#D4AF37]" />
          <span className="text-lg font-bold">Emmaus</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleLanguage} className="text-gray-300 hover:text-white">
            <Globe className="w-6 h-6" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#003366] z-20 flex flex-col">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-4 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#004080] text-[#D4AF37] font-medium'
                      : 'text-gray-300 hover:bg-[#004080] hover:text-white'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span className="text-lg">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-6 border-t border-[#004080]">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-3 w-full px-4 py-3 bg-red-500/10 text-red-400 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('nav.signOut')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden pt-16 md:pt-0 relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
