import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, ApiError, taskApi } from '../../API/TaskApi';
import { AppThunkDispatch } from '../storeSetup';

interface TaskState {
    loading: boolean;
    submitTask: boolean;
    submitError: ApiError | null;
}

const initialState: TaskState = {
    loading: false,
    submitTask: false,
    submitError: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        submitTaskEntryStart(state) {
            state.submitTask = true;
            state.submitError = null;
        },
        submitTaskEntrySuccess(state) {
            state.submitTask = false;
        },
        submitTaskEntryFailure(state, action: PayloadAction<ApiError>) {
            state.submitTask = false;
            state.submitError = action.payload;
        },
    },
});

export const {
    submitTaskEntryStart,
    submitTaskEntrySuccess,
    submitTaskEntryFailure
  } = taskSlice.actions;

export const submitTaskEntry = (taskEntry: Task) => async (dispatch: AppThunkDispatch) => {
    dispatch(submitTaskEntryStart());
    try {
        const response = await taskApi.submitTaskEntry(taskEntry);
        dispatch(submitTaskEntrySuccess());
        return response;
    } catch (error) {
        dispatch(submitTaskEntryFailure(error instanceof ApiError ? error : new ApiError('Unknown error', 0)));
        throw error;
    }
};

export default taskSlice.reducer
