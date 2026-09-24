import { BookOpen, Clock, User, ChevronRight, ArrowLeft } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { BlogPostItem } from '../types';

interface BlogPageProps {
  blogPosts: BlogPostItem[];
  selectedBlogSlug?: string;
  onNavigate: (page: string, param?: string) => void;
}

export default function BlogPage({
  blogPosts,
  selectedBlogSlug,
  onNavigate,
}: BlogPageProps) {
  const currentPost = selectedBlogSlug
    ? blogPosts.find((p) => p.slug === selectedBlogSlug) || null
    : null;

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {currentPost ? (
        /* Blog Detail View */
        <article className="max-w-3xl mx-auto space-y-8">
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </button>

          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                {currentPost.category}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentPost.readingTime}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {currentPost.title}
            </h1>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 border-b border-slate-200 pb-4 font-medium">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-900 font-bold">{currentPost.authorName}</span>
              </div>
              <span>•</span>
              <span>Published: {currentPost.publishedAt}</span>
            </div>
          </header>

          <div className="p-5 rounded-2xl bg-pink-50 border border-pink-200 italic text-sm text-pink-950 leading-relaxed font-medium">
            {currentPost.summary}
          </div>

          <div className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 font-normal">
            {currentPost.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Published by STDTech Group Pvt Ltd Editorial Team</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-emerald-700 hover:text-emerald-800 hover:underline font-bold"
            >
              Discuss with our Engineers →
            </button>
          </div>
        </article>
      ) : (
        /* Blog List */
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Engineering Publications</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Technical Blog & Architecture Insights
            </h1>
            <p className="text-sm font-bold text-emerald-700 tracking-wide uppercase">
              Technology | Innovation | Impact
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              In-depth engineering analyses, algorithm benchmarks, and deployment patterns from our developers and researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog-detail', post.slug)}
                className="p-6 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-blue-700 uppercase tracking-wider text-[11px]">
                      {post.category}
                    </span>
                    <span className="text-slate-500 font-medium">{post.readingTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>By {post.authorName}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    Read Article <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
