// adnex-backend/public/js/authUtils.js  <-- REMEMBER: This file MUST be in your FRONTEND project
// Renaming path to reflect its correct location in your project
// frontend/js/authUtils.js

const BACKEND_API_URL = "https://adnex-backend.onrender.com"; // Define your backend URL here

/**
 * Verifies the JWT token's validity by making a lightweight call to the backend.
 * Redirects to login if token is invalid or missing.
 * @returns {Promise<boolean>} True if token is valid, false otherwise (after redirecting).
 */
async function verifyTokenWithBackend() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        console.warn('No JWT token found. Redirecting to login.');
        window.location.href = '/login.html?login=required'; // Redirect on frontend
        return false;
    }

    try {
        const response = await fetch(`${BACKEND_API_URL}/auth/status`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            // Token is valid based on backend check
            return true;
        } else if (response.status === 401 || response.status === 403) {
            console.error('Token invalid or expired. Status:', response.status);
            localStorage.removeItem('jwtToken'); // Clean up invalid token
            window.location.href = '/login.html?login=expired'; // Redirect on frontend
            return false;
        } else {
            console.error('Backend token verification failed with status:', response.status);
            window.location.href = '/login.html?login=verification_error'; // Generic error
            return false;
        }
    } catch (error) {
        console.error('Network error during token verification:', error);
        window.location.href = '/login.html?login=network_error'; // Redirect on frontend
        return false;
    }
}


/**
 * Makes an authenticated fetch request to a protected backend API URL.
 * Designed for fetching DATA from the backend.
 * @param {string} apiPath The API path to fetch (e.g., '/api/users', '/api/protected-data')
 * @param {object} options Fetch options (method, body, etc.)
 * @returns {Promise<Response>} A promise that resolves with the fetch Response object.
 */
async function fetchAuthenticatedApi(apiPath, options = {}) {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        console.warn('No JWT token found for API request. Redirecting to login.');
        window.location.href = '/login.html?login=required';
        throw new Error('Authentication required for API.');
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        ...options.headers // Merge any custom headers
    };

    try {
        const response = await fetch(`${BACKEND_API_URL}${apiPath}`, {
            ...options, // Spread existing options
            headers: headers
        });

        if (response.status === 401 || response.status === 403) {
            console.error('JWT authentication failed for API:', apiPath, 'Status:', response.status);
            localStorage.removeItem('jwtToken');
            window.location.href = '/login.html?login=expired';
            throw new Error('Invalid or expired token for API. Redirecting to login.');
        }

        return response; // Return the response object for further handling (e.g., response.json())

    } catch (error) {
        console.error('Network or other error during authenticated API fetch:', error);
        window.location.href = '/login.html?login=api_network_error';
        throw error;
    }
}

// Function to handle logout from the frontend
function logoutUser() {
    localStorage.removeItem('jwtToken');
    // Call backend logout endpoint if it performs server-side cleanup (e.g., clearing session)
    fetch(`${BACKEND_API_URL}/auth/logout`, { method: 'GET' })
        .then(() => {
            window.location.href = '/login.html?loggedout=true';
        })
        .catch(error => {
            console.error('Error during logout backend call:', error);
            // Even if backend logout fails, ensure client-side logout
            window.location.href = '/login.html?loggedout=true';
        });
}

// Ensure this file is loaded before main.js if main.js uses these functions.
