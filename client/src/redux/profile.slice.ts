import { createSlice } from '@reduxjs/toolkit';
import { IProfile } from '~/models';
import { signOut } from './auth.actions';
import { getProfile, setProfile } from './profile.actions';

export interface IProfileState {
	isLoading: boolean;
	isSaving: boolean;
	profile?: IProfile;
}

const initialState: IProfileState = {
	isLoading: false,
	isSaving: false,
	profile: undefined
};

const slice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
			})
			.addCase(getProfile.rejected, state => {
				state.isLoading = false;
			})

			.addCase(setProfile.pending, state => {
				state.isSaving = true;
			})
			.addCase(setProfile.fulfilled, (state, action) => {
				state.isSaving = false;
				state.profile = action.payload;
			})
			.addCase(setProfile.rejected, state => {
				state.isSaving = false;
			})

			.addCase(signOut.fulfilled, state => {
				Object.assign(state, initialState);
			})
});

export default {
	...slice,
	actions: {
		...slice.actions,
		getProfile,
		setProfile
	}
};
