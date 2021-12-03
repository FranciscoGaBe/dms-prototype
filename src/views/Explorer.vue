<template>
	<div class="h-full flex">
		<DMSLeftBar class="flex-shrink-0" />
		<DMSFileExplorer class="flex-grow" :folder="folder" :file="file" />
	</div>
</template>

<script>
	import DMSFileExplorer from "../components/DMSFileExplorer.vue";
	import DMSLeftBar from "../components/DMSLeftBar.vue";
	export default {
		components: {
			DMSLeftBar,
			DMSFileExplorer,
		},
		props: {
			folder: {
				type: String,
				default: "",
			},
			file: {
				type: String,
				default: "",
			},
		},
	};
</script>DMSLeftBar