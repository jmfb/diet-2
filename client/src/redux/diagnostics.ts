import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IIndexModel } from '~/models';
import IState from './IState';
import diagnosticsHub from './diagnostics.hub';
import dateService from '~/services/dateService';

export interface IDiagnosticsState {
	bundleVersion: string;
	serverBundleVersion: string;
	isHeartbeatInProgress: boolean;
	today: string;
}

function makeInitialState(): IDiagnosticsState {
	const rootContainer = document.getElementById('root');
	const indexModelJson = rootContainer.getAttribute('data-initial-state');
	const indexModel: IIndexModel = JSON.parse(indexModelJson);
	const { bundleVersion } = indexModel;
	return {
		bundleVersion,
		serverBundleVersion: bundleVersion,
		isHeartbeatInProgress: false,
		today: dateService.getToday()
	};
}

const initialState = makeInitialState();

export const heartbeat = createAsyncThunk('diagnostics/heartbeat', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	const model = await diagnosticsHub.heartbeat(accessToken);
	const today = dateService.getToday();
	return { ...model, today };
});

const { reducer } = createSlice({
	name: 'diagnostics',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(heartbeat.pending, state => {
			state.isHeartbeatInProgress = true;
		})
		.addCase(heartbeat.fulfilled, (state, action) => {
			const { bundleVersion, today } = action.payload;
			state.isHeartbeatInProgress = false;
			state.serverBundleVersion = bundleVersion;
			state.today = today;
		})
		.addCase(heartbeat.rejected, state => {
			state.isHeartbeatInProgress = false;
		})
});

export default reducer;
