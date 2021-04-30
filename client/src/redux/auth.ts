import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from './signOut';
import AuthApi from '~/api/AuthApi';

export interface IAuthState {
	email?: string;
	accessToken?: string;
	redirectToSignIn: boolean;
	isSigningIn: boolean;
	url?: string;
}

const initialState: IAuthState = {
	email: undefined,
	accessToken: undefined,
	redirectToSignIn: false,
	isSigningIn: false,
	url: undefined
};

export const readLocalStorage = createAsyncThunk('auth/readLocalStorage', () => {
	const email = localStorage.getItem('email');
	if (email === null) {
		localStorage.removeItem('accessToken');
	}
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken === null) {
		return Promise.reject();
	} else {
		return Promise.resolve({ email, accessToken });
	}
});

export const getAuthenticationUrl = createAsyncThunk('auth/getAuthenticationUrl', async () => {
	const url = await AuthApi.getAuthenticationUrl();
	window.location.href = url;
	return url;
});

export const authenticate = createAsyncThunk('auth/authenticate', async (code: string) => {
	const { email, accessToken } = await AuthApi.signIn(code);
	localStorage.setItem('email', email);
	localStorage.setItem('accessToken', accessToken);
	return { email, accessToken };
});

const { reducer } = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(readLocalStorage.fulfilled, (state, action) => {
			const { email, accessToken } = action.payload;
			state.email = email;
			state.accessToken = accessToken;
			state.redirectToSignIn = false;
		})
		.addCase(readLocalStorage.rejected, state => {
			state.redirectToSignIn = true;
		})

		.addCase(getAuthenticationUrl.pending, state => {
			state.isSigningIn = true;
		})
		.addCase(getAuthenticationUrl.fulfilled, (state, action) => {
			state.isSigningIn = false;
			state.url = action.payload;
		})
		.addCase(getAuthenticationUrl.rejected, state => {
			state.isSigningIn = false;
		})

		.addCase(signOut.fulfilled, state => {
			Object.assign(state, initialState);
		})

		.addCase(authenticate.pending, state => {
			state.isSigningIn = false;
			state.redirectToSignIn = false;
			state.url = undefined;
		})
		.addCase(authenticate.fulfilled, (state, action) => {
			const { email, accessToken } = action.payload;
			state.email = email;
			state.accessToken = accessToken;
		})
});

export default reducer;
