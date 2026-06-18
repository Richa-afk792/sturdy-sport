/**
 * API utility for making requests to the backend API
 * 
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local
 * Example: VITE_CODESPACE_NAME=my-codespace-name
 * 
 * API endpoints are constructed as:
 * https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/{component}/
 */

/**
 * Get the base API URL with safe fallback
 * @returns {string} The base API URL
 */
export const getBaseApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME environment variable is not set. ' +
      'Please define it in .env.local to use the API. ' +
      'Example: VITE_CODESPACE_NAME=my-codespace-name'
    );
    // Return localhost fallback for development
    return 'http://localhost:8000/api';
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
};

/**
 * Fetch data from the API
 * @param {string} endpoint - The API endpoint (e.g., 'activities', 'users')
 * @param {object} options - Fetch options
 * @returns {Promise<object>} The API response
 */
export const fetchFromApi = async (endpoint, options = {}) => {
  const baseUrl = getBaseApiUrl();
  const url = `${baseUrl}/${endpoint}/`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

/**
 * Handle various response formats from the API
 * @param {object} data - The API response
 * @returns {array} Array of items (handles items, results, and direct array responses)
 */
export const handleResponse = (data) => {
  if (!data || typeof data !== 'object') {
    return [];
  }
  
  // If response has an 'items' key (octofit backend format)
  if (Array.isArray(data.items)) {
    return data.items;
  }
  
  // If response has a 'results' key (paginated format)
  if (Array.isArray(data.results)) {
    return data.results;
  }
  
  // If response is already an array
  if (Array.isArray(data)) {
    return data;
  }
  
  return [];
};
