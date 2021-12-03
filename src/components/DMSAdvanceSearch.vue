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
								class="flex items-center my-1 px-1"
							>
								<DMSInput
									class="mr-2 w-40"
									placeholder="Metadata"
								/>
								<DMSInput
									class="flex-grow"
									placeholder="Value"
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
								@click="addMetadata"
							>
								<span><font-awesome-icon icon="plus" /></span>
								<span class="ml-1 font-medium">ADD</span>
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
								></textarea>
							</div>
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
	export default {
		name: "DMSAdvanceSearch",
		components: {
			DMSTooltip,
			DMSInput,
		},
		data: () => ({
			show: false,
			searchMetadata: [],
		}),
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
		},
	};
</script>