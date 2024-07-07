import { writable } from 'svelte/store';
import type { FetchContentResponse } from '$lib/types';

// Create writable stores
export const urlStore = writable('');
export const urlContentStore = writable<FetchContentResponse | null>(null);
export const txtContentStore = writable('');
