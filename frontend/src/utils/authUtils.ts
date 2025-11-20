// frontend/src/utils/localStorage.ts

// Store the token and user data
export const setAuthData = (token: string, role: string) => {
  localStorage.setItem('portfolio_token', token);
  localStorage.setItem('portfolio_role', role);
};

// Retrieve the token
export const getToken = (): string | null => {
  return localStorage.getItem('portfolio_token');
};

// Check if user is an admin
export const isAdmin = (): boolean => {
  return localStorage.getItem('portfolio_role') === 'admin' && !!getToken();
};

// Clear all auth data on logout
export const clearAuthData = () => {
  localStorage.removeItem('portfolio_token');
  localStorage.removeItem('portfolio_role');
};