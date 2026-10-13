import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Project, GitHubRepo } from '../types';
import { PROJECTS } from '../data/portfolioData';
import {
  fetchGitHubRepos,
  transformGitHubRepoToProject,
} from '../services/githubService';

/**
 * Normalizes repository name for accurate matching across formats and casing
 */
function normalizeRepo(nameOrUrl: string): string {
  if (!nameOrUrl) return '';
  const clean = nameOrUrl.split('/').filter(Boolean).pop() || nameOrUrl;
  return clean.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export interface UseGitHubProjectsReturn {
  featuredProjects: Project[];
  otherProjects: Project[];
  allProjects: Project[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  isRateLimited: boolean;
  rateLimitReset: Date | null;
  lastUpdated: Date | null;
  isFromCache: boolean;
  refresh: () => Promise<void>;
}

export function useGitHubProjects(): UseGitHubProjectsReturn {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [rateLimitReset, setRateLimitReset] = useState<Date | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(false);

  const [rawRepos, setRawRepos] = useState<GitHubRepo[]>([]);

  const loadRepos = useCallback(async (force = false) => {
    if (force) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await fetchGitHubRepos(force);
      setRawRepos(result.repos);
      setIsFromCache(result.fromCache);
      setLastUpdated(result.lastUpdated);
      setIsRateLimited(!!result.rateLimited);
      setRateLimitReset(result.rateLimitReset || null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch GitHub repositories';
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRepos(false);
  }, [loadRepos]);

  const { featuredProjects, otherProjects, allProjects } = useMemo(() => {
    // Map normalized repo identifiers to repo objects
    const repoMap = new Map<string, GitHubRepo>();
    for (const repo of rawRepos) {
      repoMap.set(normalizeRepo(repo.name), repo);
    }

    // 1. Enrich existing curated featured projects with live GitHub stats
    const matchedRepoKeys = new Set<string>();

    const enrichedFeatured = PROJECTS.map(p => {
      const pKey = normalizeRepo(p.repoName || p.githubUrl);
      const matched = repoMap.get(pKey);

      if (matched) {
        matchedRepoKeys.add(pKey);
        matchedRepoKeys.add(normalizeRepo(matched.name));
        return {
          ...p,
          stars: matched.stargazers_count,
          forks: matched.forks_count,
          updatedAt: matched.updated_at,
          topics: matched.topics || p.topics || [],
          isFeatured: true,
          liveUrl:
            p.liveUrl ||
            (matched.homepage
              ? matched.homepage.startsWith('http')
                ? matched.homepage
                : `https://${matched.homepage}`
              : undefined),
        };
      }

      return {
        ...p,
        isFeatured: true,
      };
    });

    // 2. Discover remaining public repositories (not featured)
    const discoveredRepos: Project[] = [];
    let dynamicIdx = 0;

    for (const repo of rawRepos) {
      const key = normalizeRepo(repo.name);
      if (!matchedRepoKeys.has(key)) {
        // Also check if matches any featured by partial or full match
        const alreadyFeatured = enrichedFeatured.some(
          ef => normalizeRepo(ef.repoName || ef.githubUrl) === key
        );

        if (!alreadyFeatured) {
          discoveredRepos.push(transformGitHubRepoToProject(repo, dynamicIdx++));
        }
      }
    }

    // Sort other repositories by latest update by default
    discoveredRepos.sort((a, b) => {
      const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return timeB - timeA;
    });

    const combined = [...enrichedFeatured, ...discoveredRepos];

    return {
      featuredProjects: enrichedFeatured,
      otherProjects: discoveredRepos,
      allProjects: combined,
    };
  }, [rawRepos]);

  const refresh = useCallback(async () => {
    await loadRepos(true);
  }, [loadRepos]);

  return {
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
  };
}
