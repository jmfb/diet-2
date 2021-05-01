import { createAsyncThunk } from '@reduxjs/toolkit';
import { IWeightModel } from '~/models';
import IState from './IState';
import * as hub from './weights.hub';

export const loadAllWeights = createAsyncThunk('weights/loadAll', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	return await hub.loadAllWeights(accessToken);
});

export const saveWeight = createAsyncThunk('weights/save', async (weight: IWeightModel, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	const { date, weightInPounds } = weight;
	await hub.saveWeight(accessToken, date, weightInPounds);
});
