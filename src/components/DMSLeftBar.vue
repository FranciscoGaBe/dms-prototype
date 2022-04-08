<template>
	<div
    class="h-full p-1 shadow-xl bg-white absolute md:static transition-all duration-300 ease-in-out"
    :class="[showBar ? 'left-0' : '-left-14']"
  >
		<div
			class="h-full flex flex-col items-center"
			:class="{ 'animate-pulse': loading }"
		>
			<DMSTooltip
				class="text-2xl h-12 w-12 flex items-center justify-center text-white bg-blue-500 rounded shadow"
				position="right"
			>
				<template #activator>
					<font-awesome-icon icon="file-invoice" />
				</template>
				<span>LOGO</span>
			</DMSTooltip>
			<div class="flex-grow flex justify-center flex-col">
				<DMSTooltip
					v-for="icon in sideIcons"
					:key="icon.id"
					class="w-12 h-12 my-1 flex items-center justify-center text-white text-2xl rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
					:class="[
						isSelected(icon)
							? 'bg-blue-700'
							: 'bg-blue-400 hover:bg-blue-500',
					]"
					position="right"
					@click="goTo(icon)"
				>
					<template #activator>
						<font-awesome-icon :icon="icon.icon" />
					</template>
					<span>{{ icon.name }}</span>
				</DMSTooltip>
			</div>
			<div v-click-outside="closeMenu">
				<DMSTooltip
					class="rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center text-xl font-medium cursor-pointer"
					position="right"
					@click="toggleMenu"
				>
					<template #activator>{{ userData.initials }}</template>
					<span>{{ userData.name }}</span>
				</DMSTooltip>
				<DMSLeftBarMenu :show="showMenu" />
			</div>
		</div>
    <div
      class="md:hidden absolute left-full top-1/2 bg-white px-1.5 py-1 leading-none rounded-tr rounded-br"
      @click="toggleBar"
    >
      <font-awesome-icon :icon="showBar ? 'chevron-left' : 'chevron-right'" />
    </div>
	</div>
</template>

<script>
	import DMSTooltip from "./DMSTooltip.vue";
	import DMSLeftBarMenu from "./DMSLeftBarMenu.vue";
	import ClickOutside from "vue-click-outside";
  import { getUser } from "../api/users";

	export default {
		components: { DMSTooltip, DMSLeftBarMenu },
		name: "DMSLeftBar",
		data: () => ({
			userData: {},
			loading: true,
			showMenu: false,
      showBar: false
		}),
		mounted: function () {
			this.getUserData();
		},
		computed: {
			sideIcons: function () {
				const favorites = this.userData.favorites || [];

				return [
					{
						id: "@home",
						folder: true,
						icon: "home",
						name: "Home",
						route: {
							name: "explorer",
							params: {
								folder: "@home",
								file: "",
							},
						},
					},
					...favorites.map((fav) => {
						const isFolder = fav.type === "folder";
						return {
							id: fav.id,
							folder: isFolder,
							icon: isFolder ? "folder" : "file",
							name: fav.name,
							route: {
								name: isFolder ? "explorer" : "info",
								params: {
									folder: isFolder ? fav.id : fav.parent,
									file: isFolder ? "" : fav.id,
								},
							},
						};
					}),
				];
			},
			currentFolder: function () {
				return this.$route.params.folder;
			},
			currentFile: function () {
				return this.$route.params.file;
			},
		},
		methods: {
			getUserData: async function () {
				this.userData = await getUser('admin');
				this.loading = false;
			},
			isSelected: function (item) {
				if (item.folder && this.currentFolder === item.id) return true;
				if (!item.folder && this.currentFile === item.id) return true;
				return false;
			},
			goTo: function (item) {
				if (this.isSelected(item)) return;
				this.$router.replace({
					name: item.route.name,
					params: {
						...this.$route.params,
						...item.route.params,
					},
				});
			},
			toggleMenu: function () {
				this.showMenu = !this.showMenu;
			},
			closeMenu: function () {
				this.showMenu = false;
			},
      toggleBar: function () {
        this.showBar = !this.showBar;
      },
      addFavorite: function (item) {
        const { favorites } = this.userData;
        if (item.favorite) favorites.push(item);
        else {
          const index = favorites.findIndex(({ id }) => id === item.id);
          if (index < 0) return;
          favorites.splice(index, 1);
        }
      }
		},
		directives: {
			ClickOutside,
		},
	};
</script>