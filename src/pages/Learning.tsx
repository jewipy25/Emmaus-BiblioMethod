import React from 'react';
import { GraduationCap, PlayCircle, CheckCircle2, Lock } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Introduction to Research Methodology',
    description: 'Learn the fundamentals of academic research, formulating a problem statement, and choosing the right approach.',
    modules: 5,
    duration: '2h 30m',
    progress: 100,
    locked: false,
    image: 'education'
  },
  {
    id: 2,
    title: 'Qualitative vs Quantitative Methods',
    description: 'Deep dive into data collection, analysis techniques, and when to use which methodology for your thesis.',
    modules: 8,
    duration: '4h 15m',
    progress: 30,
    locked: false,
    image: 'data'
  },
  {
    id: 3,
    title: 'Mastering Academic Writing',
    description: 'Improve your writing style, learn how to structure arguments, and avoid common plagiarism pitfalls.',
    modules: 6,
    duration: '3h 45m',
    progress: 0,
    locked: false,
    image: 'writing'
  },
  {
    id: 4,
    title: 'Advanced Data Analysis with SPSS',
    description: 'Premium course on using statistical software for quantitative research analysis.',
    modules: 10,
    duration: '6h 00m',
    progress: 0,
    locked: true,
    image: 'statistics'
  }
];

export default function Learning() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <GraduationCap className="w-8 h-8 text-[#003366] mr-3" />
          Learning Modules
        </h1>
        <p className="text-gray-500 mt-2">Master research methodology with interactive mini-courses.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row group hover:shadow-md transition-shadow">
            <div className="sm:w-48 h-48 sm:h-auto bg-gray-200 relative bg-cover bg-center" style={{ backgroundImage: `url(https://picsum.photos/seed/${course.image}/400/400)` }}>
              {course.locked && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              )}
              {course.progress === 100 && (
                <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center space-x-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <span>{course.modules} Modules</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${course.locked ? 'text-gray-500' : 'text-gray-900 group-hover:text-[#003366] transition-colors'}`}>
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-2">
                {course.description}
              </p>
              
              {!course.locked ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
                    <span>{course.progress > 0 ? `${course.progress}% Completed` : 'Not started'}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-[#003366]'}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button className="flex items-center text-sm font-medium text-[#003366] hover:underline">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    {course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </button>
                </div>
              ) : (
                <div className="mt-auto">
                  <button className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition-shadow flex items-center justify-center">
                    <Lock className="w-4 h-4 mr-2" /> Unlock Premium
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
