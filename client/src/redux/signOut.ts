import { createAsyncThunk } from '@reduxjs/toolkit';

export const signOut = createAsyncThunk('common/signOut', () => {
	localStorage.removeItem('email');
	localStorage.removeItem('accessToken');
	return Promise.resolve();
});
