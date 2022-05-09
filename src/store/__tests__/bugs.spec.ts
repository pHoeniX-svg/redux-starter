import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createBug, getUnresolvedBugs } from '../bugs';
import configureStore from '../configureStore';
import { BugState } from '../types';
import { resolveBug } from './../bugs';

describe('bugsSlice', () => {
  let fakeAxios: MockAdapter;
  let store: ReturnType<typeof configureStore>;
  const bug = { description: 'a bug' };

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

  it('should mark a bug as resolved if it is saved to the server', async () => {
    const newBug = { ...bug, id: 1 };
    const updatedBug = { ...newBug, resolved: true };

    fakeAxios.onPost('/bugs').reply(200, newBug);
    fakeAxios.onPatch('/bugs/1').reply(200, updatedBug);

    await store.dispatch(createBug(newBug));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it('should not mark a bug as resolved if it is not saved to the server', async () => {
    const newBug = { ...bug, id: 1 };
    const updatedBug = { ...newBug, resolved: true };

    fakeAxios.onPost('/bugs').reply(200, newBug);
    fakeAxios.onPatch('/bugs/1').reply(500, updatedBug);

    await store.dispatch(createBug(newBug));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

  it('should add the bug to store if it is saved to the server', async () => {
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    await store.dispatch(createBug(bug));

    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it('should not add the bug to store if it is not saved to the server', async () => {
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
