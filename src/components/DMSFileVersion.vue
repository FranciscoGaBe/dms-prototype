<template>
	<div class="h-full p-4">
		<template v-if="!loading">
      <a ref="download" class="hidden" download></a>
      <div class="text-right mb-3">
        <input ref="input" type="file" class="hidden" @change="onNewVersion">
        <button class="text-gray-400 font-semibold" @click="$refs.input.click()">
          <font-awesome-icon class="mr-1" icon="plus" />
          <span>New version</span>
        </button>
      </div>
      <button
				v-for="version in fileData.versions"
				:key="version.version"
				class="flex my-1 bg-gray-200 hover:bg-gray-300 border-2 border-gray-300 rounded overflow-hidden w-full"
        @click="downloadVersion(version.version)"
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
					<div class="text-left">
						<p class="font-medium">Version: {{ version.version }}</p>
            <p class="text-xs text-gray-400">Download</p>
					</div>
					<div class="ml-auto text-right">
						<p>{{ version.modifiedBy }}</p>
						<p class="text-xs font-light">
							{{ version.date | date }}
						</p>
					</div>
				</div>
			</button>
    </template>
		<DMSItemsSkeleton v-else />
	</div>
</template>

<script>
	import { dateToLocale } from "@/utils/utils";
	import DMSTooltip from "./DMSTooltip.vue";
	import DMSItemsSkeleton from "./DMSItemsSkeleton.vue";
  import { getFileVersions, addVersion, downloadVersion } from "../api/files";

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
        catch (err) {
          this.$alert(err);
        }
        this.loading = false;
      },
      downloadVersion: async function (version) {
        try {
          const file = await downloadVersion(this.file, version);
          const download = this.$refs.download;
          download.href = URL.createObjectURL(file);
          download.download = file.name;
          download.click();
        }
        catch (err) {
          this.$alert(err);
        }
      }
		},
		filters: {
			date: dateToLocale,
		},
	};
</script>