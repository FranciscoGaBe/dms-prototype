<template>
	<div ref="container" class="relative" v-click-outside="closeMenu">
		<slot :on="{ click: toggleMenu }"></slot>
		<div
			v-show="show"
			class="bg-white absolute rounded border-2 border-gray-200 shadow w-44 overflow-hidden"
			:class="[top ? 'top-0' : 'bottom-0']"
			style="right: 120%"
		>
			<template v-if="!folder">
				<div
					v-for="button in buttons"
					:key="button.name"
					class="py-1 flex items-center w-full hover:text-blue-300 cursor-pointer"
					@click.capture.stop="goTo(button.route)"
				>
					<div class="text-center w-8">
						<font-awesome-icon :icon="button.icon" />
					</div>
					<div>{{ button.name }}</div>
				</div>
				<div v-if="items.length" class="border border-gray-200"></div>
			</template>
			<div
        v-if="items.length"
				class="py-1 flex items-center w-full hover:text-red-500 cursor-pointer"
				@click.capture.stop="deleteItem"
			>
				<div class="text-center w-8">
					<font-awesome-icon icon="trash" />
				</div>
				<div>Delete</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ClickOutside from "vue-click-outside";
import { deleteFile } from "../api/files";
import { deleteFolder } from "../api/folders";
	export default {
		name: "DMSElementMenu",
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
			show: false,
			top: true,
			buttons: [
				{ icon: "info", name: "Information", route: "info" },
				{ icon: "code-branch", name: "Versions", route: "version" },
				{ icon: "tag", name: "Metadata", route: "metadata" },
			],
		}),
		methods: {
			deleteItem: async function () {
        try {
          const { id } = this.item;
          if (this.folder) await deleteFolder(id)
          else await deleteFile(id);
          const index = this.items.findIndex((item) => item === this.item);
          this.show = false;
          if (index < 0) return;
          this.items.splice(index, 1);
          this.$emit('delete');
        }
        catch (err) {
          this.$alert(err);
        }
			},
			goTo: function (route) {
				this.show = false;
				if (this.folder) return;
				if (this.$route.name === route) return;

				this.$router.replace({
					name: route,
					params: {
						...this.$route.params,
						file: this.item.id,
					},
				});
			},
			toggleMenu: function () {
				if (this.show) return (this.show = false);
				const bottom = window.innerHeight - this.$refs.container.offsetTop;
				this.top = bottom > 300;
				this.show = true;
			},
			closeMenu: function () {
				this.show = false;
			},
		},
		directives: {
			ClickOutside,
		},
	};
</script>