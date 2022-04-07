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
			class="fixed inset-0 bg-black z-50 bg-opacity-50 transition-all duration-300 ease-in-out md:p-4"
			:class="[show ? 'opacity-1' : 'opacity-0 pointer-events-none']"
		>
			<div
				class="h-full w-full bg-white md:rounded shadow flex flex-col overflow-hidden"
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
        <div class="md:hidden bg-gray-200 border-t border-b border-gray-300 px-2 py-1 flex justify-between items-center`">
          <button @click="changeShowFiles()">Files</button>
          <button @click="changeShowFiles(false)">Config</button>
        </div>
				<div
					class="flex-grow border-t-2 border-b-2 border-gray-300 flex"
				>
					<DMSFileLoader class="w-full md:w-2/5" :class="{ 'hidden md:block': !showFiles }" v-model="files" />
					<DMSFileUploadConfig class="w-full md:w-3/5" :class="{ 'hidden md:block': showFiles }" :files="files" />
				</div>
				<div
					class="flex-shrink-0 bg-gray-200 px-4 py-2 flex items-center"
				>
					<div>Files to upload: {{ files.length }}</div>
					<div class="ml-auto">
						<DMSButton
							class="mr-2"
							color="red"
							:disabled="!files.length || uploading"
							@click="clearFiles"
						>
							<span>Clear</span>
						</DMSButton>
						<DMSButton :disabled="!files.length || uploading" @click="upload">
							<span>Upload</span>
						</DMSButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { _addFile } from "../api/files";
import { makeFakeAPI, random } from "../utils/utils";
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
    props: {
      folder: {
				type: String,
				required: true,
			}
    },
		data: () => ({
			show: false,
			files: [],
      showFiles: true,
      uploading: false
		}),
		methods: {
			toggle: function () {
        if (this.uploading) return;
				this.clearFiles();
				this.show = !this.show;
			},
			clearFiles: function () {
				this.files = [];
			},
			upload: async function () {
        this.uploading = true;
        this.changeShowFiles();
        try {
          const uploads = this.files.map(file => new Promise(async resolve => {
            const duration = random(1000, 5000);
            const update = 100;
            const updateProgress = () => {
              file.progress += update * 100 / duration;
              file.progress = Math.round(file.progress * 100) / 100;
              if (file.progress > 100) file.progress = 100;
              this.files = [...this.files];
              if (file.progress < 100) return setTimeout(() => updateProgress(), update);
            }
            setTimeout(() => updateProgress(), update);
            await makeFakeAPI(_addFile, duration, duration)(file, this.folder);
            resolve();
          }))
          await Promise.all(uploads);
          await makeFakeAPI(() => {}, 1000, 1000)();
          this.clearFiles();
          this.uploading = false;
          this.$emit('finished');
          this.toggle();
        }
        catch (err) {
          this.uploading = false;
        }
			},
      changeShowFiles: function (value = true) { this.showFiles = value; }
		},
	};
</script>