import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configuredStore from '../configureStore';
import { createProject } from './../projects';

describe('projectSlice', () => {
  let fakeAxios: MockAdapter;
  let store: ReturnType<typeof configuredStore>;
  const project = { name: 'project 01' };

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configuredStore();
  });

  const projectsSlice = () => store.getState().entities.projects;

  it('should add a project to the store when saved to the server', async () => {
    const createdProject = { ...project, id: 1 };
    fakeAxios.onPost('/projects').reply(200, createdProject);

    await store.dispatch(createProject(createdProject));

    expect(projectsSlice()).toContainEqual(createdProject);
  });

  it('should not add a project to the store if not saved to the server', async () => {
    const createdProject = { ...project, id: 1 };
    fakeAxios.onPost('/projects').reply(500);

    await store.dispatch(createProject(createdProject));

    expect(projectsSlice()).toHaveLength(0);
  });
});
