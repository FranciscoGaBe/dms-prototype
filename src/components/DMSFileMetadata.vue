<template>
	<form class="h-full p-4">
		<template v-if="!loading">
			<div
				v-for="md in metadata"
				:key="md.name"
				class="flex items-center px-2 py-1 my-1 bg-gray-200 border-2 border-gray-300 rounded"
			>
				<div class="text-lg font-medium w-1/3 flex-shrink-0">{{ md.name }}</div>
				<div class="flex-grow">
          <a
            v-if="md.link"
            class="border border-gray-300 rounded px-2 py-0.5 cursor-pointer flex items-center"
            :href="md.value"
            target="_blank"
          >
            <span class="mr-auto">Link</span>
            <font-awesome-icon icon="external-link-alt" />
          </a>
					<div v-else class="flex items-center">
            <DMSInput
              class="flex-grow bg-gray-200 focus:bg-white"
              v-model="md.value"
              @keydown.enter="saveMetadata(md)"
              @keydown.esc="clearMetadata(md)"
            />
            <div
              class="flex-shrink-0 flex items-center gap-2 pl-1 transition-all duration-300 ease-in-out"
              :class="[md.value !== md.originalValue ? 'w-12 opacity-1' : 'w-0 opacity-0']"
            >
              <template v-if="!md.saving">
                <DMSTooltip v-for="button in buttons">
                  <template #activator>
                    <button class="px-1 h-full leading-none" @click="button.click(md)">
                      <font-awesome-icon :icon="button.icon" />
                    </button>
                  </template>
                  <span>{{ button.tooltip }}</span>
                </DMSTooltip>
              </template>
              <font-awesome-icon
                v-else
                class="ml-2 animate-spin"
                icon="spinner"
              />
            </div>
          </div>
				</div>
			</div>
		</template>
		<DMSItemsSkeleton v-else />
	</form>
</template>

<script>
	import DMSItemsSkeleton from "./DMSItemsSkeleton.vue";
	import DMSInput from "./DMSInput.vue";
  import { getFileMetadata, setMetadata } from "../api/files";
  import DMSTooltip from "./DMSTooltip.vue";

	export default {
		components: { DMSItemsSkeleton, DMSInput, DMSTooltip },
		name: "DMSFileMetadata",
		props: {
			file: {
				type: String,
				required: true,
			},
		},
		data: () => ({
			loading: false,
			md: []
		}),
    computed: {
      metadata: {
        get() { return this.md; },
        set(metadata) {
          this.md = [...metadata].map(m => ({
            ...m,
            originalValue: m.originalValue || m.value,
            saving: m.saving || false
          }));
        }
      },
      buttons: function () {
        return [
          { icon: "check", tooltip: "Save", click: this.saveMetadata },
          { icon: "times", tooltip: "Clear", click: this.clearMetadata }
        ];
      }
    },
		watch: {
			file: {
				immediate: true,
				handler: function () {
					this.getMetadata();
				},
			},
		},
		methods: {
			getMetadata: async function () {
				this.loading = true;
				try {
          const { metadata } = await getFileMetadata(this.file);
          this.metadata = metadata;
        }
        catch (err) {
          this.$alert(err);
        }
				this.loading = false;
			},
      saveMetadata: async function (metadata) {
        metadata.saving = true;
        try {
          const md = await setMetadata(this.file, metadata.name, metadata.value);
          const _metadata = [...this.metadata];
          const index = _metadata.findIndex(md => md === metadata);
          _metadata.splice(index, 1, md);
          this.metadata = _metadata;
        }
        catch (err) {
          this.$alert(err);
        }
        metadata.saving = false;
      },
      clearMetadata: function (metadata) {
        metadata.value = metadata.originalValue;
      }
		},
	};
</script>

<style lang="scss" scoped>
</style>