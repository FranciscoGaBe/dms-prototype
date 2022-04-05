<template>
	<div class="h-full flex items-center justify-center flex-col">
		<form class="bg-white p-4 rounded-sm shadow-md text-center w-64" @submit.prevent="login">
			<h2 class="text-4xl font-bold mb-4">DMS</h2>
      <div v-if="error" class="bg-red-500 text-white rounded my-2">{{ error }}</div>
			<DMSInput class="w-full mb-2" placeholder="Username" v-model="username" @input="onInput" />
			<DMSInput
				class="w-full mb-3"
				type="password"
				placeholder="Password"
        v-model="password"
        @input="onInput"
			/>
			<DMSButton
				block
				:disabled="disabled"
				:loading="loading"
				>Login</DMSButton
			> 
		</form>
    <div class="mt-2 text-gray-400">Username and password: admin</div>
	</div>
</template>

<script>
	import DMSButton from "@/components/DMSButton.vue";
	import DMSInput from "@/components/DMSInput.vue";
	import { login } from "@/api/users.js";

	export default {
		name: "Login",
		data: () => ({
			username: "",
			password: "",
      error: "",
			loading: false,
		}),
		components: {
			DMSButton,
			DMSInput,
		},
    computed: {
      disabled: function () {
        if (this.loading) return true;
        if (!this.username || !this.password) return true;
        return false;
      }
    },
		methods: {
      onInput: function () { this.error = "" },
			login: async function () {
				try {
          this.loading = true;
          const data = await login(this.username, this.password);
          if (!data) throw new Error("Something went wrong");
          this.loading = false;
          this.$router.replace({
            name: "explorer",
            params: { folder: "@home" },
          });
        }
        catch (err) {
          this.error = err.message;
          this.loading = false;
        }
			},
		},
	};
</script>