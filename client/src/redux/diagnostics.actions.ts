import { createAsyncThunk } from '@reduxjs/toolkit';
import IState from './IState';
import dateService from '~/services/dateService';
import * as hub from './diagnostics.hub';

export const heartbeat = createAsyncThunk('diagnostics/heartbeat', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	const model = await hub.heartbeat(accessToken);
	const today = dateService.getToday();
	return { ...model, today };
});
