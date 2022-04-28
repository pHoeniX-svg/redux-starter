type BugAdded = {
  type: 'ADD_BUG';
  payload: {
    description: string;
  };
};

type BugRemoved = {
  type: 'REMOVE_BUG';
  payload: {
    id: string;
  };
};

export interface IBug {
  id: string;
  description: string;
  resolved: boolean;
}

export type BugState = IBug[];
export type BugActions = BugAdded | BugRemoved;
