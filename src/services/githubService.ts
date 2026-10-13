import type { GitHubRepo, Project } from '../types';

export const GITHUB_USERNAME = 'NivashMukil';
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

const CACHE_KEY = `portfolio_github_repos_${GITHUB_USERNAME}`;
const CACHE_TS_KEY = `portfolio_github_repos_ts_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

export const FALLBACK_DESCRIPTION =
  'Public repository on GitHub featuring source code, implementation details, and documentation.';

export interface FetchReposResult {
  repos: GitHubRepo[];
  fromCache: boolean;
  lastUpdated: Date;
  rateLimited?: boolean;
  rateLimitReset?: Date | null;
}

/**
 * Fetches public repositories for NivashMukil with localStorage caching and rate limit handling.
 */
export async function fetchGitHubRepos(forceRefresh = false): Promise<FetchReposResult> {
  // Check localStorage cache first unless force refresh requested
  if (!forceRefresh && typeof window !== 'undefined' && window.localStorage) {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTs = localStorage.getItem(CACHE_TS_KEY);

      if (cachedData && cachedTs) {
        const timestamp = parseInt(cachedTs, 10);
        const age = Date.now() - timestamp;

        if (age < CACHE_TTL_MS) {
          const parsed: GitHubRepo[] = JSON.parse(cachedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              repos: parsed,
              fromCache: true,
              lastUpdated: new Date(timestamp),
            };
          }
        }
      }
    } catch (e) {
      console.warn('Failed reading GitHub cache:', e);
    }
  }

  // Attempt network fetch
  try {
    const res = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    // Check rate limit headers
    const remaining = res.headers.get('x-ratelimit-remaining');
    const resetHeader = res.headers.get('x-ratelimit-reset');
    const resetDate = resetHeader ? new Date(parseInt(resetHeader, 10) * 1000) : null;

    if (res.status === 403 || remaining === '0') {
      // Rate limited
      const cached = getFallbackCache();
      if (cached) {
        return {
          repos: cached.repos,
          fromCache: true,
          lastUpdated: cached.lastUpdated,
          rateLimited: true,
          rateLimitReset: resetDate,
        };
      }
      const resetMsg = resetDate ? ` (resets at ${resetDate.toLocaleTimeString()})` : '';
      throw new Error(`GitHub API rate limit reached${resetMsg}. Please try again later.`);
    }

    if (!res.ok) {
      const cached = getFallbackCache();
      if (cached) {
        return {
          repos: cached.repos,
          fromCache: true,
          lastUpdated: cached.lastUpdated,
        };
      }
      throw new Error(`Failed to fetch repositories (${res.status}): ${res.statusText}`);
    }

    const data: GitHubRepo[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid response structure received from GitHub API.');
    }

    // Cache to localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TS_KEY, Date.now().toString());
      } catch (cacheErr) {
        console.warn('Unable to persist GitHub repos in localStorage:', cacheErr);
      }
    }

    return {
      repos: data,
      fromCache: false,
      lastUpdated: new Date(),
    };
  } catch (error) {
    // If network fails (offline, blocked, etc.), fallback to cached data if exists
    const cached = getFallbackCache();
    if (cached) {
      return {
        repos: cached.repos,
        fromCache: true,
        lastUpdated: cached.lastUpdated,
        rateLimited: false,
      };
    }
    throw error;
  }
}

/**
 * Retrieves cached repositories if available regardless of expiration age
 */
function getFallbackCache(): { repos: GitHubRepo[]; lastUpdated: Date } | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const ts = localStorage.getItem(CACHE_TS_KEY);
    if (raw) {
      const repos: GitHubRepo[] = JSON.parse(raw);
      if (Array.isArray(repos) && repos.length > 0) {
        return {
          repos,
          lastUpdated: ts ? new Date(parseInt(ts, 10)) : new Date(),
        };
      }
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Cleanly format repository names into readable project titles
 */
export function formatRepoTitle(repoName: string): string {
  // Common acronyms and casing preservation
  const clean = repoName.replace(/[-_]+/g, ' ').trim();
  return clean
    .split(' ')
    .map(word => {
      const lower = word.toLowerCase();
      if (lower === 'etl') return 'ETL';
      if (lower === 'eda') return 'EDA';
      if (lower === 'js') return 'JS';
      if (lower === 'api') return 'API';
      if (lower === 'ai') return 'AI';
      if (lower === 'hr') return 'HR';
      if (lower === 'sql') return 'SQL';
      if (lower === 'powerbi') return 'Power BI';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Format repository updated dates into friendly readable strings
 */
export function formatUpdatedDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recently';
  }
}

/**
 * Distinctive cover images matching portfolio's dark neon aesthetic
 */
const TECH_COVER_IMAGES = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', // Servers / ETL / Database
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', // Cyber Matrix / Vision
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80', // Code editor / Web
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', // Charts & Analytics
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Hardware & Chip
];

/**
 * Categorize repository based on language, topics, and description
 */
export function categorizeRepo(repo: GitHubRepo): 'Data Analytics' | 'Python Full Stack' | 'Power BI' {
  const text = `${repo.name} ${repo.description || ''} ${repo.language || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();

  if (text.includes('powerbi') || text.includes('power bi') || text.includes('dax') || text.includes('dashboard')) {
    return 'Power BI';
  }

  if (
    text.includes('django') ||
    text.includes('fastapi') ||
    text.includes('full-stack') ||
    text.includes('fullstack') ||
    text.includes('web') ||
    text.includes('app')
  ) {
    return 'Python Full Stack';
  }

  if (
    text.includes('etl') ||
    text.includes('pipeline') ||
    text.includes('analytics') ||
    text.includes('analysis') ||
    text.includes('pandas') ||
    text.includes('numpy') ||
    text.includes('eda') ||
    text.includes('jupyter') ||
    text.includes('data')
  ) {
    return 'Data Analytics';
  }

  if (repo.language === 'Python') {
    return 'Python Full Stack';
  }

  return 'Data Analytics';
}

