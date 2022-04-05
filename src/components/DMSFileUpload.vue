<template>
	<div>
		<DMSTooltip
			class="px-2 py-1 text-2xl cursor-pointer"
			position="bottom"
			@click="toggle"
		>
			<template #activator>
				<font-awesome-icon icon="file-upload" />
			</template>
			<span>Upload File</span>
		</DMSTooltip>
		<div
			class="fixed inset-0 bg-black z-50 bg-opacity-50 transition-all duration-300 ease-in-out p-4"
			:class="[show ? 'opacity-1' : 'opacity-0 pointer-events-none']"
		>
			<div
				class="h-full w-full bg-white rounded shadow flex flex-col overflow-hidden"
			>
				<div
					class="flex-shrink-0 bg-gray-200 px-4 py-2 flex items-center"
				>
					<div class="text-3xl font-bold">File Upload</div>
					<button
						class="ml-auto text-2xl flex items-center"
						@click="toggle"
					>
						<font-awesome-icon icon="times" />
					</button>
				</div>
				<div
					class="flex-grow border-t-2 border-b-2 border-gray-300 flex"
				>
					<DMSFileLoader class="w-1/2" v-model="files" />
					<DMSFileUploadConfig class="w-1/2" :files="files" />
				</div>
				<div
					class="flex-shrink-0 bg-gray-200 px-4 py-2 flex items-center"
				>
					<div>Files to upload: {{ files.length }}</div>
					<div class="ml-auto">
						<DMSButton
							class="mr-2"
							color="red"
							:disabled="!files.length"
							@click="clearFiles"
						>
							<span>Clear</span>
						</DMSButton>
						<DMSButton :disabled="!files.length" @click="upload">
							<span>Upload</span>
						</DMSButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DMSButton from "./DMSButton.vue";
	import DMSFileLoader from "./DMSFileLoader.vue";
	import DMSFileUploadConfig from "./DMSFileUploadConfig.vue";
	import DMSTooltip from "./DMSTooltip.vue";

	export default {
		name: "DMSFileUpload",
		components: {
			DMSTooltip,
			DMSButton,
			DMSFileLoader,
			DMSFileUploadConfig,
		},
		data: () => ({
			show: false,
			files: [],
		}),
		methods: {
			toggle: function () {
				this.clearFiles();
				this.show = !this.show;
			},
			clearFiles: function () {
				this.files = [];
			},
			upload: function () {
				this.clearFiles();
				this.toggle();
			},
		},
	};
</script>