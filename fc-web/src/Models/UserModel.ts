export interface UserModel {
  id: string;
  userName: string;
  ownedCalendars: string[];
  memberCalendars: string[];
  googleId: string;
}
