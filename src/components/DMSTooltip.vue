<template>
	<div
		class="relative"
		v-on="$listeners"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
	>
		<div
			class="absolute bg-black bg-opacity-60 rounded text-white px-2 py-1 whitespace-nowrap text-sm z-40 pointer-events-none transition-all ease-in-out duration-200"
			:class="[show ? 'opacity-1' : 'opacity-0']"
			:style="styles"
		>
			<slot>Tooltip</slot>
		</div>
		<slot name="activator"></slot>
	</div>
</template>

<script>
	export default {
		name: "DMSTooltip",
		props: {
			position: {
				type: String,
				default: "top",
			},
		},
		data: () => ({
			show: false,
		}),
		computed: {
			styles: function () {
				const styles = {
					top: {
						top: "calc(-100% - 5px)",
						left: "50%",
						transform: "translateX(-50%)",
					},
					right: {
						top: "50%",
						left: "calc(100% + 5px)",
						transform: "translateY(-50%)",
					},
					bottom: {
						top: "calc(100% + 5px)",
						left: "50%",
						transform: "translateX(-50%)",
					},
					left: {
						top: "50%",
						right: "calc(100% + 5px)",
						transform: "translateY(-50%)",
					},
				};

				return styles[this.position];
			},
		},
		methods: {
			onMouseEnter: function () {
				this.show = true;
			},
			onMouseLeave: function () {
				this.show = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>