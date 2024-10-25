import dayjs from 'dayjs';
import fetchJsonp from 'fetch-jsonp';

import { createLocalStorageCache } from '../utils/cache';

const GITHUB_CACHE_KEY = 'github';
const GITHUB_CACHE_TTL = 1000 * 60 * 60 * 4; // Cache ttl 4 hour

const apiBaseUrl = 'https://api.github.com';
const endpoint = '/repos/njord-rs/njord';
const repoPath = 'https://github.com/njord-rs/njord';

const githubCache = createLocalStorageCache();

export async function getRepoStats() {
  try {
    if (githubCache.has(GITHUB_CACHE_KEY)) {
      return githubCache.get(GITHUB_CACHE_KEY);
    }

    const [stars, commits, contributors] = await Promise.all([
      getStars(),
      getCommits(),
      getContributors(),
    ]);

    const stargazers = { stars, path: `${repoPath}/stargazers` };

    const latestVersion = {
      version: '0.4.0-alpha',
      path: `${repoPath}/releases`,
    };

    const latestCommit = {
      path: `${repoPath}/commit/${commits[0].sha}`,
      date: dayjs(commits[0].commit.author.date).format('MM/DD/YY'),
    };

    const data = { stargazers, latestVersion, latestCommit, contributors };

    githubCache.set(GITHUB_CACHE_KEY, data, GITHUB_CACHE_TTL);

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function getStars() {
  try {
    const res = await fetchJsonp(
      `https://json2jsonp.com/?url=${apiBaseUrl}${endpoint}`,
      { jsonpCallbackFunction: 'ghStarsJsonpCallback' },
    );

    const data = await res.json();

    return data.stargazers_count;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

//TODO: change version to the latest release with GitHub API later
// async function getLatestVersion() {
//   try {
//     const res = await fetchJsonp(
//       `https://json2jsonp.com/?url=${apiBaseUrl}${endpoint}/releases`,
//       { jsonpCallbackFunction: 'ghReleasesJsonpCallback' },
//     );

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//     return {};
//   }
// }

async function getCommits() {
  try {
    const res = await fetchJsonp(
      `https://json2jsonp.com/?url=${apiBaseUrl}${endpoint}/commits`,
      { jsonpCallbackFunction: 'ghCommitsJsonpCallback' },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getContributors() {
  try {
    const res = await fetchJsonp(
      `https://json2jsonp.com/?url=${apiBaseUrl}${endpoint}/contributors`,
      { jsonpCallbackFunction: 'ghContributorsJsonpCallback' },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
