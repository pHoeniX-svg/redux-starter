import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createBug, getUnresolvedBugs } from '../bugs';
import configureStore from '../configureStore';
import { BugState } from '../types';

describe('bugsSlice', () => {
  let fakeAxios: MockAdapter;
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [] as BugState,
      },
    },
  });

  it('should add the bug to store if it is saved to the server', async () => {
    const bug = { description: 'a bug' };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    await store.dispatch(createBug(bug));

    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it('should not add the bug to store if it is not saved to the server', async () => {
    const bug = { description: 'a bug' };
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(createBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  describe('selectors', () => {
    it('should get the unresolved bugs', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];
      //@ts-expect-error
      const result = getUnresolvedBugs(state);
      expect(result).toHaveLength(2);
    });
  });
});
