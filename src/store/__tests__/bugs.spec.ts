import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createBug } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
  it('should handle the addBug action', async () => {
    const bug = { description: 'a bug' };
    const savedBug = { ...bug, id: 1 };

    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    const store = configureStore();
    await store.dispatch(createBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
