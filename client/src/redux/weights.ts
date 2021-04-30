import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IWeightModel } from '~/models';
import IState from './IState';
import { signOut } from './signOut';
import WeightsApi from '~/api/WeightsApi';

export interface IWeightState {
	isSaving: boolean;
	weightInPounds: number;
}

interface IWeightStateByDate {
	[date: string]: IWeightState;
}

export interface IWeightsState {
	isLoading: boolean;
	isLoaded: boolean;
	weightStateByDate: IWeightStateByDate;
}

const initialState: IWeightsState = {
	isLoading: false,
	isLoaded: false,
	weightStateByDate: {}
};

export const loadAllWeights = createAsyncThunk('weights/loadAll', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	return await WeightsApi.loadAllWeights(accessToken);
});

export const saveWeight = createAsyncThunk('weights/save', async (weight: IWeightModel, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	const { date, weightInPounds } = weight;
	await WeightsApi.saveWeight(accessToken, date, weightInPounds);
});

const { reducer } = createSlice({
	name: 'weights',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(loadAllWeights.pending, state => {
			state.isLoading = true;
		})
		.addCase(loadAllWeights.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isLoaded = true;
			state.weightStateByDate = action.payload.reduce(
				(byDate, weight) => {
					byDate[weight.date] = {
						isSaving: false,
						weightInPounds: weight.weightInPounds
					};
					return byDate;
				},
				{} as IWeightStateByDate);
		})
		.addCase(loadAllWeights.rejected, state => {
			state.isLoading = false;
		})

		.addCase(saveWeight.pending, (state, action) => {
			const { date, weightInPounds } = action.meta.arg;
			state.weightStateByDate[date] = {
				isSaving: true,
				weightInPounds
			};
		})
		.addCase(saveWeight.fulfilled, (state, action) => {
			const { date } = action.meta.arg;
			state.weightStateByDate[date].isSaving = false;
		})
		.addCase(saveWeight.rejected, (state, action) => {
			const { date } = action.meta.arg;
			state.weightStateByDate[date] = undefined;
		})

		.addCase(signOut.fulfilled, state => {
			Object.assign(state, initialState);
		})
});

export default reducer;
