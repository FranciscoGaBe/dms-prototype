<template>
	<div>
		<div
			v-for="(x, y) in Array(number)"
			:key="y"
			class="flex my-1 bg-gray-300 border-2 border-gray-300 rounded overflow-hidden h-14 animate-pulse z-10"
		></div>
	</div>
</template>

<script>
	export default {
		name: "DMSItemsSkeleton",
		props: {
			number: {
				type: Number,
				default: 4,
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>