document.addEventListener("DOMContentLoaded", function() {
    // ===== DOM Elements =====
    const filterButton = document.querySelector(".filter-button");
    const sidebar = document.querySelector(".gallery-sidebar");
    const categoryCheckboxes = document.querySelectorAll('.filter-section input[data-category]');
    const ratingCheckboxes = document.querySelectorAll('.filter-section input[data-rating]');
    const priceRange = document.getElementById('priceRange');
    const priceDisplay = document.getElementById('priceDisplay');
    const tags = document.querySelectorAll('.tag');
    const sortDropdown = document.getElementById('sortDropdown');
    const products = Array.from(document.querySelectorAll('.gallery-card'));
    
    // ===== New Variables =====
    let visibleProducts = []; // Caches filtered products
    const productsPerPage = 10;
    let currentPage = 1;

    // ===== Initialize =====
    products.forEach(p => p.dataset.visible = 'true');
    filterProducts(); // Trigger initial render

    // ===== Event Listeners =====
    // Mobile Sidebar Toggle
    if (filterButton && sidebar) {
        filterButton.addEventListener("click", () => sidebar.classList.toggle("active"));
    }

    // Price Range Slider (with faster debounce)
    priceDisplay.textContent = `Price: $${priceRange.value}`;
    priceRange.addEventListener('input', debounce(() => {
        priceDisplay.textContent = `Price: $${priceRange.value}`;
        filterProducts();
    }, 100)); // Reduced from 300ms to 100ms

    // Tags, Categories, Ratings
    tags.forEach(tag => tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        filterProducts();
    }));
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    ratingCheckboxes.forEach(rb => rb.addEventListener('change', filterProducts));
    sortDropdown.addEventListener('change', () => sortProducts(sortDropdown.value));

    // Add-to-Cart (Event Delegation)
    document.querySelector('.gallery-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const product = e.target.closest('.gallery-card');
            console.log('Added to cart:', product.querySelector('h3').textContent);
            // Add actual cart logic here (e.g., localStorage)
        }
    });

    // Pagination (Event Delegation)
    document.querySelector('.pagination').addEventListener('click', (e) => {
        if (e.target.classList.contains('prev-btn')) navigateToPage(currentPage - 1);
        if (e.target.classList.contains('next-btn')) navigateToPage(currentPage + 1);
        if (e.target.tagName === 'BUTTON' && !isNaN(e.target.textContent)) {
            navigateToPage(parseInt(e.target.textContent));
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        const totalPages = Math.ceil(visibleProducts.length / productsPerPage);
        if (e.key === 'ArrowLeft' && currentPage > 1) navigateToPage(currentPage - 1);
        if (e.key === 'ArrowRight' && currentPage < totalPages) navigateToPage(currentPage + 1);
    });

    // ===== Core Functions =====
    function filterProducts() {
        const activeCategories = getActiveFilters(categoryCheckboxes, 'category');
        const activeRatings = getActiveFilters(ratingCheckboxes, 'rating');
        const activeTags = Array.from(tags)
            .filter(t => t.classList.contains('active'))
            .map(t => t.dataset.tag);
        const maxPrice = parseInt(priceRange.value);

        // Cache filtered products
        visibleProducts = products.filter(product => {
            const categoryMatch = activeCategories.length === 0 || 
                               activeCategories.includes(product.dataset.category) || 
                               activeTags.includes(product.dataset.category);
            const ratingMatch = activeRatings.length === 0 || 
                              activeRatings.some(r => parseInt(product.dataset.rating) >= r);
            const priceMatch = parseInt(product.dataset.price) <= maxPrice;
            return categoryMatch && ratingMatch && priceMatch;
        });

        currentPage = 1;
        updateVisibleProducts();
        renderPagination();
    }

    function sortProducts(option) {
        if (option === 'default') return; // Skip if no sorting
        if (option === 'price-low') {
            visibleProducts.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        } else if (option === 'price-high') {
            visibleProducts.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        }
        updateVisibleProducts();
    }

    function updateVisibleProducts() {
        const grid = document.querySelector('.gallery-grid');
        grid.innerHTML = ''; // Clear grid

        if (visibleProducts.length === 0) {
            // No Results State
            const noResultsEl = document.createElement('div');
            noResultsEl.className = 'no-results';
            noResultsEl.textContent = 'No products match your filters.';
            grid.appendChild(noResultsEl);
        } else {
            // Show paginated products
            const startIdx = (currentPage - 1) * productsPerPage;
            const endIdx = startIdx + productsPerPage;
            visibleProducts.slice(startIdx, endIdx).forEach(product => {
                grid.appendChild(product);
            });
        }
    }

    function renderPagination() {
        const pagination = document.querySelector('.pagination');
        const pageNumbers = pagination.querySelector('.page-numbers');
        const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

        // Hide if no pagination needed
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }
        pagination.style.display = 'flex';

        // Clear existing buttons
        pageNumbers.innerHTML = '';

        // Previous Button
        const prevBtn = pagination.querySelector('.prev-btn');
        prevBtn.disabled = currentPage === 1;

        // Page Numbers (with truncation)
        addPageButton(1, pageNumbers);
        if (currentPage > 3) addEllipsis(pageNumbers);

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) addPageButton(i, pageNumbers);

        if (currentPage < totalPages - 2) addEllipsis(pageNumbers);
        if (totalPages > 1) addPageButton(totalPages, pageNumbers);

        // Next Button
        const nextBtn = pagination.querySelector('.next-btn');
        nextBtn.disabled = currentPage === totalPages;
    }

    // ===== Helper Functions =====
    function navigateToPage(page) {
        currentPage = page;
        updateVisibleProducts();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function addPageButton(pageNum, container) {
        const button = document.createElement('button');
        button.textContent = pageNum;
        if (pageNum === currentPage) button.classList.add('active');
        container.appendChild(button);
    }

    function addEllipsis(container) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.className = 'ellipsis';
        container.appendChild(ellipsis);
    }

    function getActiveFilters(checkboxes, dataAttr) {
        return Array.from(checkboxes)
            .filter(c => c.checked)
            .map(c => dataAttr === 'rating' ? parseInt(c.dataset[dataAttr]) : c.dataset[dataAttr]);
    }

    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
});