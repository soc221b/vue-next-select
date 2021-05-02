module.exports = {
  lang: 'en-US',
  base: '/vue-next-select/',
  title: 'Vue next select',
  description: 'The selecting solution for Vue 3',
  markdown: {
    code: {
      lineNumbers: true,
    },
  },
  themeConfig: {
    repo: 'iendeavor/vue-next-select',
    docsDir: 'docs',

    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Examples', link: '/#examples', activeMatch: '/#examples' },
      { text: 'API Reference', link: '/api-reference', activeMatch: '/api-reference' },
      { text: 'Change Logs', link: 'https://github.com/iendeavor/vue-next-select/blob/main/CHANGELOG.md' },
    ],
  },
}
