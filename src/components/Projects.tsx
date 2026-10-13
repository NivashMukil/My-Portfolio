import { useState, useEffect, useRef } from 'react';
import {
  BarChart3,
  Code2,
  Database,
  RefreshCw,
  Sparkles,
  AlertCircle,
  FolderGit2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Project3DCard } from './3d/Project3DCard';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { GITHUB_USERNAME } from '../services/githubService';

const CATEGORY_COLORS: Record<string, { badge: string; glow: string; accent: string; icon: React.ReactNode }> = {
  'Data Analytics': {
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    glow: 'rgba(56,189,248,0.25)',
    accent: '#38BDF8',
    icon: <BarChart3 className="w-4 h-4" />,
  },
  'Power BI': {
    badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
    glow: 'rgba(234,179,8,0.25)',
    accent: '#FBBF24',
    icon: <Database className="w-4 h-4" />,
  },
  'Python Full Stack': {
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
    glow: 'rgba(99,102,241,0.25)',
    accent: '#818CF8',
    icon: <Code2 className="w-4 h-4" />,
  },
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    featuredProjects,
    otherProjects,
    allProjects,
    loading,
    refreshing,
    error,
    isRateLimited,
    rateLimitReset,
    lastUpdated,
    isFromCache,
    refresh,
  } = useGitHubProjects();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filters = ['All', 'Featured', 'Data Analytics', 'Power BI', 'Python Full Stack'];

  // Filter projects depending on active filter tab
  const getFilteredProjects = () => {
    if (activeFilter === 'Featured') {
      return { featured: featuredProjects, other: [] };
    }
    if (activeFilter === 'All') {
      return { featured: featuredProjects, other: otherProjects };
    }
    // Filter by specific category
    return {
      featured: featuredProjects.filter(p => p.category === activeFilter),
      other: otherProjects.filter(p => p.category === activeFilter),
    };
  };

  const { featured: currentFeatured, other: currentOther } = getFilteredProjects();
  const totalDisplayCount = currentFeatured.length + currentOther.length;

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-28 relative z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full" />
          <div className="absolute right-0 bottom-1/3 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10" style={{ animation: visible ? 'slideInUp 0.7s ease-out both' : 'none' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Featured Work & Repositories
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              My <span className="text-gradient-purple">Projects</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
              Real-world data analytics, business intelligence dashboards, and full-stack Python web applications
              automatically synchronized with GitHub.
            </p>

            {/* GitHub Sync Status Bar */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl glass-card border border-slate-800 text-xs text-slate-300">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                title="View GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>@{GITHUB_USERNAME}</span>
              </a>

              <span className="text-slate-600">•</span>

              <div className="flex items-center gap-1.5 text-slate-300">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  <strong>{allProjects.length}</strong> Repositories
                </span>
              </div>

              {lastUpdated && (
                <>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1 text-slate-400" title={lastUpdated.toLocaleString()}>
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {isFromCache ? 'Cached' : 'Synced'}{' '}
                      {new Date().getTime() - lastUpdated.getTime() < 60000
                        ? 'just now'
                        : `${Math.round((new Date().getTime() - lastUpdated.getTime()) / 60000)}m ago`}
                    </span>
                  </div>
                </>
              )}

              <span className="text-slate-600">•</span>

              {/* Refresh button */}
              <button
                onClick={() => refresh()}
                disabled={refreshing || loading}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
                aria-label="Refresh Projects from GitHub"
                title="Sync latest repositories from GitHub"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Syncing...' : 'Refresh Projects'}</span>
              </button>
            </div>

            {/* Rate limit or error alert banner */}
            {(isRateLimited || error) && (
              <div className="mt-4 max-w-xl mx-auto p-3 rounded-xl glass-card border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    {isRateLimited
                      ? `GitHub API rate limit reached${
                          rateLimitReset ? ` (resets at ${rateLimitReset.toLocaleTimeString()})` : ''
                        }. Displaying saved repository data.`
                      : `Sync status: ${error}. Showing cached repositories.`}
                  </span>
                </div>
                <button
                  onClick={() => refresh()}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold text-[11px] whitespace-nowrap"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Filter tabs */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-12"
            style={{ animation: visible ? 'slideInUp 0.7s 0.1s ease-out both' : 'none' }}
          >
            {filters.map(f => {
              const cfg = f !== 'All' && f !== 'Featured' ? CATEGORY_COLORS[f] : null;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeFilter === f
                      ? `glass-card border text-white shadow-lg`
                      : 'text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700'
                  }`}
                  style={
                    activeFilter === f && cfg
                      ? { borderColor: `${cfg.accent}44`, boxShadow: `0 0 20px ${cfg.glow}` }
                      : activeFilter === f
                        ? { borderColor: 'rgba(56,189,248,0.3)', boxShadow: '0 0 20px rgba(56,189,248,0.2)' }
                        : {}
                  }
                >
                  {f === 'Featured' ? '★ Featured Showcase' : f}
                </button>
              );
            })}
          </div>

          {/* Loading Skeleton */}
          {loading && allProjects.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="glass-card rounded-3xl h-96 p-6 animate-pulse border border-slate-800">
                  <div className="h-40 bg-slate-800/50 rounded-2xl mb-4" />
                  <div className="h-5 bg-slate-800/70 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-800/40 rounded w-1/2 mb-4" />
                  <div className="h-14 bg-slate-800/30 rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-800/50 rounded-lg" />
                    <div className="h-6 w-16 bg-slate-800/50 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && totalDisplayCount === 0 && (
            <div className="text-center py-16 glass-card rounded-3xl border border-slate-800 max-w-lg mx-auto p-8">
              <FolderGit2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No Projects in this Category</h3>
              <p className="text-sm text-slate-400 mb-6">
                No public repositories matched the filter &ldquo;{activeFilter}&rdquo;. Try selecting &ldquo;All&rdquo; to view all repositories.
              </p>
              <button
                onClick={() => setActiveFilter('All')}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-2 cursor-pointer"
              >
                Show All Projects
              </button>
            </div>
          )}

          {/* Main Projects Display */}
          {totalDisplayCount > 0 && (
            <div className="space-y-16">
              {/* 1. Featured Curated Showcase Projects */}
              {currentFeatured.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          Featured Showcase Projects
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/20">
                            {currentFeatured.length}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400">
                          Curated engineering highlights featuring in-depth analytics, architecture, and live repository stats.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentFeatured.map((project, i) => (
                      <Project3DCard
                        key={project.id}
                        project={project}
                        index={i}
                        visible={visible}
                        onOpen={setSelectedProject}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Additional Dynamically Synchronized GitHub Repositories */}
              {currentOther.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {activeFilter === 'All' ? 'More Repositories on GitHub' : 'Other Matching Repositories'}
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/20">
                            {currentOther.length}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400">
                          Automatically discovered public repositories on GitHub, updated continuously.
                        </p>
                      </div>
                    </div>

                    <a
                      href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                    >
                      <span>Explore all on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentOther.map((project, i) => (
                      <Project3DCard
                        key={project.id}
                        project={project}
                        index={currentFeatured.length + i}
                        visible={visible}
                        onOpen={setSelectedProject}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

