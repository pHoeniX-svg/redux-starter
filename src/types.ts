type BugAdded = {
  type: 'BUG_ADDED';
  payload: {
    description: string;
  };
};

type BugRemoved = {
  type: 'BUG_REMOVED';
  payload: {
    id: number;
  };
};

export interface IBug {
  id: number;
  description: string;
  resolved: boolean;
}

export type BugState = IBug[];
export type BugActions = BugAdded | BugRemoved;
