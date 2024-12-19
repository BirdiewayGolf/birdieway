// src/client/utils/validation.ts
export const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };