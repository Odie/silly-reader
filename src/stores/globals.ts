import { writable } from 'svelte/store';

// Create writable stores
export const urlStore = writable('');
export const urlContentStore = writable('');
export const txtContentStore = writable('');