/**
 * Convert a GitHub repository object into the portfolio Project interface
 */
export function transformGitHubRepoToProject(repo: GitHubRepo, index: number): Project {
  const category = categorizeRepo(repo);
  const technologies: string[] = [];

  if (repo.language) {
    technologies.push(repo.language);
  }

  if (Array.isArray(repo.topics)) {
    for (const topic of repo.topics) {
      if (!technologies.map(t => t.toLowerCase()).includes(topic.toLowerCase())) {
        technologies.push(topic);
      }
    }
  }

  // Ensure at least one tech tag
  if (technologies.length === 0) {
    technologies.push(category === 'Power BI' ? 'Power BI' : 'Python');
  }

  const liveUrl = repo.homepage
    ? repo.homepage.startsWith('http://') || repo.homepage.startsWith('https://')
      ? repo.homepage
      : `https://${repo.homepage}`
    : undefined;

  const desc = repo.description?.trim() || FALLBACK_DESCRIPTION;

  return {
    id: `github-${repo.id || repo.name.toLowerCase()}`,
    title: formatRepoTitle(repo.name),
    category,
    subtitle: repo.language ? `${repo.language} Repository` : 'GitHub Project',
    description: desc,
    longDescription: `${desc}\n\nThis project is hosted on GitHub under NivashMukil/${repo.name}. It contains public source code, commit history, and active developments.`,
    technologies: technologies.slice(0, 5),
    features: [
      `Repository Name: ${repo.name}`,
      `Primary Language: ${repo.language || 'Multi-language'}`,
      `Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}`,
      `Last Activity: ${formatUpdatedDate(repo.updated_at)}`,
    ],
    objectives: [
      `Deliver functional implementation for ${formatRepoTitle(repo.name)}`,
      'Maintain clean modular architecture and version-controlled codebase',
    ],
    learnings: [
      'Git repository workflows, feature branches, and documentation management',
      'Continuous implementation, automated synchronization, and testing',
    ],
    githubUrl: repo.html_url,
    liveUrl,
    image: TECH_COVER_IMAGES[index % TECH_COVER_IMAGES.length],
    highlights: [
      `⭐ ${repo.stargazers_count} Stars`,
      `🍴 ${repo.forks_count} Forks`,
      `Updated ${formatUpdatedDate(repo.updated_at)}`,
    ],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    topics: repo.topics || [],
    isFeatured: false,
    repoName: repo.name,
    isGitHubRepo: true,
    language: repo.language,
  };
}
