import React from 'react';
import { useAuth } from '../AuthContext';
import { BookOpen, Sparkles, Clock, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.welcome')}, {user?.displayName?.split(' ')[0] || 'Student'}!</h1>
        <p className="text-gray-500 mt-2">{t('dashboard.subtitle')}</p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/assistant" className="bg-gradient-to-br from-[#003366] to-[#004080] p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow group relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <Sparkles className="w-10 h-10 text-[#D4AF37] mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('nav.assistant')}</h3>
          <p className="text-blue-100 text-sm mb-4">{t('dashboard.aiAssistantDesc')}</p>
          <div className="flex items-center text-[#D4AF37] text-sm font-medium">
            {t('dashboard.startResearch')} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/library" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <BookOpen className="w-10 h-10 text-[#003366] mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('nav.library')}</h3>
          <p className="text-gray-500 text-sm mb-4">{t('dashboard.libraryDesc')}</p>
          <div className="flex items-center text-[#003366] text-sm font-medium">
            {t('dashboard.browseCatalog')} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/citations" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <FileText className="w-10 h-10 text-[#003366] mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('nav.citations')}</h3>
          <p className="text-gray-500 text-sm mb-4">{t('dashboard.citationsDesc')}</p>
          <div className="flex items-center text-[#003366] text-sm font-medium">
            {t('dashboard.createCitation')} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Recent Activity & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('dashboard.recentActivity')}</h2>
            <button className="text-sm text-[#003366] font-medium hover:underline">{t('dashboard.viewAll')}</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'The Impact of Microfinance in Haiti', type: 'Generated Topic', date: '2 hours ago', icon: Sparkles },
              { title: 'Research Methodology: Qualitative Approaches', type: 'Read Article', date: 'Yesterday', icon: BookOpen },
              { title: 'Thesis Structure: Chapter 1', type: 'Saved Draft', date: '3 days ago', icon: FileText },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <item.icon className="w-5 h-5 text-[#003366]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{item.type}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Reading */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('dashboard.recommended')}</h2>
            <Link to="/library" className="text-sm text-[#003366] font-medium hover:underline">{t('dashboard.browseCatalog')}</Link>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'How to Write a Literature Review', author: 'Dr. Jean-Pierre', category: 'Methodology' },
              { title: 'Educational Leadership in Developing Nations', author: 'Prof. Marie Claude', category: 'Education' },
              { title: 'Data Analysis Techniques for Social Sciences', author: 'Dr. Smith', category: 'Data Science' },
            ].map((book, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 border border-gray-100 rounded-xl hover:border-[#003366]/30 transition-colors cursor-pointer group">
                <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(https://picsum.photos/seed/${book.category}/100/150)` }}></div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#003366] transition-colors">{book.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                  <span className="inline-block mt-2 text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{book.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
