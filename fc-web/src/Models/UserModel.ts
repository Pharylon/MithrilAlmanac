
export interface UserModel {
  id: string;
  userName: string;
  ownedCalendars: string[];
  memberCalendars: string[];
  googleId: string;
  googleTokens: GoogleTokens | undefined;
}

export interface GoogleTokens{
  refreshToken: string;
  accessToken: string;
}
