<template>
	<div class="h-full flex">
		<DMSLeftBar ref="leftBar" class="flex-shrink-0" />
		<DMSFileExplorer class="flex-grow" :folder="folder" :file="file" @favorite="onFavorite" />
    <DMSAlert ref="alert" />
	</div>
</template>

<script>
	import DMSFileExplorer from "../components/DMSFileExplorer.vue";
	import DMSLeftBar from "../components/DMSLeftBar.vue";
  import DMSAlert from "../components/DMSAlert.vue";

	export default {
		components: {
      DMSLeftBar,
      DMSFileExplorer,
      DMSAlert
    },
		props: {
			folder: {
				type: String,
				default: "",
			},
			file: {
				type: String,
				default: "",
			}
		},
    methods: {
      onFavorite: function (item) {
        this.$refs.leftBar.addFavorite(item);
      }
    }
	};
</script>