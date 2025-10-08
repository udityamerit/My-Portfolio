import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Trophy,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  RefreshCw,
  Github,
  Star,
  GitBranch,
  Eye
} from 'lucide-react';

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

interface GithubStats {
  publicRepos: number;
  followers: number;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const CodingProfiles: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState<string | null>(null);

  const [githubData, setGithubData] = useState<GithubStats | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState<string | null>(null);

  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fallbackLeetCodeStats: LeetCodeStats = {
    totalSolved: 350,
    totalQuestions: 3000,
    easySolved: 180,
    totalEasy: 800,
    mediumSolved: 140,
    totalMedium: 1600,
    hardSolved: 30,
    totalHard: 700,
    acceptanceRate: 65.5,
    ranking: 150000,
    contributionPoints: 45,
    reputation: 0
  };
  const fallbackGithubStats: GithubStats = {
    publicRepos: 41,
    followers: 10,
  };

  const fetchLeetCodeData = async () => {
    setLeetcodeLoading(true);
    setLeetcodeError(null);

    try {
      const endpoints = [
        'https://leetcode-stats-api.herokuapp.com/Uditya_Narayan_Tiwari',
        'https://alfa-leetcode-api.onrender.com/Uditya_Narayan_Tiwari/solved',
        'https://leetcode-api-faisalshohag.vercel.app/Uditya_Narayan_Tiwari'
      ];

      let data = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();

            if (result.totalSolved !== undefined || result.solvedProblem !== undefined) {
              data = {
                totalSolved: result.totalSolved || result.solvedProblem || result.totalQuestionsSolved || fallbackLeetCodeStats.totalSolved,
                totalQuestions: result.totalQuestions || 3000,
                easySolved: result.easySolved || result.easy || result.easyQuestionsSolved || fallbackLeetCodeStats.easySolved,
                totalEasy: result.totalEasy || 800,
                mediumSolved: result.mediumSolved || result.medium || result.mediumQuestionsSolved || fallbackLeetCodeStats.mediumSolved,
                totalMedium: result.totalMedium || 1600,
                hardSolved: result.hardSolved || result.hard || result.hardQuestionsSolved || fallbackLeetCodeStats.hardSolved,
                totalHard: result.totalHard || 700,
                acceptanceRate: result.acceptanceRate || result.acceptance_rate || fallbackLeetCodeStats.acceptanceRate,
                ranking: result.ranking || result.rank || fallbackLeetCodeStats.ranking,
                contributionPoints: result.contributionPoints || result.contribution_points || fallbackLeetCodeStats.contributionPoints,
                reputation: result.reputation || 0
              };
              break;
            }
          }
        } catch (apiError) {
          console.log(`Failed to fetch from ${endpoint}:`, apiError);
          continue;
        }
      }

      if (data) {
        setLeetcodeData(data);
      } else {
        throw new Error('All LeetCode API endpoints failed');
      }
    } catch (err) {
      console.error('Error fetching LeetCode data:', err);
      setLeetcodeError('Unable to fetch live data. Showing cached statistics.');
      setLeetcodeData(fallbackLeetCodeStats);
    } finally {
      setLeetcodeLoading(false);
    }
  };

  const fetchGithubData = async () => {
    setGithubLoading(true);
    setGithubError(null);
    try {
      const response = await fetch('https://api.github.com/users/udityamerit', {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
      });

      if (response.ok) {
        const result = await response.json();
        setGithubData({
          publicRepos: result.public_repos,
          followers: result.followers
        });
        setLastUpdated(new Date());
      } else {
        throw new Error('Failed to fetch GitHub data');
      }
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setGithubError('Unable to fetch live data. Showing cached statistics.');
      setGithubData(fallbackGithubStats);
    } finally {
      setGithubLoading(false);
    }
  };

  const fetchGithubRepos = async () => {
    setReposLoading(true);
    setReposError(null);
    try {
      const response = await fetch('https://api.github.com/users/udityamerit/repos?sort=pushed&per_page=100', {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
      });

      if (response.ok) {
        const result = await response.json();
        const hardcodedRepoName = 'Complete-Machine-Learning-For-Beginners';

        const hardcodedRepo = result.find((repo: any) => repo.name === hardcodedRepoName);
        const otherRepos = result.filter((repo: any) => repo.name !== hardcodedRepoName);

        otherRepos.sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

        const top3Repos = otherRepos.slice(0, 3);
        
        const combinedRepos = hardcodedRepo ? [hardcodedRepo, ...top3Repos] : top3Repos;

        const formattedRepos = combinedRepos.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description provided.',
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language
        }));
        setGithubRepos(formattedRepos);
      } else {
        throw new Error('Failed to fetch GitHub repositories');
      }
    } catch (err) {
      console.error('Error fetching GitHub repos:', err);
      setReposError('Unable to fetch recent repositories.');
    } finally {
      setReposLoading(false);
    }
  };

  useEffect(() => {
    fetchLeetCodeData();
    fetchGithubData();
    fetchGithubRepos();
  }, []);

  const leetcodeStats = leetcodeData || fallbackLeetCodeStats;
  const githubStats = githubData || fallbackGithubStats;

  const skills = [
    { name: 'Dynamic Programming', level: 60, color: 'from-purple-400 to-pink-400' },
    { name: 'Data Structures', level: 60, color: 'from-blue-400 to-cyan-400' },
    { name: 'Algorithms', level: 70, color: 'from-green-400 to-emerald-400' },
    { name: 'Problem Solving', level: 70, color: 'from-orange-400 to-red-400' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const calculatePercentage = (solved: number, total: number) => {
    return Math.round((solved / total) * 100);
  };

  const formatRanking = (ranking: number) => {
    if (ranking < 1000) return `Top ${Math.round((ranking / 10000) * 100)}%`;
    if (ranking < 10000) return `Top ${Math.round((ranking / 100000) * 100)}%`;
    if (ranking < 100000) return `Top ${Math.round((ranking / 1000000) * 100)}%`;
    return `Top 15%`;
  };

  return (
    <section
      id="coding-profiles"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800"
      ref={ref}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
            Coding Profiles
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 px-2 sm:px-4">
            Live statistics from competitive programming platforms
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto flex flex-col gap-8"
        >
          {/* GitHub Profile Card - Ab poora space lega aur sabse pehle dikhega */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500"
          >
            {/* Header - GitHub */}
            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Github size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">GitHub</h3>
                    <p className="text-white/80 text-sm sm:text-base">Developer Stats & Recent Work</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => { fetchGithubData(); fetchGithubRepos(); }}
                    disabled={githubLoading || reposLoading}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {(githubLoading || reposLoading) ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <RefreshCw size={16} />
                    )}
                    Refresh
                  </motion.button>
                  <motion.a
                    href="https://github.com/udityamerit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                    View Profile
                  </motion.a>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${githubLoading ? 'bg-yellow-400 animate-pulse' : githubError ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  <span>{(githubLoading || reposLoading) ? 'Fetching live data...' : (githubError || reposError) ? 'Using cached data' : 'Live data'}</span>
                </div>
                {lastUpdated && (
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                )}
              </div>
            </div>

            {/* GitHub Stats Content */}
            <div className="p-6 sm:p-8">
              {githubLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-lg">Loading live statistics...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-1">
                        {githubStats.publicRepos}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Public Repositories
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-1">
                        {githubStats.followers}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Followers
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                      Top 4 Repositories
                    </h4>
                    {reposLoading ? (
                       <div className="flex items-center justify-center py-8">
                         <Loader2 size={24} className="animate-spin text-slate-600 dark:text-slate-400" />
                       </div>
                    ) : reposError ? (
                       <div className="text-center text-red-500 dark:text-red-400">
                         {reposError}
                       </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {githubRepos.map((repo) => (
                          <motion.a 
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-white dark:bg-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300"
                            whileHover={{ y: -5 }}
                          >
                            <h5 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 truncate mb-2 leading-tight transition-colors">
                              {repo.name}
                            </h5>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                              {repo.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <Star size={14} className="text-yellow-500" />
                                <span>{repo.stargazers_count}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <GitBranch size={14} className="text-green-500" />
                                <span>{repo.forks_count}</span>
                              </div>
                              {repo.language && (
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                                  <span>{repo.language}</span>
                                </div>
                              )}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
          
          {/* LeetCode Profile Card - Ab yeh dusre number par aayega */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500"
          >
            {/* Header - LeetCode */}
            <div className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="white"
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    >
                      <path d="M23.347 5.532L11.664 16.91a2.025 2.025 0 000 2.78l11.683 11.38a1.572 1.572 0 002.212-.064 1.576 1.576 0 00-.064-2.213L15.665 17.9l7.952-7.873a1.576 1.576 0 10-2.27-2.495zM8.073 7.665L.999 14.8a1.578 1.578 0 00-.043 2.217l6.892 6.961a1.571 1.571 0 002.236-.007 1.569 1.569 0 00-.011-2.22l-4.322-4.343a.9.9 0 01-.27-.662v-1.63c0-.255.11-.5.298-.665l4.327-4.346a1.567 1.567 0 00-.034-2.1 1.572 1.572 0 00-2.078-.095z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">LeetCode</h3>
                    <p className="text-white/80 text-sm sm:text-base">Live Statistics</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={fetchLeetCodeData}
                    disabled={leetcodeLoading}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {leetcodeLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <RefreshCw size={16} />
                    )}
                    Refresh
                  </motion.button>
                  <motion.a
                    href="https://leetcode.com/u/Uditya_Narayan_Tiwari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                    View Profile
                  </motion.a>
                </div>
              </div>
              
              {/* Status and Last Updated */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/80 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${leetcodeLoading ? 'bg-yellow-400 animate-pulse' : leetcodeError ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  <span>{leetcodeLoading ? 'Fetching live data...' : leetcodeError ? 'Using cached data' : 'Live data'}</span>
                </div>
                {lastUpdated && (
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                )}
              </div>
            </div>

            {/* LeetCode Stats Content */}
            <div className="p-6 sm:p-8">
              {leetcodeLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="text-lg">Loading live statistics...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Overall Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">
                        {leetcodeStats.totalSolved}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Problems Solved
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-green-500 dark:text-green-400 mb-1">
                        {formatRanking(leetcodeStats.ranking)}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Global Ranking
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-orange-500 dark:text-orange-400 mb-1">
                        {leetcodeStats.acceptanceRate.toFixed(1)}%
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Acceptance Rate
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-purple-500 dark:text-purple-400 mb-1">
                        {leetcodeStats.contributionPoints}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Contribution Points
                      </div>
                    </motion.div>
                  </div>

                  {/* Problem Categories */}
                  <div className="mb-8">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                      Problems Solved by Difficulty
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      {/* Easy */}
                      <motion.div
                        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-2xl border border-green-200 dark:border-green-800/30"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="text-green-500 dark:text-green-400" size={24} />
                          <h5 className="text-lg font-bold text-green-600 dark:text-green-300">Easy</h5>
                        </div>
                        <div className="text-3xl font-bold text-green-500 dark:text-green-400 mb-2">
                          {leetcodeStats.easySolved}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          out of {leetcodeStats.totalEasy}+ problems
                        </div>
                        <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-2 mb-2">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${calculatePercentage(leetcodeStats.easySolved, leetcodeStats.totalEasy)}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <div className="text-xs text-green-500 dark:text-green-400 font-medium">
                          {calculatePercentage(leetcodeStats.easySolved, leetcodeStats.totalEasy)}% completion
                        </div>
                      </motion.div>

                      {/* Medium */}
                      <motion.div
                        className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 p-6 rounded-2xl border border-orange-200 dark:border-orange-800/30"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="text-orange-500 dark:text-orange-400" size={24} />
                          <h5 className="text-lg font-bold text-orange-600 dark:text-orange-300">Medium</h5>
                        </div>
                        <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-2">
                          {leetcodeStats.mediumSolved}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          out of {leetcodeStats.totalMedium}+ problems
                        </div>
                        <div className="w-full bg-orange-200 dark:bg-orange-900/30 rounded-full h-2 mb-2">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${calculatePercentage(leetcodeStats.mediumSolved, leetcodeStats.totalMedium)}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: 0.7 }}
                          />
                        </div>
                        <div className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                          {calculatePercentage(leetcodeStats.mediumSolved, leetcodeStats.totalMedium)}% completion
                        </div>
                      </motion.div>

                      {/* Hard */}
                      <motion.div
                        className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 p-6 rounded-2xl border border-red-200 dark:border-red-800/30"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <AlertCircle className="text-red-500 dark:text-red-400" size={24} />
                          <h5 className="text-lg font-bold text-red-600 dark:text-red-300">Hard</h5>
                        </div>
                        <div className="text-3xl font-bold text-red-500 dark:text-red-400 mb-2">
                          {leetcodeStats.hardSolved}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          out of {leetcodeStats.totalHard}+ problems
                        </div>
                        <div className="w-full bg-red-200 dark:bg-red-900/30 rounded-full h-2 mb-2">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${calculatePercentage(leetcodeStats.hardSolved, leetcodeStats.totalHard)}%` } : { width: 0 }}
                            transition={{ duration: 1.5, delay: 0.9 }}
                          />
                        </div>
                        <div className="text-xs text-red-500 dark:text-red-400 font-medium">
                          {calculatePercentage(leetcodeStats.hardSolved, leetcodeStats.totalHard)}% completion
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                      Core Programming Skills
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 dark:border-slate-600/20"
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h5 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                              {skill.name}
                            </h5>
                            <span className="text-sm font-bold text-blue-500 dark:text-blue-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-sm`}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{
                                duration: 1.5,
                                delay: 1.1 + index * 0.1,
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to get a color for a programming language
const getLanguageColor = (language: string): string => {
  switch (language) {
    case 'TypeScript': return '#3178C6';
    case 'Python': return '#3572A5';
    case 'JavaScript': return '#F7DF1E';
    case 'HTML': return '#E34F26';
    case 'CSS': return '#1572B6';
    case 'Jupyter Notebook': return '#DA5B0B';
    default: return '#808080';
  }
};

export default CodingProfiles;