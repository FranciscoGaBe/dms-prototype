<template>
	<div>
		<DMSTooltip
			class="px-2 py-1 text-2xl cursor-pointer"
			position="bottom"
			@click="toggle"
		>
			<template #activator>
				<font-awesome-icon icon="filter" />
			</template>
			<span>Advance search</span>
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
						<span>ADVANCED SEARCH</span>
						<button class="ml-auto p-1" @click="toggle">
							<font-awesome-icon icon="times" />
						</button>
					</div>
					<div class="px-2">
						<div class="px-1">
							<div class="mb-2 text-xl px-1 font-medium text-xl">
								Search by Metadata
							</div>
							<div
								v-for="(search, index) in searchMetadata"
								:key="index"
								class="flex my-1 px-1 gap-2"
							>
                <select
                  class="flex-grow border border-gray-300 rounded px-2 outline-none focus:outline-none focus:border-gray-500 transition-all duration-300 ease-in-out"
                  v-model="search.name"
                >
                  <option value="">Select Metadata</option>
                  <option v-for="md in metadata" :key="md" :value="md">{{ md }}</option>
                </select>
								<DMSInput
									class="flex-grow"
									placeholder="Value"
                  v-model="search.value"
                  :disabled="!search.name"
								/>
								<button
									class="ml-2 py-1 px-2 cursor-pointer hover:text-red-500"
									@click="deleteItem(searchMetadata, index)"
								>
									<font-awesome-icon icon="trash" />
								</button>
							</div>
							<button
								class="text-sm flex items-center ml-auto mt-2 cursor-pointer hover:text-blue-500"
                :disabled="loading"
								@click="addMetadata"
							>
								<template v-if="!loading">
                  <span><font-awesome-icon icon="plus" /></span>
								  <span class="ml-1 font-medium">ADD</span>
                </template>
                <template v-else>
                  <span><font-awesome-icon class="animate-spin" icon="spinner" /></span>
								  <span class="ml-1 font-medium">Loading</span>
                </template>
							</button>
						</div>
						<div class="px-1">
							<div class="mb-2 text-xl px-1 font-medium text-xl">
								Search by content
							</div>
							<div class="px-1">
								<textarea
									class="border border-gray-300 rounded px-2 py-0.5 outline-none w-full focus:outline-none focus:border-gray-500 transition-all duration-300 ease-in-out"
									rows="4"
									placeholder="Text to search for ..."
                  v-model="content"
								></textarea>
							</div>
						</div>
            <div class="text-right mt-4">
              <DMSButton @click="search">Search</DMSButton>
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
  import { getMetadata } from "../api/templates";

	export default {
		name: "DMSAdvanceSearch",
		components: {
      DMSTooltip,
      DMSInput,
      DMSButton
    },
		data: () => ({
			show: false,
			searchMetadata: [],
      content: "",
      metadata: [],
      loading: false
		}),
    watch: {
      show: function (value) {
        if (!value) {
          this.searchMetadata = [];
          this.content = "";
          return;
        };
        this.getMetadata();
      }
    },
		methods: {
			toggle: function () {
				this.show = !this.show;
			},
			deleteItem: function (arr, index) {
				arr.splice(index, 1);
			},
			addMetadata: function () {
				this.searchMetadata.push({ name: "", value: "" });
			},
      search: function () {
        const searchParams = new URLSearchParams();
        this.searchMetadata.forEach(md => {
          searchParams.append(md.name, md.value);
        })
        searchParams.append('content', this.content);
        this.$router.replace({
          name: this.$route.name,
          params: { folder: '@Search' },
          query: Object.fromEntries(searchParams)
        });
        this.toggle();
      },
      getMetadata: async function () {
        this.loading = true;
        try {
          this.metadata = await getMetadata();
        }
        catch (err) {
          this.$alert(err);
        }
        this.loading = false;
      }
		},
	};
</script>