import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IProfile } from '~/models';
import IState from './IState';
import { signOut } from './signOut';
import profileHub from './profile.hub';

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

export const getProfile = createAsyncThunk('profile/get', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	return await profileHub.getProfile(accessToken);
});

export const setProfile = createAsyncThunk('profile/set', async (profile: IProfile, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	await profileHub.setProfile(accessToken, profile);
	return profile;
});

const { reducer } = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: builder => builder
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

export default reducer;
