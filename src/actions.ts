import * as actions from './action-types';
import { BugActions } from './types';

export const addBug = (description: string): BugActions => ({
  type: actions.ADD_BUG,
  payload: {
    description,
  },
});
export const removeBug = (id: number): BugActions => ({
  type: actions.REMOVE_BUG,
  payload: {
    id,
  },
});
export const resolveBug = (id: number): BugActions => ({
  type: actions.RESOLVE_BUG,
  payload: {
    id,
  },
});
