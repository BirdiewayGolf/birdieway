
// src/client/utils/auth.ts
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };