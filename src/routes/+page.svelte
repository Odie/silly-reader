<script lang="ts">
	import { urlStore, urlContentStore } from '$stores/globals';
	import UrlInput from '$components/UrlInput.svelte';
	import type { FetchContentResponse } from '$lib/types';

	let contentDiv: HTMLDivElement;

	function handleNewUrl(url: string) {
		console.log('new url entered: ', url);
		urlStore.set(url);
	}

	function isValidUrl(url: string): boolean {
		if (!url) return false;

		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	}

	function gotoUrl(url: string) {
		if (isValidUrl(url)) {
			urlStore.set(url);

			if (contentDiv) {
				contentDiv.scrollTop = 0;
			}
		}
	}

	// Fetch the content from the given URL and update urlContent store
	async function fetchUrlContent(url: string): Promise<FetchContentResponse | undefined> {
		if (url) {
			try {
				const response = await fetch(`/api/fetch-content?url=${encodeURIComponent(url)}`);
				const text = await response.text();
				return JSON.parse(text);
			} catch (error) {
				console.error('Error fetching URL content:', error);
				urlContentStore.set(null);
				return undefined;
			}
		}
	}

	// Listen for changes in the url store
	$: {
		$urlStore, // Reactive dependency
			fetchUrlContent($urlStore).then((data) => {
				console.log('fetched data: ', data);
				if (data) {
					urlContentStore.set(data);
				}
			});
	}
</script>

<div class="flex flex-col h-screen bg-gray-900 text-gray-200">
	<UrlInput
		value="https://www.uuread.tw/chapter/913199/160418.html"
		handleNewValue={handleNewUrl}
	/>

	<div
		class="flex-1 overflow-y-auto p-6 bg-gray-900 prose-xl text-slate-400"
		bind:this={contentDiv}
	>
		{#if $urlContentStore}
			{@html $urlContentStore['content']}
		{/if}
	</div>

	<div class="bg-gray-800 p-4 flex justify-between">
		<button
			class="bg-gray-700 text-gray-200 px-4 py-2 rounded transition-colors {$urlContentStore?.prevLink
				? 'hover:bg-gray-600'
				: 'text-gray-500 cursor-not-allowed'}"
			on:click={gotoUrl($urlContentStore?.prevLink)}
		>
			Previous Chapter
		</button>
		<button
			class="bg-gray-700 text-gray-200 px-4 py-2 rounded transition-colors {$urlContentStore?.prevLink
				? 'hover:bg-gray-600'
				: 'text-gray-500 cursor-not-allowed'}"
			on:click={gotoUrl($urlContentStore?.nextLink)}
		>
			Next Chapter
		</button>
	</div>
</div>
