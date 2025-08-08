<template>
  <div class="bg-base-200/50 p-8 rounded-box">
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="stats shadow bg-base-200">
        <div class="stat">
          <div class="stat-title">{{ textTotalProjects }}</div>
          <div class="stat-value text-primary">{{ totalProjects }}</div>
        </div>
      </div>
      <div class="stats shadow bg-base-200">
        <div class="stat">
          <div class="stat-title">{{ textInProgress }}</div>
          <div class="stat-value text-info">{{ inProgressProjects }}</div>
        </div>
      </div>
      <div class="stats shadow bg-base-200">
        <div class="stat">
          <div class="stat-title">{{ textCompleted }}</div>
          <div class="stat-value text-success">{{ completedProjects }}</div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4"
    >
      <label
        class="input input-bordered flex items-center gap-2 w-full md:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          class="grow"
          placeholder="Search..."
          v-model="searchTerm"
          @input="filterProjects"
        />
      </label>
      <div class="relative w-full md:w-auto">
        <button
          type="button"
          class="btn btn-outline w-full flex items-center justify-between gap-2 whitespace-nowrap min-h-12"
          @click="toggleDropdown"
        >
          <span class="truncate text-left">{{ selectedStatusText }}</span>
          <svg
            width="12px"
            height="12px"
            class="shrink-0 fill-current opacity-60 transition-transform duration-200"
            :class="{ 'rotate-180': dropdownOpen }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path
              d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
            />
          </svg>
        </button>
        <div
          v-if="dropdownOpen"
          class="absolute top-full left-0 right-0 mt-2 bg-base-100 shadow-xl rounded-box z-50 border border-base-300 overflow-hidden"
        >
          <div class="py-1">
            <button
              type="button"
              :class="[
                'w-full text-left px-4 py-3 transition-colors duration-200 whitespace-nowrap border-b border-base-300 block relative text-sm',
                selectedStatus === 'All'
                  ? 'bg-base-200 font-medium'
                  : 'hover:bg-base-200',
              ]"
              @click="selectStatus('All')"
            >
              <span class="flex items-center justify-between">
                {{ textStatusAll }}
                <svg
                  v-if="selectedStatus === 'All'"
                  class="w-3 h-3 ml-2 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              :class="[
                'w-full text-left px-4 py-3 transition-colors duration-200 whitespace-nowrap border-b border-base-300 block relative text-sm',
                selectedStatus === 'In Progress'
                  ? 'bg-base-200 font-medium'
                  : 'hover:bg-base-200',
              ]"
              @click="selectStatus('In Progress')"
            >
              <span class="flex items-center justify-between">
                {{ textInProgress }}
                <svg
                  v-if="selectedStatus === 'In Progress'"
                  class="w-3 h-3 ml-2 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              :class="[
                'w-full text-left px-4 py-3 transition-colors duration-200 whitespace-nowrap block relative text-sm',
                selectedStatus === 'Completed'
                  ? 'bg-base-200 font-medium'
                  : 'hover:bg-base-200',
              ]"
              @click="selectStatus('Completed')"
            >
              <span class="flex items-center justify-between">
                {{ textCompleted }}
                <svg
                  v-if="selectedStatus === 'Completed'"
                  class="w-3 h-3 ml-2 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th class="w-12">#</th>
            <th>Projects</th>
            <th class="text-center w-40">{{ textStatus }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in filteredProjects" :key="project.id">
            <th>{{ project.id }}</th>
            <td>
              <div class="font-bold text-sm sm:text-base">
                {{ project.name }}
              </div>
              <div
                v-if="project.description"
                class="text-xs sm:text-sm opacity-60"
              >
                {{ project.description }}
              </div>
            </td>
            <td class="text-center">
              <div
                v-if="project.status === 'In Progress'"
                class="badge badge-info gap-2 text-xs sm:text-sm"
              >
                <IconifyIcon
                  icon="tabler:clock"
                  class="w-3 h-3 sm:w-4 sm:h-4"
                />
                In Progress
              </div>
              <div
                v-if="project.status === 'Completed'"
                class="badge badge-success gap-2 text-xs sm:text-sm"
              >
                <IconifyIcon
                  icon="nrk:media-media-complete"
                  class="w-3 h-3 sm:w-4 sm:h-4"
                />
                Completed
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-4 text-sm text-base-content/60">
      {{ textShowingProjects }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import * as m from '@/paraglide/messages';
import IconifyIcon from "@/components/IconifyIcon.vue";

// Props
interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

interface Props {
  projects: Project[];
}

const props = defineProps<Props>();

// Reactive data
const searchTerm = ref("");
const selectedStatus = ref("All");
const dropdownOpen = ref(false);
const filteredProjects = ref<Project[]>([]);

// Computed properties
const totalProjects = computed(() => props.projects.length);
const inProgressProjects = computed(
  () => props.projects.filter((p) => p.status === "In Progress").length
);
const completedProjects = computed(
  () => props.projects.filter((p) => p.status === "Completed").length
);

const textTotalProjects = computed(() => m.portfolio_table_total_projects());
const textInProgress = computed(() => m.portfolio_table_in_progress());
const textCompleted = computed(() => m.portfolio_table_completed());
const textStatusAll = computed(() => m.portfolio_table_status_all());
const textStatus = computed(() => m.common_status());
const textShowingProjects = computed(() => m.portfolio_table_showing_projects({ filtered: filteredProjects.value.length, total: totalProjects.value }));

const selectedStatusText = computed(() => {
  switch (selectedStatus.value) {
    case "All":
      return textStatusAll.value;
    case "In Progress":
      return textInProgress.value;
    case "Completed":
      return textCompleted.value;
    default:
      return textStatusAll.value;
  }
});

// Methods
const filterProjects = () => {
  let filtered = props.projects;

  // Filter by search term
  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term)
    );
  }

  // Filter by status
  if (selectedStatus.value !== "All") {
    filtered = filtered.filter(
      (project) => project.status === selectedStatus.value
    );
  }

  filteredProjects.value = filtered;
};

const selectStatus = (status: string) => {
  selectedStatus.value = status;
  dropdownOpen.value = false;
  filterProjects();
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    dropdownOpen.value = false;
  }
};

// Initialize
onMounted(() => {
  filteredProjects.value = props.projects;
  document.addEventListener("click", handleClickOutside);
});

// Cleanup
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
