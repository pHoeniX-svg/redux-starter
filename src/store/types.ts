export interface IBug {
  id: string | number;
  description: string;
  resolved: boolean;
}
export interface IProject {
  id: string | number;
  name: string;
}
export type BugState = IBug[];
export type ProjectState = IProject[];
