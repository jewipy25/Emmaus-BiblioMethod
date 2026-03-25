import React, { useState } from 'react';
import { Quote, Copy, Check } from 'lucide-react';

export default function Citations() {
  const [style, setStyle] = useState('APA');
  const [type, setType] = useState('Book');
  const [copied, setCopied] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    authorFirst: '',
    authorLast: '',
    title: '',
    year: '',
    publisher: '',
    city: '',
    url: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCitation = () => {
    const { authorFirst, authorLast, title, year, publisher, city, url } = formData;
    const initial = authorFirst ? `${authorFirst.charAt(0)}.` : '';
    
    if (style === 'APA') {
      if (type === 'Book') {
        return `${authorLast}, ${initial} (${year || 'n.d.'}). *${title}*. ${publisher}.`;
      } else {
        return `${authorLast}, ${initial} (${year || 'n.d.'}). ${title}. Retrieved from ${url}`;
      }
    } else if (style === 'MLA') {
      if (type === 'Book') {
        return `${authorLast}, ${authorFirst}. *${title}*. ${publisher}, ${year}.`;
      } else {
        return `${authorLast}, ${authorFirst}. "${title}." ${url}. Accessed ${new Date().toLocaleDateString()}.`;
      }
    } else if (style === 'Chicago') {
      if (type === 'Book') {
        return `${authorLast}, ${authorFirst}. ${year}. *${title}*. ${city}: ${publisher}.`;
      } else {
        return `${authorLast}, ${authorFirst}. "${title}." Accessed ${new Date().toLocaleDateString()}. ${url}.`;
      }
    }
    return '';
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCitation());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Quote className="w-8 h-8 text-[#003366] mr-3" />
          Citation Generator
        </h1>
        <p className="text-gray-500 mt-2">Auto-generate bibliographies in APA, MLA, or Chicago style.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top Controls */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Citation Style</label>
            <div className="flex space-x-2">
              {['APA', 'MLA', 'Chicago'].map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    style === s 
                      ? 'bg-[#003366] text-white' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Source Type</label>
            <div className="flex space-x-2">
              {['Book', 'Website'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === t 
                      ? 'bg-[#D4AF37] text-[#003366]' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author First Name</label>
              <input type="text" name="authorFirst" value={formData.authorFirst} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="e.g. John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Last Name</label>
              <input type="text" name="authorLast" value={formData.authorLast} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="e.g. Doe" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="e.g. The Art of Research" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="e.g. 2023" />
            </div>
            
            {type === 'Book' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                  <input type="text" name="publisher" value={formData.publisher} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="e.g. Oxford University Press" />
                </div>
                {style === 'Chicago' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="e.g. New York" />
                  </div>
                )}
              </>
            ) : (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input type="url" name="url" value={formData.url} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] outline-none transition-all" placeholder="https://..." />
              </div>
            )}
          </div>

          {/* Result */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative">
            <h3 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-3">Generated Citation ({style})</h3>
            <p className="text-gray-800 font-serif text-lg leading-relaxed pr-12">
              {generateCitation() || <span className="text-gray-400 italic">Fill out the form to generate citation...</span>}
            </p>
            
            <button 
              onClick={copyToClipboard}
              disabled={!formData.title && !formData.authorLast}
              className="absolute top-6 right-6 p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-[#003366] disabled:opacity-50 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
