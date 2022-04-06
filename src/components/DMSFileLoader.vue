<template>
	<div class="bg-gray-50 border-r-2 border-gray-300">
		<input
			ref="input"
			type="file"
			class="hidden"
			multiple
			@input="getFiles"
		/>
		<div
			class="h-full w-full flex flex-col items-center justify-center cursor-pointer"
			@click="selectFiles"
		>
			<template v-if="!value.length">
				<div class="text-8xl text-blue-300">
					<font-awesome-icon icon="file-upload" />
				</div>
				<div class="mt-4 text-4xl font-medium text-gray-500">
					Select files
				</div>
			</template>
			<div v-else class="h-full w-full p-4">
				<div
					v-for="(file, index) in value"
					:key="index"
					class="flex my-2"
				>
					<div class="text-6xl text-blue-500 mr-4">
						<font-awesome-icon icon="file" />
					</div>
					<div class="w-full flex flex-col pb-0.5">
						<div class="text-lg font-medium leading-none">{{ file.name }}</div>
						<div class="text-xs">Size: {{ file.size | size }}</div>
						<div
							class="bg-gray-300 rounded relative overflow-hidden mt-auto"
						>
              <div
                class="absolute left-0 top-0 bottom-0 bg-blue-300"
                :style="{ width: file.progress + '%' }"
              ></div>
              <div class="text-center text-xs relative">{{ file.progress }}%</div>
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { sizeConversion } from "@/utils/utils";
	export default {
		name: "DMSFileLoader",
		props: {
			value: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			selectFiles: function () {
				this.$refs.input.click();
			},
			getFiles: function () {
				if (this.$refs.input.files.length === 0) return;
				this.$emit("input", [
					...this.value,
					...Array.from(this.$refs.input.files).map(file => {
            file.progress = 0;
            return file;
          }),
				]);
				this.$refs.input.value = "";
			},
		},
		filters: {
			size: sizeConversion,
		},
	};
</script>