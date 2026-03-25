import React, { useState } from 'react';
import { BookOpen, Search, Filter, Download, Bookmark, Star } from 'lucide-react';

const mockBooks = [
  { id: 1, title: 'Research Methodology: Methods and Techniques', author: 'C.R. Kothari', category: 'Methodology', year: 2019, rating: 4.8 },
  { id: 2, title: 'Educational Leadership in Developing Nations', author: 'Marie Claude', category: 'Education', year: 2021, rating: 4.5 },
  { id: 3, title: 'The Impact of Microfinance in Haiti', author: 'Jean-Pierre', category: 'Social Sciences', year: 2022, rating: 4.9 },
  { id: 4, title: 'Qualitative Inquiry and Research Design', author: 'John W. Creswell', category: 'Methodology', year: 2018, rating: 4.7 },
  { id: 5, title: 'Theology and Social Justice', author: 'Emmanuel', category: 'Theology', year: 2020, rating: 4.6 },
  { id: 6, title: 'Data Analysis for Social Science', author: 'Elena Llaudet', category: 'Data Science', year: 2022, rating: 4.4 },
];

const categories = ['All', 'Methodology', 'Education', 'Social Sciences', 'Theology', 'Data Science'];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-8 h-8 text-[#003366] mr-3" />
            Digital Library
          </h1>
          <p className="text-gray-500 mt-2">Access academic resources, books, and theses.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Bookmark className="w-4 h-4" />
            <span>Saved Items</span>
          </button>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by title, author, or keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20 rounded-xl transition-all outline-none"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-[#003366] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="h-48 bg-gray-200 relative bg-cover bg-center" style={{ backgroundImage: `url(https://picsum.photos/seed/${book.category.replace(' ', '')}/400/300)` }}>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center space-x-1 text-xs font-bold text-gray-800 shadow-sm">
                <Star className="w-3 h-3 text-[#D4AF37] fill-current" />
                <span>{book.rating}</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:text-[#003366] transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#003366] bg-blue-50 px-2 py-1 rounded-md">{book.category}</span>
                <span className="text-xs text-gray-400">{book.year}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#003366] transition-colors">{book.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-1">{book.author}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <button className="text-sm font-medium text-[#003366] hover:underline">Read Online</button>
                <button className="text-gray-400 hover:text-[#003366] transition-colors" title="Download PDF">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
