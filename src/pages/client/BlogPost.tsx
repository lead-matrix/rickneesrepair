import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPostsData } from '../../data/seoData';
import { LeadForm } from '../../components/LeadForm';
import { Calendar, Clock, ArrowLeft, Phone } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold font-heading text-primary uppercase">Article Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">The requested blog article was not found.</p>
        <Link to="/blog" className="mt-6 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider">
          Return to Blog
        </Link>
      </div>
    );
  }

  // Parse lines to simulate markdown rendering for h3, list items, paragraphs
  const renderContent = (contentStr: string) => {
    return contentStr.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-bold font-heading text-primary uppercase mt-6 mb-3 tracking-wide">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        return (
          <ul key={index} className="list-disc pl-5 my-3 text-xs text-slate-600 space-y-1.5">
            {paragraph.split('\n').map((item, idx) => (
              <li key={idx}>{item.replace(/^[-*]\s+/, '')}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-xs md:text-sm text-slate-600 leading-relaxed my-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Blog Header Banner */}
      <section className="bg-slate-900 text-white py-14 relative overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,46,89,0.3),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Learning Center
          </Link>
          
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            <span className="bg-accent/20 border border-accent/30 text-accent-light px-3 py-0.5 rounded-full">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black font-heading tracking-wide uppercase mt-4 leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Full article body */}
            <div className="lg:col-span-8 text-left bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-soft">
              
              {/* Article Content */}
              <div className="prose prose-slate max-w-none">
                {renderContent(post.content)}
              </div>

              {/* In-Article Promotion Box */}
              <div className="bg-slate-950 text-white rounded-2xl p-6 mt-10 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 opacity-10 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10">
                  <span className="text-[9px] font-extrabold uppercase bg-accent px-2.5 py-1 rounded-full tracking-widest text-white">Wichita Same-Day Repair</span>
                  <h4 className="text-xl font-bold font-heading uppercase mt-3 tracking-wide">Struggling with a broken appliance?</h4>
                  <p className="text-xs text-slate-300 mt-1.5 max-w-lg leading-normal">
                    Don't let a faulty heater, broken seal, or draining issue cause mold and food spoilage. Call Rick Nees Appliance Repair for direct Wichita dispatch.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <a
                      href="tel:3162131874"
                      className="bg-accent hover:bg-accent-dark text-white font-heading font-bold text-center px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white animate-pulse" /> Call (316) 213-1874
                    </a>
                    <Link
                      to="/contact"
                      className="bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-center px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition border border-white/10 flex items-center justify-center gap-1.5"
                    >
                      Schedule Booking Slot
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Mini Sticky LeadForm */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="scale-95 origin-top">
                  <LeadForm compact />
                </div>
                
                {/* Related Articles list */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mt-6 text-left shadow-sm">
                  <h4 className="font-bold text-primary font-heading text-xs uppercase tracking-wider mb-4">Other Helpful Guides</h4>
                  <div className="space-y-4">
                    {blogPostsData.filter(p => p.id !== post.id).slice(0, 3).map(p => (
                      <div key={p.id} className="group">
                        <Link to={`/blog/${p.slug}`} className="block">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.category}</span>
                          <h5 className="font-bold text-xs text-primary uppercase group-hover:text-accent transition mt-0.5 leading-tight">
                            {p.title}
                          </h5>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
export default BlogPost;
