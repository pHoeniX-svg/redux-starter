export interface IBug {
  id: string | number;
  userId?: number;
  description: string;
  resolved: boolean;
}
export type BugState = IBug[];

export interface IProject {
  id: string | number;
  name: string;
}
export type ProjectState = IProject[];

export interface IUser {
  id: string | number;
  name: string;
}
export type UserState = IUser[];
