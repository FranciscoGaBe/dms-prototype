<template>
	<div class="relative w-full">
		<div
			v-show="show"
			class="w-44 bg-white bottom-0 absolute rounded border-2 border-gray-200 shadow"
			style="left: 120%"
		>
			<div
				v-for="button in buttons"
				:key="button.name"
				class="flex items-center w-full px-2 py-1 cursor-not-allowed hover:bg-gray-100"
			>
				<span class="flex-shrink-0 mr-2 w-5 text-center">
					<font-awesome-icon :icon="button.icon" />
				</span>
				<span class="flex-shrink-0">{{ button.name }}</span>
			</div>
			<div class="border border-gray-200"></div>
			<div
				class="flex items-center w-full px-2 py-2 cursor-pointer hover:bg-red-500 hover:text-white"
				@click="logout"
			>
				<span class="flex-shrink-0 mr-2 w-5 text-center">
					<font-awesome-icon icon="sign-out-alt" />
				</span>
				<span class="flex-shrink-0">Logout</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DMSLeftBarMenu",
		props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		data: () => ({
			buttons: [
				{ icon: "cog", name: "Control Panel" },
				{ icon: "user", name: "Entities" },
				{ icon: "eye", name: "OCR" },
			],
		}),
		methods: {
			logout: function () {
				this.$router.replace("/");
			},
		},
	};
</script>