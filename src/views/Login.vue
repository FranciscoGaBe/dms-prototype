<template>
	<div class="h-full flex items-center justify-center">
		<div class="bg-white p-4 rounded-sm shadow-md text-center w-64">
			<h2 class="text-4xl font-bold mb-4">DMS Login</h2>
			<DMSInput class="w-full mb-2" placeholder="Username" />
			<DMSInput
				class="w-full mb-3"
				type="password"
				placeholder="Password"
			/>
			<DMSButton
				block
				:disabled="loading"
				@click="login"
				:loading="loading"
				>Login</DMSButton
			>
		</div>
	</div>
</template>

<script>
	import DMSButton from "@/components/DMSButton.vue";
	import DMSInput from "@/components/DMSInput.vue";
	import { APILogin } from "@/api/api.js";

	export default {
		name: "Login",
		data: () => ({
			username: "",
			password: "",
			loading: false,
		}),
		components: {
			DMSButton,
			DMSInput,
		},
		methods: {
			login: async function () {
				this.loading = true;
				await APILogin();
				this.loading = false;
				this.$router.replace({
					name: "explorer",
					params: { folder: "@home" },
				});
			},
		},
	};
</script>