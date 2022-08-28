import { createSlice } from '@reduxjs/toolkit';
import { IWeightStateByDate } from '~/models';
import { signOut } from './auth.actions';
import { loadAllWeights, saveWeight } from './weights.actions';

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

const slice = createSlice({
	name: 'weights',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
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
					{} as IWeightStateByDate
				);
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

export default {
	...slice,
	actions: {
		...slice.actions,
		loadAllWeights,
		saveWeight
	}
};
