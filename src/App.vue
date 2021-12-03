<template>
	<div
		id="app"
		class="bg-gray-200 font-roboto text-gray-700 select-none overflow-hidden"
	>
		<router-view />
	</div>
</template>

<style>
	* {
		min-width: 0;
		min-height: 0;
	}

	html,
	body,
	#app {
		height: 100%;
	}
</style>
