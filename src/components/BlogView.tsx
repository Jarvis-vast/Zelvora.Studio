import React, { useState } from "react";
import { ArrowLeft, Clock, Calendar, User, BookOpen } from "lucide-react";
import { Blog } from "../types";

interface BlogViewProps {
  blogs: Blog[];
}

export default function BlogView({ blogs }: BlogViewProps) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  if (selectedBlog) {
    return (
      <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
        <div className="max-w-3xl mx-auto px-6">
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-wider text-brand-stone/60 hover:text-brand-coral transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft size={14} className="transform transition-transform group-hover:-translate-x-1" />
            Back to Insights Index
          </button>

          <span className="text-xs font-sans font-extrabold text-brand-coral bg-brand-coral/5 border border-brand-coral/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
            {selectedBlog.category}
          </span>

          <h1 className="font-serif font-semibold text-3xl sm:text-5xl text-brand-charcoal mt-6 mb-6 tracking-tight leading-tight">
            {selectedBlog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 border-y border-brand-charcoal/10 py-4 mb-8 text-xs text-brand-stone/60 font-sans font-bold">
            <span className="flex items-center gap-1.5">
              <User size={12} className="text-brand-coral" />
              {selectedBlog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-brand-coral" />
              {selectedBlog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-brand-coral" />
              {selectedBlog.readTime}
            </span>
          </div>

          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-brand-charcoal/10 bg-brand-cream mb-10 shadow-sm">
            <img
              src={selectedBlog.imageUrl}
              alt={selectedBlog.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-xs sm:prose-sm max-w-none text-brand-stone/85 font-sans leading-relaxed space-y-6 font-medium">
            {selectedBlog.content.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-brand-alabaster text-brand-charcoal font-sans min-h-screen pb-20 grid-paper">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold text-brand-coral uppercase tracking-wider bg-brand-coral/5 px-3 py-1.5 rounded-full">
            Operational Insights
          </span>
          <h1 className="font-serif font-semibold text-4xl sm:text-6xl text-brand-charcoal tracking-tight mt-6 mb-6 leading-tight">
            Establishing Market Footprints
          </h1>
          <p className="text-brand-stone/75 text-base sm:text-lg leading-relaxed">
            Discover our strategic playbooks on executive branding, algorithm optimizations, and narrative-driven lead capture. Read our latest thought assets.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className="editorial-card bg-white rounded-2xl overflow-hidden border border-brand-charcoal/5 flex flex-col justify-between hover:border-brand-coral/25 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-brand-cream border-b border-brand-charcoal/5">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-sans font-extrabold text-brand-stone/50 uppercase tracking-wider">
                    <span>{blog.category}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-brand-charcoal group-hover:text-brand-coral transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-brand-stone/75 leading-relaxed font-sans line-clamp-3 font-medium">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-brand-charcoal/5 flex items-center justify-between text-xs font-bold text-brand-coral group-hover:text-brand-charcoal transition-colors">
                <span>Read Full Operational Intel</span>
                <BookOpen size={14} className="text-brand-coral" />
              </div>
            </div>
          ))}

          {blogs.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-brand-stone/40 font-mono font-bold">
              No tactical insights published yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
