<template>
	<div class="h-full flex flex-col">
		<div class="flex items-center shadow bg-gray-100 flex-shrink-0">
			<div class="text-2xl w-14 h-14 flex-shrink-0">
				<button
					v-show="tabIndex !== 0"
					class="w-full h-full"
					@click="tabIndex--"
				>
					<font-awesome-icon icon="chevron-left" />
				</button>
			</div>
			<div class="flex-grow text-center text-2xl font-medium uppercase">
				{{ selectedTab }}
			</div>
			<div class="text-2xl w-14 h-14 flex-shrink-0">
				<button
					v-show="tabIndex !== tabs.length - 1"
					class="w-full h-full"
					@click="tabIndex++"
				>
					<font-awesome-icon icon="chevron-right" />
				</button>
			</div>
		</div>
		<div class="flex-grow">
			<div v-if="selectedTab === 'template'" class="p-4">
				<div
					v-for="(file, index) in files"
					:key="index"
					class="flex items-center my-1 bg-gray-200 border-2 rounded border-gray-300 px-2 py-1"
				>
					<DMSTooltip
						class="flex-shrink-0 w-2/3 overflow-ellipsis overflow-hidden pr-2"
					>
						<template #activator>
							<span>{{ file.name }}</span>
						</template>
						<span>{{ file.name }}</span>
					</DMSTooltip>
					<select
						class="flex-grow border border-gray-300 rounded px-2 py-0.5 outline-none focus:outline-none focus:border-gray-500 transition-all duration-300 ease-in-out"
					>
						<option
							v-for="template in templates"
							:key="template"
							value="template"
						>
							{{ template }}
						</option>
					</select>
				</div>
			</div>
			<template v-else-if="selectedTab === 'metadata'">
				<div
					v-show="currentFile === index"
					v-for="(file, index) in files"
					:key="index"
					class="flex flex-col h-full w-full"
				>
					<div class="flex-grow p-4">
						<div class="px-2 mb-4 flex items-center">
							<div class="text-sm">
								<span>Template: </span>
								<span class="font-medium">{{
									templates[0]
								}}</span>
							</div>
							<DMSButton class="ml-auto text-xs" @click="scan">
								<span>SCAN</span>
							</DMSButton>
						</div>
						<div
							v-for="(data, dataIndex) in metadata"
							:key="data"
							class="flex items-center bg-gray-200 border-2 border-gray-300 rounded px-2 py-1 my-1"
						>
							<div class="w-1/4 font-medium">{{ data }}</div>
							<div class="w-3/4">
								<DMSInput
									class="w-full"
									v-model="dataValues[dataIndex]"
								/>
							</div>
						</div>
					</div>
					<div
						class="flex items-center shadow bg-gray-100 flex-shrink-0 border-t border-gray-200"
					>
						<div class="text-sm w-10 h-10 flex-shrink-0">
							<button
								v-show="currentFile !== 0"
								class="w-full h-full"
								@click="currentFile--"
							>
								<font-awesome-icon icon="chevron-left" />
							</button>
						</div>
						<div class="flex-grow text-center text-xs font-medium">
							{{ file.name }}
						</div>
						<div class="text-sm w-10 h-10 flex-shrink-0">
							<button
								v-show="currentFile !== files.length - 1"
								class="w-full h-full"
								@click="currentFile++"
							>
								<font-awesome-icon icon="chevron-right" />
							</button>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import DMSInput from "./DMSInput.vue";
	import DMSTooltip from "./DMSTooltip.vue";
	import DMSButton from "./DMSButton.vue";
	export default {
		components: { DMSTooltip, DMSInput, DMSButton },
		name: "DMSFileUploadConfig",
		props: {
			files: {
				type: Array,
				default: () => [],
			},
		},
		data: () => ({
			tabs: ["template", "metadata"],
			tabIndex: 0,

			templates: ["Supplier"],

			currentFile: 0,
			metadata: ["Client", "Address", "Phone Number", "Expedition", "Total"],
			dataValues: ["", "", "", "", ""],
		}),
		computed: {
			selectedTab: function () {
				return this.tabs[this.tabIndex];
			},
		},
		watch: {
			currentFile: function () {
				this.clearData();
			},
		},
		methods: {
			scan: function () {
				this.dataValues = this.dataValues.map(
					(_, index) => `${this.metadata[index]} value`
				);
			},
			clearData: function () {
				this.dataValues = this.dataValues.map(() => "");
			},
		},
	};
</script>