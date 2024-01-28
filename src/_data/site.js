const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: 'https://woojinp1994.github.io/',
  },
};

module.exports = {
  title: 'Woojin Park',
  author: 'Woojin Park',
  email: '',
  description: 'Personal website',
  keywords: [],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
