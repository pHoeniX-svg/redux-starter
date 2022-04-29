import { BugActions, BugState } from './types';

// Action Types
const ADD_BUG = 'ADD_BUG';
const REMOVE_BUG = 'REMOVE_BUG';
const RESOLVE_BUG = 'RESOLVE_BUG';

// Action Creators
export const addBug = (description: string): BugActions => ({
  type: ADD_BUG,
  payload: {
    description,
  },
});
export const removeBug = (id: number): BugActions => ({
  type: REMOVE_BUG,
  payload: {
    id,
  },
});
export const resolveBug = (id: number): BugActions => ({
  type: RESOLVE_BUG,
  payload: {
    id,
  },
});

// rEDUCER

let lastId = 0;
const initialState: BugState = [];

export default function reducer(state = initialState, action: BugActions) {
  switch (action.type) {
    case ADD_BUG:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case REMOVE_BUG:
      return state.filter((bug) => bug.id !== action.payload.id);

    case RESOLVE_BUG:
      return state.map((bug) =>
        bug.id === action.payload.id
          ? {
              ...bug,
              resolved: true,
            }
          : bug
      );
    default:
      return state;
  }
}
