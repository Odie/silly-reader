import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_DIR = '.cache';

// Ensure the cache directory exists
async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating cache directory:', error);
  }
}

// Generate MD5 hash for a given string
function md5(str: string) {
  return createHash('md5').update(str).digest('hex');
}

// Function to store data in the cache
export async function cacheStore(url: string, content: string) {
  await ensureCacheDir();
  const filename = md5(url);
  const filepath = path.join(CACHE_DIR, filename);
  try {
    await fs.writeFile(filepath, content);
    console.log(`Cached content for ${url}`);
  } catch (error) {
    console.error(`Error caching content for ${url}:`, error);
  }
}

// Function to retrieve data from the cache
export async function cacheRetrieve(url: string): Promise<string | null> {
  const filename = md5(url);
  const filepath = path.join(CACHE_DIR, filename);
  try {
    const content = await fs.readFile(filepath, 'utf-8');
    console.log(`Retrieved cached content for ${url}`);
    return content;
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error(`Error retrieving cached content for ${url}:`, error);
    }
    return null;
  }
}
