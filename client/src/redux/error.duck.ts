import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuthenticationUrl, authenticate } from './auth.actions';
import { heartbeat } from './diagnostics.actions';
import { loadAllWeights, saveWeight } from './weights.actions';
import { getProfile, setProfile } from './profile.actions';
import { IErrorReport } from '~/models';

export interface IErrorState {
	showError: boolean;
	action?: string;
	context?: string;
	message?: string;
}

const initialState: IErrorState = {
	showError: false,
	action: undefined,
	context: undefined,
	message: undefined
};

function setErrorState(state: IErrorState, name: string, message: string, context?: any) {
	state.showError = true;
	state.action = name;
	state.message = message;
	state.context = context ? JSON.stringify(context) : undefined;
}

export const { name, reducer, actions } = createSlice({
	name: 'error',
	initialState,
	reducers: {
		dismissError(state) {
			Object.assign(state, initialState);
		},
		reportError(state, action: PayloadAction<IErrorReport>) {
			const { action: errorAction, context, message } = action.payload;
			state.showError = true;
			state.action = errorAction;
			state.context = context;
			state.message = message;
		}
	},
	extraReducers: builder => builder
		.addCase(getAuthenticationUrl.rejected, (state, action) => {
			setErrorState(state, 'Getting authentication URL', action.error.message);
		})
		.addCase(authenticate.rejected, (state, action) => {
			setErrorState(state, 'Authenticating', action.error.message);
		})
		.addCase(heartbeat.rejected, (state, action) => {
			setErrorState(state, 'Heartbeat', action.error.message);
		})
		.addCase(saveWeight.rejected, (state, action) => {
			setErrorState(state, 'Saving weight', action.error.message, action.meta.arg);
		})
		.addCase(loadAllWeights.rejected, (state, action) => {
			setErrorState(state, 'Loading weights', action.error.message);
		})
		.addCase(getProfile.rejected, (state, action) => {
			setErrorState(state, 'Loading profile', action.error.message);
		})
		.addCase(setProfile.rejected, (state, action) => {
			setErrorState(state, 'Saving profile', action.error.message, action.meta.arg);
		})
});
