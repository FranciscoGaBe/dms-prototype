<template>
	<div class="h-full p-4">
		<template v-if="!loading">
			<div
				v-for="field in fields"
				:key="field.key"
				class="flex items-center bg-gray-200 border-2 rounded border-gray-300 px-2 py-1 my-1"
			>
				<div class="text-lg font-medium">{{ field.name }}</div>
				<div class="ml-auto text-sm">
					{{
						field.render
							? field.render(fileData[field.key])
							: fileData[field.key]
					}}
				</div>
			</div>
		</template>
		<DMSItemsSkeleton v-else />
	</div>
</template>

<script>
	import { dateToLocale, sizeConversion } from "@/utils/utils";
  import { getFileInfo } from "../api/files";
	import DMSItemsSkeleton from "./DMSItemsSkeleton.vue";
	export default {
		components: { DMSItemsSkeleton },
		name: "DMSFileInfo",
		props: {
			file: {
				type: String,
				required: true,
			},
		},
		data: () => ({
			loading: true,
			fileData: {},
			fields: [
				{ key: "name", name: "Name" },
				{ key: "version", name: "Version" },
				{ key: "size", name: "Size", render: sizeConversion },
				{
					key: "created",
					name: "Created",
					render: dateToLocale,
				},
				{
					key: "modified",
					name: "Modified",
					render: dateToLocale,
				},
			],
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
				this.fileData = await getFileInfo(this.file);
				this.loading = false;
			},
		},
	};
</script>