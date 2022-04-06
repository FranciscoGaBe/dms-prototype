<template>
	<div class="h-full flex">
		<div class="flex-grow h-full flex flex-col pt-4 md:pl-4">
			<div
				class="pb-1 border-b-2 pl-2 pr-2 md:pr-8 border-gray-300 flex-shrink-0 flex items-center"
			>
				<div
					:class="{
						'animate-pulse text-gray-400 bg-gray-400 rounded':
							loading,
					}"
				>
					<template v-if="$route.params.folder !== '@home'">
						<span
							class="text-sm font-medium cursor-pointer"
							@click="goTo()"
							>Home</span
						>
						<span class="mx-2 text-sm"
							><font-awesome-icon icon="chevron-right"
						/></span>
					</template>
					<span class="text-3xl font-bold uppercase">{{
						folderData.folder
					}}</span>
				</div>
				<DMSAdvanceSearch class="ml-auto" />
				<DMSFileUpload />
			</div>
			<template v-if="!loading">
				<div class="px-2 md:px-4 py-2 flex-grow overflow-auto">
					<DMSFileExplorerItem
						v-for="folder in folderData.folders"
						:key="folder.id"
						:item="folder"
						folder
						:items="folderData.folders"
						@selectFolder="selectFolder"
					/>
					<DMSFileExplorerItem
						v-for="file in folderData.files"
						:key="file.id"
						:item="file"
						:items="folderData.files"
						@selectFile="selectFile"
					/>
				</div>
			</template>
			<DMSItemsSkeleton v-else class="px-2 md:px-4 py-2" :number="10" />
		</div>
		<DMSFileExplorerDetails
			:file="file"
			:files="folderData.files"
			class="flex-shrink-0"
		/>
	</div>
</template>

<script>
	import DMSFileExplorerItem from "./DMSFileExplorerItem.vue";
	import DMSFileExplorerDetails from "./DMSFileExplorerDetails.vue";
	import DMSItemsSkeleton from "./DMSItemsSkeleton.vue";
	import DMSAdvanceSearch from "./DMSAdvanceSearch.vue";
	import DMSFileUpload from "./DMSFileUpload.vue";
  import { getFolder } from "../api/folders";
  
	export default {
		name: "DMSFileExplorer",
		components: {
			DMSFileExplorerItem,
			DMSFileExplorerDetails,
			DMSItemsSkeleton,
			DMSAdvanceSearch,
			DMSFileUpload,
		},
		props: {
			folder: {
				type: String,
				required: true,
			},
			file: {
				type: String,
				required: true,
			},
		},
		data: () => ({
			loading: false,
			folderData: {
				files: [],
				folders: [],
				folder: "Loading",
			},
			selectedFile: {},
		}),
		watch: {
			folder: {
				immediate: true,
				handler: function () {
					this.getFolderData();
				},
			},
		},
		methods: {
			getFolderData: async function () {
				this.loading = true;
				this.folderData = await getFolder(
					this.folder !== "@home" ? this.folder : "Explorer"
				);
				this.loading = false;
			},
			selectFile: function (id) {
				const back = id === this.$route.params.file;
				this.$router.replace({
					name: back ? "explorer" : "info",
					params: {
						...this.$route.params,
						file: back ? "" : id,
					},
				});
			},
			selectFolder: function (id) {
				this.$router.replace({
					name: "explorer",
					params: {
						...this.$route.props,
						folder: id,
					},
				});
			},
			goTo: function (folder = "@home") {
				this.$router.replace({
					name: "explorer",
					params: {
						...this.$route.params,
						folder,
						file: "",
					},
				});
			},
		},
	};
</script>