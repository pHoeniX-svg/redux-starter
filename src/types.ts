type BugAdded = {
  type: 'ADD_BUG';
  payload: {
    description: string;
  };
};
type BugRemoved = {
  type: 'REMOVE_BUG';
  payload: {
    id: string | number;
  };
};
type BugResolved = {
  type: 'RESOLVE_BUG';
  payload: {
    id: string | number;
  };
};

export interface IBug {
  id: string | number;
  description: string;
  resolved: boolean;
}

export type BugState = IBug[];
export type BugActions = BugAdded | BugRemoved | BugResolved;
