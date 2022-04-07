<template>
	<div class="h-full p-4">
		<template v-if="!loading">
      <div class="text-right mb-3">
        <input ref="input" type="file" class="hidden" @change="onNewVersion">
        <button class="text-gray-400 font-semibold" @click="$refs.input.click()">
          <font-awesome-icon class="mr-1" icon="plus" />
          <span>New version</span>
        </button>
      </div>
      <div
				v-for="version in fileData.versions"
				:key="version.version"
				class="flex my-1 bg-gray-200 border-2 border-gray-300 rounded overflow-hidden"
			>
				<DMSTooltip class="w-1.5 self-stretch" position="right">
					<template #activator>
						<div
							class="w-full h-full"
							:class="[colors[version.status]]"
						></div>
					</template>
					<span>{{ version.status }}</span>
				</DMSTooltip>
				<div class="flex items-center flex-grow px-2 py-1">
					<div class="font-medium">
						Version: {{ version.version }}
					</div>
					<div class="ml-auto text-right">
						<div>{{ version.modifiedBy }}</div>
						<div class="text-xs font-light">
							{{ version.date | date }}
						</div>
					</div>
				</div>
			</div>
    </template>
		<DMSItemsSkeleton v-else />
	</div>
</template>

<script>
	import { dateToLocale } from "@/utils/utils";
	import DMSTooltip from "./DMSTooltip.vue";
	import DMSItemsSkeleton from "./DMSItemsSkeleton.vue";
  import { getFileVersions, addVersion } from "../api/files";

	export default {
		components: { DMSTooltip, DMSItemsSkeleton },
		name: "DMSFileVersion",
		props: {
			file: {
				type: String,
				required: true,
			},
		},
		data: () => ({
			loading: true,
			fileData: {},
			colors: {
				deleted: "bg-red-500",
				active: "bg-green-400",
				expiring: "bg-yellow-400",
			},
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
				this.fileData = await getFileVersions(this.file);
				this.loading = false;
			},
      onNewVersion: async function () {
        const file = this.$refs.input.files[0];
        this.loading = true;
        try {
          this.fileData = await addVersion(this.file, file);
          this.$emit('version', this.fileData.version);
        }
        catch (err) {}
        this.loading = false;
      }
		},
		filters: {
			date: dateToLocale,
		},
	};
</script>