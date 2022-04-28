import * as actions from './action-types';
import { BugActions } from './types';

export const bugAdded = (description: string): BugActions => ({
  type: actions.BUG_ADDED,
  payload: {
    description,
  },
});

export const bugResolved = (id: number): BugActions => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});
