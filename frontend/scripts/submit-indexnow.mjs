import https from 'https';

const KEY = '4a7e93f18b2c45d6e01a8f932b1e4c7d';
const HOST = 'www.khamsaprogramming.com';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  const text = await res.text();
  const matches = [...text.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map(m => m[1]);
}

async function submitIndexNow() {
  try {
    console.log('Fetching URLs from sitemap...');
    const urlList = await fetchSitemapUrls();
    console.log(`Found ${urlList.length} URLs to submit.`);

    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urlList,
    });

    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
    ];

    for (const endpoint of endpoints) {
      console.log(`Submitting to ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: payload,
      });

      console.log(`Response status from ${endpoint}: ${response.status}`);
      const text = await response.text();
      if (text) console.log(`Response body: ${text}`);
    }
  } catch (err) {
    console.error('Error submitting to IndexNow:', err);
  }
}

submitIndexNow();
