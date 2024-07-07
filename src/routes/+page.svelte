<script>
	import { writable } from 'svelte/store';

	const url = writable('');
	const content = writable('');

	function goToPreviousChapter() {
		console.log('Previous Chapter');
	}

	function goToNextChapter() {
		console.log('Next Chapter');
	}
</script>

<div class="flex flex-col h-screen bg-gray-900 text-gray-200">
	<div class="bg-gray-800 p-4">
		<input
			type="text"
			placeholder="Enter URL"
			bind:value={$url}
			on:input={() => console.log($url)}
			class="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200"
		/>
	</div>

	<div class="flex-1 overflow-y-auto p-4 bg-gray-900">
		{#if $content}
			<p>{$content}</p>
		{/if}
	</div>

	<div class="bg-gray-800 p-4 flex justify-between">
		<button on:click={goToPreviousChapter} class="bg-gray-700 text-gray-200 px-4 py-2 rounded">
			Previous Chapter
		</button>
		<button on:click={goToNextChapter} class="bg-gray-700 text-gray-200 px-4 py-2 rounded">
			Next Chapter
		</button>
	</div>
</div>

<style>
	body {
		margin: 0;
		font-family: sans-serif;
	}
</style>

