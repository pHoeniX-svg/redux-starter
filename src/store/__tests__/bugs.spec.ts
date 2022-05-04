import { apiRequestStart } from '../api';
import { bugCreated, bugsRequestFailed, createBug } from '../bugs';

describe('bugsSlice', () => {
  describe('Action Creators', () => {
    it('createBug', () => {
      const bug = { description: 'bug' };
      const result = createBug(bug);
      const expected = {
        type: apiRequestStart.type,
        payload: {
          url: '/bugs',
          method: 'post',
          data: bug,
          onSuccess: bugCreated.type,
          onError: bugsRequestFailed.type,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
