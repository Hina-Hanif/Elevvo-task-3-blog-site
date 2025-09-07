// Sample blog post data
const posts = [
    { id: 1, title: 'Mastering Modern JavaScript', description: 'A deep dive into ES6+ features and best practices for building robust applications.', image: '1.jpg', date: 'August 22, 2025', category: 'Tech' },
    { id: 2, title: 'Hidden Gems of the Italian Amalfi Coast', description: 'Discovering breathtaking views and authentic food in a less-traveled part of Italy.', image: '2.jpg', date: 'August 20, 2025', category: 'Travel' },
    { id: 3, title: 'The Ultimate Guide to Sourdough Baking', description: 'From starter to a perfectly baked loaf, this guide covers everything you need to know.', image: '3.jpg', date: 'August 18, 2025', category: 'Food' },
    { id: 4, title: 'Responsive Web Design with CSS Flexbox', description: 'How to build beautiful and flexible layouts using the power of CSS Flexbox.', image: '4.jpg', date: 'August 15, 2025', category: 'Tech' },
    { id: 5, title: 'Backpacking Through Southeast Asia', description: 'Tips and tricks for an unforgettable journey on a budget.', image: '5.jpg', date: 'August 12, 2025', category: 'Travel' },
    { id: 6, title: 'Minimalist Living: Declutter Your Life', description: 'Simple steps to a more intentional and stress-free lifestyle.', image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop', date: 'August 10, 2025', category: 'Lifestyle' },
    { id: 7, title: 'Plant-Based Cooking: Healthy and Delicious', description: 'Explore a variety of nutritious and flavorful vegetarian dishes.', image: '7.jpg', date: 'August 8, 2025', category: 'Food' },
    { id: 8, title: 'The Rise of Quantum Computing', description: 'An accessible introduction to the technology that could change everything.', image: '8.jpg', date: 'August 5, 2025', category: 'Tech' },
    { id: 9, title: 'Creating a Productive Home Office', description: 'Design a workspace that boosts your focus and creativity.', image: '9.jpg', date: 'August 2, 2025', category: 'Lifestyle' },
    { id: 10, title: 'Photography Tips for Beginners', description: 'Essential advice for taking stunning photos with any camera.', image: '10.jpg', date: 'July 30, 2025', category: 'Travel' },
];

const postGrid = document.getElementById('postGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const notFoundMessage = document.getElementById('notFoundMessage');
const paginationContainer = document.getElementById('pagination');

const postsPerPage = 6;
let currentPage = 1;
let currentCategory = 'all';
let currentSearchQuery = '';

// Renders the blog post cards to the DOM
function renderPosts(filteredPosts) {
    postGrid.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = filteredPosts.slice(start, end);

    if (paginatedPosts.length === 0) {
        notFoundMessage.style.display = 'block';
    } else {
        notFoundMessage.style.display = 'none';
    }

    paginatedPosts.forEach((post, index) => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-card-image">
            <div class="post-card-content">
                <span class="post-category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <div class="post-meta">
                <span class="post-date">${post.date}</span>
                </div>

            </div>
        `;
        postGrid.appendChild(card);
    });
}

// Renders the pagination buttons
function renderPagination(filteredPosts) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            filterAndRenderPosts();
        });
        paginationContainer.appendChild(button);
    }
}

// Filters posts based on search and category, then renders them
function filterAndRenderPosts() {
    let filteredPosts = posts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(currentSearchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    renderPosts(filteredPosts);
    renderPagination(filteredPosts);
}

// Event Listeners for search and category filters
searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim();
    currentPage = 1;
    filterAndRenderPosts();
});

categoryFilter.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        currentPage = 1;
        filterAndRenderPosts();
    }
});

// Initial render when the page loads
document.addEventListener('DOMContentLoaded', filterAndRenderPosts);