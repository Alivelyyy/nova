/**
 * Application-wide constants and configuration
 */
export const config = {
  // Base URL
  baseUrl: "https://nova.ai",

  // GitHub
  github: {
    repoUrl: "https://github.com/anomalyco/nova",
    starsFormatted: {
      compact: "195K",
      full: "195,000",
    },
  },

  // Social links
  social: {
    twitter: "https://x.com/nova",
    discord: "https://discord.gg/nova",
  },

  // Static stats (used on landing page)
  stats: {
    contributors: "950",
    commits: "13,000",
    monthlyUsers: "16M",
  },
} as const
