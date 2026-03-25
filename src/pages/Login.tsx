import React from 'react';
import { useAuth } from '../AuthContext';
import { signInWithGoogle } from '../firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Sparkles, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FA]">
      {/* Left side - Branding */}
      <div className="md:w-1/2 bg-[#003366] text-white p-12 flex flex-col justify-center relative overflow-hidden">
        <button 
          onClick={toggleLanguage}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{i18n.language.startsWith('en') ? 'Français' : 'English'}</span>
        </button>

        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute transform -rotate-45 -top-24 -left-24 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute transform rotate-45 bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto mt-12 md:mt-0">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-[#003366]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Emmaus<br/>BiblioMethod</h1>
          </div>
          
          <h2 className="text-2xl font-serif mb-6 text-gray-200">
            {t('login.empowering')}
          </h2>
          
          <div className="space-y-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="bg-[#004080] p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('login.feature1Title')}</h3>
                <p className="text-gray-300 text-sm">{t('login.feature1Desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#004080] p-3 rounded-lg">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('login.feature2Title')}</h3>
                <p className="text-gray-300 text-sm">{t('login.feature2Desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#004080] p-3 rounded-lg">
                <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('login.feature3Title')}</h3>
                <p className="text-gray-300 text-sm">{t('login.feature3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('login.welcome')}</h2>
            <p className="text-gray-500">{t('login.subtitle')}</p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium shadow-sm"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>{t('login.continueGoogle')}</span>
          </button>

          <div className="mt-8 text-center text-sm text-gray-500">
            {t('login.terms')}
          </div>
        </div>
      </div>
    </div>
  );
}
