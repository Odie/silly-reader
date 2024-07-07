<script lang="ts">
	export let value: string;
	export let handleNewValue: ((value: string) => void) | undefined = undefined;
	let internalValue: string = value;

	// Dispatch the enter event with the input value when Enter is pressed
	function handleKeyPressInternal(event: KeyboardEvent) {
		console.log('handleKeyPressInternal: ', event);
		if (event.key === 'Enter' && handleNewValue) {
			handleNewValue(internalValue);
		}
	}
</script>

<div class="bg-gray-800 p-4">
	<input
		type="text"
		placeholder="Enter URL"
		bind:value={internalValue}
		on:keypress={handleKeyPressInternal}
		class="w-full p-2 border border-gray-700 rounded bg-gray-700 text-gray-200"
	/>
</div>
