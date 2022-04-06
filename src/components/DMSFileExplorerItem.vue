<template>
	<div
		class="bg-white my-2 pr-2 rounded shadow flex items-center cursor-pointer hover:bg-blue-100 transition-all duration-300 ease-in-out"
		@click="selectItem"
		@mouseenter="hovering = true"
		@mouseleave="hovering = false"
	>
		<div class="text-blue-500 text-2xl md:text-4xl w-10 md:w-16 text-center">
			<font-awesome-icon :icon="icon" />
		</div>
		<div class="py-1">
			<div class="text-xl font-medium mb-1">{{ item.name }}</div>
			<div v-if="!folder" class="text-sm text-gray-700">
				Version: {{ item.version }}
			</div>
			<div class="text-xs text-gray-600">
				<span>Modified: {{ item.modified | date }}</span>
				<span v-if="!folder" class="hidden md:inline"> - Size: {{ item.size | size }}</span>
			</div>
		</div>
		<div
			class="ml-auto text-xl px-2 py-2"
			:class="[item.favorite ? 'text-yellow-300' : 'text-gray-300']"
			@click.capture.stop="setFavorite"
		>
			<font-awesome-icon icon="star" />
		</div>
		<DMSElementMenu :folder="folder" :item="item" :items="items">
			<template #default="{ on }">
				<div
					class="px-3 py-2 text-2xl text-blue-600"
					@click.capture.stop="on.click"
				>
					<font-awesome-icon icon="ellipsis-v" />
				</div>
			</template>
		</DMSElementMenu>
	</div>
</template>

<script>
	import { dateToLocale, sizeConversion } from "@/utils/utils";
	import DMSElementMenu from "./DMSElementMenu.vue";
	export default {
		components: { DMSElementMenu },
		name: "DMSFileExplorerItem",
		props: {
			item: {
				type: Object,
				required: true,
			},
			folder: {
				type: Boolean,
				default: false,
			},
			items: {
				type: Array,
				default: () => [],
			},
		},
		data: () => ({
			hovering: false,
		}),
		computed: {
			icon: function () {
				if (this.hovering) return this.folder ? "folder-open" : "file-alt";
				return this.folder ? "folder" : "file";
			},
		},
		methods: {
			setFavorite: function () {
				this.item.favorite = !this.item.favorite;
			},
			selectItem: function () {
				if (this.folder) return this.$emit("selectFolder", this.item.id);
				this.$emit("selectFile", this.item.id);
			},
		},
		filters: {
			date: dateToLocale,
			size: sizeConversion,
		},
	};
</script>