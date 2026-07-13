// Global App State
const API_URL = '/api';

// Utility Functions
const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');
const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};
const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Setup Navigation
const setupNav = () => {
    const navLinks = document.getElementById('navLinks');
    const user = getUser();
    
    if (user) {
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="/dashboard.html">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="/editor.html"><i class="bi bi-pencil-square"></i> Write</a></li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                    <img src="${user.avatar}" class="avatar-sm me-2" alt="Avatar">
                    ${user.username}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="/dashboard.html">My Posts</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item cursor-pointer text-danger" onclick="logout()">Logout</a></li>
                </ul>
            </li>
        `;
    } else {
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="/login.html">Login</a></li>
            <li class="nav-item"><a class="btn btn-primary ms-2 rounded-pill px-3" href="/register.html">Sign Up</a></li>
        `;
    }
};

const logout = () => {
    clearAuth();
    window.location.href = '/';
};

// Dark Mode Toggle
const setupThemeToggle = () => {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;
    
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark);
        toggleBtn.innerHTML = isNowDark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    });
};

// Toast Notifications
const showToast = (message, type = 'success') => {
    const container = document.getElementById('toastContainer');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'toastContainer';
        div.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(div);
    }
    
    const toastId = 'toast' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-primary';
    
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    document.getElementById('toastContainer').insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
};

// Format Date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Fetch API Wrapper
const apiFetch = async (url, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${url}`, { ...options, headers });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

// Initialize common features
document.addEventListener('DOMContentLoaded', () => {
    setupNav();
    setupThemeToggle();

    // Setup Search
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('searchInput').value;
            window.location.href = `/?search=${encodeURIComponent(query)}`;
        });
    }
});

// Load Posts (for index.html)
const loadPosts = async (page = 1) => {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    let url = `/posts?page=${page}`;
    if (searchQuery) url += `&search=${searchQuery}`;

    try {
        const data = await apiFetch(url);
        
        if (data.posts.length === 0) {
            container.innerHTML = `<div class="text-center py-5 text-muted"><h5>No posts found.</h5></div>`;
            return;
        }

        let html = '';
        data.posts.forEach(post => {
            html += `
                <div class="card border-0 shadow-sm mb-4 post-card cursor-pointer" onclick="window.location.href='/post.html?id=${post.id}'">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${post.author.avatar}" class="avatar-sm me-2" alt="Author">
                            <div>
                                <h6 class="mb-0 fw-bold">${post.author.username}</h6>
                                <small class="text-muted">${formatDate(post.createdAt)}</small>
                            </div>
                            <span class="badge bg-light text-dark ms-auto border">${post.category || 'General'}</span>
                        </div>
                        <h3 class="card-title fw-bold">${post.title}</h3>
                        <p class="card-text text-muted truncate-2-lines">${post.content.replace(/<[^>]+>/g, '')}</p>
                        <div class="d-flex align-items-center text-muted">
                            <small class="me-3"><i class="bi bi-heart-fill text-danger me-1"></i> ${post.likes.length}</small>
                            <small class="me-3"><i class="bi bi-chat-fill text-primary me-1"></i> View Comments</small>
                            <small><i class="bi bi-eye-fill text-secondary me-1"></i> ${post.views}</small>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Load Trending (top 5 viewed)
        const trendingList = document.getElementById('trendingList');
        if (trendingList) {
            // Very simple sorting for frontend demo, backend should handle ideally
            const trending = [...data.posts].sort((a,b) => b.views - a.views).slice(0, 5);
            if(trending.length > 0) {
                trendingList.innerHTML = trending.map(p => `
                    <li class="list-group-item px-0 border-0 bg-transparent">
                        <a href="/post.html?id=${p.id}" class="text-decoration-none text-body fw-bold d-block text-truncate">${p.title}</a>
                        <small class="text-muted">${p.views} views</small>
                    </li>
                `).join('');
            } else {
                trendingList.innerHTML = '<li class="list-group-item px-0 border-0 text-muted bg-transparent">No trending posts</li>';
            }
        }
        
    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="alert alert-danger">Error loading posts: ${error.message}</div>`;
    }
};

// Filter setup
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-filter')) {
        e.preventDefault();
        const cat = e.target.getAttribute('data-cat');
        const container = document.getElementById('postsContainer');
        if(container) {
            container.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>`;
            apiFetch(`/posts?category=${cat}`).then(data => {
                // Reuse logic from loadPosts but simpler for demo
                if (data.posts.length === 0) {
                    container.innerHTML = `<div class="text-center py-5 text-muted"><h5>No posts found in ${cat}.</h5></div>`;
                    return;
                }
                container.innerHTML = data.posts.map(post => `
                     <div class="card border-0 shadow-sm mb-4 post-card cursor-pointer" onclick="window.location.href='/post.html?id=${post.id}'">
                        <div class="card-body p-4">
                            <h3 class="card-title fw-bold">${post.title}</h3>
                            <p class="card-text text-muted truncate-2-lines">${post.content.replace(/<[^>]+>/g, '')}</p>
                        </div>
                    </div>
                `).join('');
            });
        }
    }
});
