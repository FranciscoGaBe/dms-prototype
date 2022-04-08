<template>
	<div>
		<DMSTooltip
			class="px-2 py-1 text-2xl cursor-pointer"
			position="bottom"
			@click="toggle"
		>
			<template #activator>
				<font-awesome-icon icon="folder-plus" />
			</template>
			<span>New Folder</span>
		</DMSTooltip>
		<div
			class="fixed inset-0 bg-black z-50 bg-opacity-50 transition-all duration-300 ease-in-out"
			:class="[show ? 'opacity-1' : 'opacity-0 pointer-events-none']"
		>
			<div
				class="h-full w-full flex items-center justify-center"
				@click.self="toggle"
			>
				<div
					class="bg-white rounded shadow p-2 relative transition-all duration-300 ease-in-out"
					style="width: 500px; max-width: 95%"
					:class="[show ? 'bottom-0' : 'bottom-20']"
				>
					<div
						class="text-2xl font-bold border-b-2 border-gray-700 px-2 mb-2 flex items-center"
					>
						<span>NEW FOLDER</span>
						<button class="ml-auto p-1" @click="toggle">
							<font-awesome-icon icon="times" />
						</button>
					</div>
					<div class="px-2">
						<div class="px-1">
              <DMSInput
                class="w-full"
                placeholder="Folder name"
                v-model="folderName"
                :disabled="loading"
                autofocus
                @keydown.enter="newFolder"
              />
						</div>
            <div class="text-right mt-4">
              <DMSButton :loading="loading" :disabled="!folderName || loading" @click="newFolder">New folder</DMSButton>
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import DMSInput from "./DMSInput.vue";
	import DMSTooltip from "./DMSTooltip.vue";
  import DMSButton from "./DMSButton.vue";
  import { addFolder } from "../api/folders";

	export default {
		name: "DMSNewFolder",
		components: {
      DMSTooltip,
      DMSInput,
      DMSButton
    },
    props: {
      parent: {
        type: String,
        required: true
      }
    },
		data: () => ({
			show: false,
			folderName: "",
      loading: false
		}),
    watch: {
      show: function (value) {
        if (!value) this.folderName = "";
      }
    },
		methods: {
			toggle: function () {
				this.show = !this.show;
			},
      newFolder: async function () {
        this.loading = true;
        try {
          this.metadata = await addFolder(this.folderName, this.parent);
          this.$emit("newFolder");
          this.toggle();
        }
        catch (err) {
          this.$alert(err);
        }
        this.loading = false;
      }
		},
	};
</script>