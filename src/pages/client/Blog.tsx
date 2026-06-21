import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPostsData } from '../../data/seoData';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(blogPostsData.map(post => post.category)))];

  // Filter posts
  const filteredPosts = blogPostsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent-light text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
            Appliance Learning Center
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-heading tracking-wide uppercase mt-4">
            Rick Nees Appliance Repair Blog
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
            Expert appliance maintenance tips, DIY troubleshooting guides, and advice on when to repair vs. replace your washing machines, refrigerators, and kitchen equipment.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Blog Grid */}
            <div className="lg:col-span-8 space-y-6 text-left">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <article 
                      key={post.id}
                      className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft hover:shadow-premium hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Meta Category & Time */}
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                          <span className="bg-primary/5 text-primary px-2.5 py-1 rounded-full">{post.category}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold font-heading text-primary uppercase leading-tight hover:text-accent transition duration-200">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        
                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-primary group-hover:text-accent font-bold hover:text-accent transition"
                        >
                          Read Post <ArrowRight className="w-3.5 h-3.5 ml-0.5 hover:translate-x-1 transition duration-200" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-soft">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-heading text-primary uppercase">No Posts Found</h3>
                  <p className="text-slate-500 text-xs mt-1.5">No articles matched your search query or selected category filter.</p>
                </div>
              )}
            </div>

            {/* Right Column: Search & Filter Sidepanel */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              
              {/* Search Widget */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft text-left">
                <h4 className="font-bold text-primary font-heading text-sm uppercase tracking-wider mb-4">Search Articles</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tips & tricks..."
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft text-left">
                <h4 className="font-bold text-primary font-heading text-sm uppercase tracking-wider mb-4">Categories</h4>
                <div className="flex flex-col gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition cursor-pointer flex justify-between items-center ${
                        selectedCategory === cat 
                          ? 'bg-primary text-white font-bold' 
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat === 'All' 
                          ? blogPostsData.length 
                          : blogPostsData.filter(p => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
export default Blog;
