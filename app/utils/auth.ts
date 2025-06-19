// Client-side authentication utilities

/**
 * Check if user is authenticated by verifying JWT token existence
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  
  // You could add JWT expiration validation here
  // For now, we just check if the token exists
  
  return true;
};

/**
 * Get the authentication token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

/**
 * Log the user out by removing the token and redirecting
 */
export const logout = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('auth_token');
  // window.location.href = '/login'; // REMOVED: Redirect is handled by the calling component (Navigation.tsx)
};

/**
 * Fetch with authentication headers
 */
export const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  
  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
};

/**
 * Get user profile data
 */
export const getUserProfile = async (): Promise<any> => {
  try {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/user/profile`);
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        logout(); // Token might be invalid or expired
        throw new Error('Authentication failed');
      }
      throw new Error('Failed to fetch user profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}; 