export type LoginResponse = {
  userId: number;
  accessToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
