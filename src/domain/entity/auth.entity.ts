export type LoginEntity = {
  email: string;
  password: string;
};

export type UpdatePasswordEntity = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type GoogleAuthEntity =
  | {
      code: string;
    }
  | { idToken: string };

export type RefreshTokenEntity = {
  accessToken: string;
};
