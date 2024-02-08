const Cache = require('@11ty/eleventy-cache-assets');
const path = require('path');
const { imagePaths } = require('../../config/constants');
const { imageShortcode } = require('../../config/shortcodes/');

// Combination of static + dynamic data
const repos = {
  hallofgoats: {
    getIcon: () => '🐐',
    name: 'Hall of GOATs',
    repo: 'woojinp1994/hall_of_goats',
    tech: ['python', 'spark', 'docker', 'postgresql'],
  },
  grody: {
    getIcon: () => '🧺',
    name: 'Grody Bot',
    repo: 'woojinp1994/discord_grody',
    tech: ['python', 'nosql'],
  },
  blog: {
    getIcon: async () => {
      const icon = await imageShortcode({
        src: path.join(imagePaths.input, 'favicons/favicon.png'),
        alt: '',
        isLinked: false,
        widths: [32],
      });
      return icon;
    },
    name: 'This website!',
    repo: 'woojinp1994/woojinp1994.github.io',
    tech: ['11ty', 'sass', 'javascript'],
  },
  detools: {
    getIcon: () => '🔧',
    name: 'Data Engineering Tools',
    repo: 'woojinp1994/de_learning',
    tech: ['python', 'spark', 'mage', 'google cloud'],
  },
};

const fetchRepo = async (repoKey) => {
  const staticConfig = repos[repoKey];
  const icon = await staticConfig.getIcon();
  const data = await Cache(`https://api.github.com/repos/${staticConfig.repo}`, {
    duration: '1d',
    type: 'json',
  });
  return {
    icon,
    name: staticConfig.name ?? data.name,
    rating: data.stargazers_count,
    description: data.description.endsWith('.') ? data.description : `${data.description}.`,
    url: staticConfig.url ?? data.html_url,
    tech: staticConfig.tech,
  };
};

module.exports = async () => {
  console.log('Fetching GitHub projects...');
  const projects = await Promise.all(Object.keys(repos).map((key) => fetchRepo(key)));
  // Highest rated projects first
  return projects.sort((a, b) => b.rating - a.rating);
};
