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
          <a
            v-if="metadata.link"
            class="border border-gray-300 rounded px-2 py-0.5 cursor-pointer flex items-center"
            :href="metadata.value"
            target="_blank"
          >
            <span class="mr-auto">Link</span>
            <font-awesome-icon icon="external-link-alt" />
          </a>
					<DMSInput
            v-else
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
	import DMSInput from "./DMSInput.vue";
  import { getFileMetadata } from "../api/files";
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
				this.fileData = await getFileMetadata(this.file);
				this.loading = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>