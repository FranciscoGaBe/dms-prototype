<template>
	<div class="h-full p-4">
		<template v-if="!loading">
			<div
				v-for="metadata in fileData.metadata"
				:key="metadata.name"
				class="flex items-center px-2 py-1 my-1 bg-gray-200 border-2 border-gray-300 rounded"
			>
				<div class="text-lg font-medium w-1/3">{{ metadata.name }}</div>
				<div class="flex-grow">
					<DMSInput
						class="w-full bg-gray-200 focus:bg-white"
						:value="metadata.value"
					/>
				</div>
			</div>
		</template>
		<DMSItemsSkeleton v-else />
	</div>
</template>

<script>
	import DMSItemsSkeleton from "./DMSItemsSkeleton.vue";
	import { APIFileMetadata } from "@/api/api";
	import DMSInput from "./DMSInput.vue";
	export default {
		components: { DMSItemsSkeleton, DMSInput },
		name: "DMSFileMetadata",
		props: {
			file: {
				type: String,
				required: true,
			},
		},
		data: () => ({
			loading: false,
			fileData: {},
		}),
		watch: {
			file: {
				immediate: true,
				handler: function () {
					this.getFileData();
				},
			},
		},
		methods: {
			getFileData: async function () {
				this.loading = true;
				this.fileData = await APIFileMetadata();
				this.loading = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>