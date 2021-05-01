import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProfile } from '~/models';
import IState from './IState';
import * as hub from './profile.hub';

export const getProfile = createAsyncThunk('profile/get', async (unused, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	return await hub.getProfile(accessToken);
});

export const setProfile = createAsyncThunk('profile/set', async (profile: IProfile, { getState }) => {
	const { auth: { accessToken } } = getState() as IState;
	await hub.setProfile(accessToken, profile);
	return profile;
});
