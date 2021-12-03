<template>
	<button
		v-on="$listeners"
		class="text-center text-white px-3 py-2 rounded transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-opacity-50 leading-none"
		:class="[
			`bg-${color}-600 hover:bg-${color}-500`,
			block ? 'w-full' : '',
		]"
	>
		<slot></slot>
		<font-awesome-icon
			v-if="loading"
			class="ml-2 animate-spin"
			icon="spinner"
		/>
	</button>
</template>

<script>
	export default {
		name: "DMSButton",
		props: {
			color: {
				type: String,
				default: "blue",
			},
			block: {
				type: Boolean,
				default: false,
			},
			loading: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>