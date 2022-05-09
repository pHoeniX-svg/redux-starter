import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createBug, getUnresolvedBugs } from '../bugs';
import configuredStore from '../configureStore';
import { BugState } from '../types';
import { loadBugs, resolveBug } from './../bugs';

describe('bugsSlice', () => {
  let fakeAxios: MockAdapter;
  let store: ReturnType<typeof configuredStore>;
  const bug = { description: 'a bug' };

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configuredStore();
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

  describe('loading bugs', () => {
    describe('if the bugs are in the cache', () => {
      it('should not be fetched from the server again', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe('if the bugs are not in the cache', () => {
      it('should be fetched from the server and put in the store', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe('loading indicator', () => {
        it('should be true while fetching the bugs', () => {
          fakeAxios.onGet('/bugs').reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it('should be false after fetching the bugs', async () => {
          fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it('should be false if the server returns an error', async () => {
          fakeAxios.onGet('/bugs').reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  describe('selectors', () => {
    it('should get the unresolved bugs', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      //@ts-ignore
      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
