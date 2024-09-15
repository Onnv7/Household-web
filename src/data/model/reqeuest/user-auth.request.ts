export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type GoogleAuthHeader =
  | { code: string } // Chỉ được phép có `code`, không có `idToken`
  | { idToken: string };
