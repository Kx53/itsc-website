// src/script/guide-filter.js

export function initializeGuideFilter() {
  // --- DOM Elements ---
  const searchInput = document.getElementById("guide-search");
  const categoryButtonsContainer = document.querySelector(".flex.flex-wrap.justify-center.gap-4.mb-16");
  const guidesGrid = document.getElementById("guides-grid");
  const guideCards = Array.from(guidesGrid.querySelectorAll(".guide-card-container"));
  const noResults = document.getElementById("no-results");
  const paginationContainer = document.querySelector(".pagination-container");

  // --- State ---
  const state = {
    searchTerm: "",
    currentCategory: "all",
    currentPage: 1,
    itemsPerPage: 6, // Show 6 guides per page
  };

  // --- Validation ---
  if (!searchInput || !categoryButtonsContainer || !guidesGrid || !noResults || !paginationContainer) {
    console.error("Required elements for guide filtering and pagination are missing.");
    return;
  }

  // --- Main Filter and Render Function ---
  function render() {
    // 1. Filter guides based on search and category
    const filteredGuides = guideCards.filter((card) => {
      const cardCategory = card.dataset.category.toLowerCase();
      const cardTitle = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const categoryMatch = state.currentCategory === "all" || cardCategory === state.currentCategory.toLowerCase();
      const searchMatch = cardTitle.includes(state.searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });

    // 2. Handle "No Results" message
    noResults.classList.toggle("hidden", filteredGuides.length > 0);

    // 3. Pagination Calculations
    const totalPages = Math.ceil(filteredGuides.length / state.itemsPerPage);
    state.currentPage = Math.max(1, Math.min(state.currentPage, totalPages)); // Ensure currentPage is valid

    // 4. Slice guides for the current page
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const paginatedGuides = filteredGuides.slice(startIndex, endIndex);

    // 5. Update DOM - Hide all, then show paginated
    guideCards.forEach((card) => (card.style.display = "none"));
    paginatedGuides.forEach((card) => (card.style.display = "block"));
    
    // 6. Render Pagination Controls
    renderPagination(totalPages);
  }

  // --- Pagination Rendering ---
  function renderPagination(totalPages) {
    paginationContainer.innerHTML = ""; // Clear old buttons

    if (totalPages <= 1) return; // Don't show pagination if only one page

    const prevText = paginationContainer.dataset.prevText || "Prev";
    const nextText = paginationContainer.dataset.nextText || "Next";

    const joinContainer = document.createElement("div");
    joinContainer.className = "join";

    // Previous Button
    const prevButton = createPaginationButton(prevText, state.currentPage - 1, state.currentPage <= 1);
    prevButton.innerHTML = `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 12 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M10.3333 5.66667H1M1 5.66667L5.66667 10.3333M1 5.66667L5.66667 1"></path></svg><span>${prevText}</span>`;
    joinContainer.appendChild(prevButton);

    // Page Number Buttons
    const visiblePages = getVisiblePages(state.currentPage, totalPages, 5);
    visiblePages.forEach(page => {
        if (page === '...') {
            const ellipsis = createPaginationButton('...', -1, true);
            ellipsis.classList.add('cursor-default');
            joinContainer.appendChild(ellipsis);
        } else {
            const pageNum = page;
            const pageButton = createPaginationButton(pageNum.toString(), pageNum, false, pageNum === state.currentPage);
            joinContainer.appendChild(pageButton);
        }
    });

    // Next Button
    const nextButton = createPaginationButton(nextText, state.currentPage + 1, state.currentPage >= totalPages);
    nextButton.innerHTML = `<span>${nextText}</span><svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 12 12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M1 5.66667H10.3333M10.3333 5.66667L5.66667 1M10.3333 5.66667L5.66667 10.3333"></path></svg>`;
    joinContainer.appendChild(nextButton);

    paginationContainer.appendChild(joinContainer);
  }

  function createPaginationButton(text, page, isDisabled, isActive = false) {
    const button = document.createElement("button");
    button.className = "btn join-item rounded-lg px-3 py-2";
    button.dataset.page = page.toString();
    button.disabled = isDisabled;
    
    if (isDisabled) {
        button.classList.add("btn-disabled", "opacity-50", "cursor-not-allowed");
    } else {
        button.classList.add("btn-ghost", "hover:bg-base-200");
    }

    if (isActive) {
        button.classList.add("bg-neutral", "text-neutral-content");
        button.classList.remove("btn-ghost");
    }
    
    button.innerHTML = `<span class="text-sm md:text-base font-normal">${text}</span>`;
    return button;
  }

  function getVisiblePages(current, total, maxVisible) {
      const pages = [];
      if (total <= maxVisible) {
          for (let i = 1; i <= total; i++) pages.push(i);
      } else {
          let start = Math.max(1, current - Math.floor(maxVisible / 2));
          let end = Math.min(total, start + maxVisible - 1);
          if (end - start + 1 < maxVisible) {
              start = Math.max(1, end - maxVisible + 1);
          }
          if (start > 1) {
              pages.push(1);
              if (start > 2) pages.push('...');
          }
          for (let i = start; i <= end; i++) pages.push(i);
          if (end < total) {
              if (end < total - 1) pages.push('...');
              pages.push(total);
          }
      }
      return pages;
  }


  // --- Event Listeners ---
  searchInput.addEventListener("input", (e) => {
    state.searchTerm = e.target.value;
    state.currentPage = 1; // Reset to first page on new search
    render();
  });

  categoryButtonsContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button && button.hasAttribute("data-category")) {
      state.currentCategory = button.dataset.category;
      state.currentPage = 1; // Reset to first page on category change

      // Update button styles
      categoryButtonsContainer.querySelectorAll("button").forEach(btn => {
          const isActive = btn.dataset.category === state.currentCategory;
          btn.classList.toggle("bg-primary", isActive);
          btn.classList.toggle("text-primary-content", isActive);
          btn.classList.toggle("hover:bg-primary/90", isActive);
          btn.classList.toggle("bg-base-200", !isActive);
          btn.classList.toggle("text-base-content", !isActive);
          btn.classList.toggle("hover:bg-base-300", !isActive);
      });

      render();
    }
  });

  paginationContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button && button.dataset.page && !button.disabled) {
      const page = parseInt(button.dataset.page, 10);
      if (page > 0) {
          state.currentPage = page;
          render();
      }
    }
  });

  // --- Initial Render ---
  render();
}
