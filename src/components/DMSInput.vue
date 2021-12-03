<template>
	<input
		class="border border-gray-300 rounded px-2 py-0.5 outline-none focus:outline-none focus:border-gray-500 transition-all duration-300 ease-in-out"
		v-bind="$props"
		v-on="listeners"
		@input="onInput"
	/>
</template>

<script>
	export default {
		name: "DMSInput",
		props: {
			value: {
				default: "",
			},
		},
		computed: {
			listeners: function () {
				const listeners = { ...this.$listeners };
				if (listeners.input) delete listeners.input;
				return listeners;
			},
		},
		methods: {
			onInput: function (event) {
				this.$emit("input", event.currentTarget.value);
			},
		},
	};
</script>