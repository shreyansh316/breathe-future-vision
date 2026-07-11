import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '@/data/blogs';
import { GlobalHeader } from '@/components/GlobalHeader';
import { AppFooter } from '@/components/AppFooter';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const BlogArticle = () => {
  const { id } = useParams();
  const article = blogs.find(b => b.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#121416] text-white flex flex-col">
        <GlobalHeader />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-sky-400 hover:text-sky-300 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
        </div>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121416] text-white flex flex-col selection:bg-sky-500/30">
      <GlobalHeader />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-10 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        
        <article className="bg-[#1a1d20] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Hero Image */}
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden relative">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d20] to-transparent"></div>
          </div>
          
          <div className="p-6 md:p-12 -mt-20 relative z-10">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
              <span className="flex items-center px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Tag className="w-3 h-3 mr-2" /> {article.category}
              </span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-2" /> {article.date}
              </span>
              <span className="flex items-center">
                <User className="w-3 h-3 mr-2" /> {article.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            {/* Excerpt */}
            <div className="text-lg md:text-xl text-slate-300 font-medium mb-12 border-l-4 border-sky-500 pl-6 py-2 bg-sky-500/5 rounded-r-lg">
              {article.excerpt}
            </div>

            {/* HTML Content Rendered securely via dangerouslySetInnerHTML */}
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </main>

      <AppFooter />
    </div>
  );
};

export default BlogArticle;
