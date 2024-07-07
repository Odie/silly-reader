import { json } from '@sveltejs/kit';
import { cacheStore, cacheRetrieve } from '$lib/server/filecache'
import * as cheerio from 'cheerio';

function extracrContent(html: string) {
  const $ = cheerio.load(html);

  // Find the element with id='nr'
  const content = $('#nr');

  // Remove all script tags
  content.find('script').remove();

  const linkBtns = $('.operate .btn-primary');
  const prevLink = linkBtns.first().attr('href');
  const nextLink = linkBtns.last().attr('href');

  // Return the cleaned HTML content
  return { "content": content.html(), prevLink, nextLink };
}

export async function GET({ url }) {
  const targetUrl = url.searchParams.get('url');

  console.log("Trying to fetch from serverside!")

  if (!targetUrl) {
    return json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    // Try to retrieve from cache first
    let html = await cacheRetrieve(targetUrl);

    if (!html) {
      // If not in cache, fetch from the source
      const response = await fetch(targetUrl);
      html = await response.text();

      // Store the fetched content in cache
      await cacheStore(targetUrl, html);
    }

    return json(extracrContent(html));
  } catch (error) {
    console.error('Error fetching or caching content:', error);
    return json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
