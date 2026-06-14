/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://benserhat.com',
  exclude: ['/' + process.env.URL, '/docs'],

  additionalPaths: async (config) => {
    const html = await fetch("https://benserhat.com/blog").then(r => r.text());

    const urls = [...html.matchAll(/href="([^"]+)"/g)]
      .map(m => m[1])
      .filter(url => url.startsWith("/blog/"));

    return urls.map((url) => ({
      loc: url,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString()
    }));
  }
};