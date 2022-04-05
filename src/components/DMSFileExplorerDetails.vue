<template>
	<div
		class="bg-gray-200 border-l-2 border-gray-300 transition-all duration-300 ease-in-out h-full overflow-hidden"
		:class="[file ? 'w-1/3' : 'w-0']"
	>
		<div v-if="file" class="h-full flex flex-col">
			<div class="flex-shrink-0" :class="{ 'animate-pulse': loading }">
				<div class="p-4">
					<div class="flex items-center">
						<div
							class="text-2xl font-medium"
							:class="{ 'bg-gray-700 rounded': loading }"
						>
							{{ fileData.name || "loading" }}
						</div>
						<DMSElementMenu class="ml-auto" :item="fileData">
							<template #default="{ on }"
								><div
									class="text-2xl px-2 py-1 cursor-pointer"
									v-on="on"
								>
									<font-awesome-icon icon="ellipsis-v" /></div
							></template>
						</DMSElementMenu>
					</div>
					<div class="text-center text-7xl my-4">
						<font-awesome-icon icon="file" />
					</div>
					<div class="flex items-center">
						<div
							class="ml-auto text-sm font-medium"
							:class="{ 'bg-gray-700 rounded': loading }"
						>
							Version: {{ fileData.version }}
						</div>
					</div>
				</div>
			</div>
			<div v-if="!loading" class="flex-shrink-0 flex">
				<DMSTooltip
					v-for="tab in tabs"
					:key="tab.id"
					class="flex-grow text-center cursor-pointer transition-all duration-300 ease-in-out py-1 rounded-tr rounded-tl"
					:class="[
						tab.id === $route.name
							? 'bg-white'
							: 'hover:bg-gray-100',
					]"
					@click="selectTab(tab.id)"
				>
					<template #activator>
						<font-awesome-icon :icon="tab.icon" />
					</template>
					<span>{{ tab.name }}</span>
				</DMSTooltip>
			</div>
			<div class="flex-grow bg-white">
				<keep-alive>
					<router-view />
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
	import DMSTooltip from "./DMSTooltip.vue";
	import DMSElementMenu from "./DMSElementMenu.vue";
  import { getFile } from "../api/files";
	export default {
		name: "DMSFileExplorerDetails",
		components: {
			DMSTooltip,
			DMSElementMenu,
		},
		props: {
			file: {
				type: String,
				required: true,
			},
			files: {
				type: Array,
				default: () => [],
			},
		},
		data: () => ({
			loading: true,
			allTabs: {
				info: { icon: "info", name: "Information" },
				version: {
					icon: "code-branch",
					name: "Versions",
				},
				metadata: { icon: "tag", name: "Metadata" },
			},
			fileData: {
				id: "",
				name: "",
				version: 0,
				tabs: [],
			},
		}),
		computed: {
			selectedTab: function () {
				return this.allTabs[this.$route.name];
			},
			tabs: function () {
				return this.fileData.tabs
					.filter((tab) => this.allTabs[tab])
					.map((tab) => ({ ...this.allTabs[tab], id: tab }));
			},
		},
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
        if (!this.file) return;
				this.loading = true;
				try {
          this.fileData = await getFile(this.file);
        }
        catch (err) {
          this.$router.replace({
            name: this.$route.name,
            params: {
              ...this.$route.params,
              file: ""
            },
          });
        }
				this.loading = false;
			},
			selectTab: function (index) {
				if (index === this.$route.name) return;
				this.$router.replace({
					name: index,
					params: this.$route.params,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>