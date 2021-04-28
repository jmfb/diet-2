import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IIndexModel } from '~/models';
import IState from './IState';
import DiagnosticsApi from '~/api/DiagnosticsApi';
import dateService from '~/services/dateService';

export interface IHeartbeatState {
	bundleVersion: string;
	serverBundleVersion: string;
	isHeartbeatInProgress: boolean;
	today: string;
}

function makeInitialState(): IHeartbeatState {
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

export const signal = createAsyncThunk('heartbeat/signal', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	const model = await DiagnosticsApi.heartbeat(accessToken);
	const today = dateService.getToday();
	return { ...model, today };
});

const slice = createSlice({
	name: 'heartbeat',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(signal.pending, state => {
			state.isHeartbeatInProgress = true;
		})
		.addCase(signal.fulfilled, (state, action) => {
			const { bundleVersion, today } = action.payload;
			state.isHeartbeatInProgress = false;
			state.serverBundleVersion = bundleVersion;
			state.today = today;
		})
		.addCase(signal.rejected, state => {
			state.isHeartbeatInProgress = false;
		})
});

const { reducer } = slice;

export default reducer;
