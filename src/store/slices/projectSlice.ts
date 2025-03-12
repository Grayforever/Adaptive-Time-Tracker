import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, ApiError, projectApi } from '../../API/ProjectApi';
import { AppThunkDispatch } from '../storeSetup';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure(state, action: PayloadAction<ApiError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure } = projectSlice.actions;

// Thunk to fetch projects
export const fetchProjects = () => async (dispatch: AppThunkDispatch) => {
  dispatch(fetchProjectsStart());
  try {
    const projects = await projectApi.getAll();
    dispatch(fetchProjectsSuccess(projects));
  } catch (error) {
    dispatch(fetchProjectsFailure(error instanceof ApiError ? error : new ApiError('Unknown error', 0)));
  }
};

export default projectSlice.reducer;