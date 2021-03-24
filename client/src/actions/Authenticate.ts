import IAction from './IAction';
import { IState } from '~/reducers/rootReducer';
import AuthApi from '~/api/AuthApi';

export type AuthenticateRequest = IAction<'AUTHENTICATE_REQUEST', { code: string; }>;
export type AuthenticateSuccess = IAction<'AUTHENTICATE_SUCCESS', { email: string; accessToken: string; }>;
export type AuthenticateFailure = IAction<'AUTHENTICATE_FAILURE', { message: string; }>;

export function authenticate(code: string) {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(authenticateRequest(code));
		try {
			const { email, accessToken } = await AuthApi.signIn(code);
			localStorage.setItem('email', email);
			localStorage.setItem('accessToken', accessToken);
			dispatch(authenticateSuccess(email, accessToken));
		} catch (error) {
			dispatch(authenticateFailure(error.messsage));
		}
	};
}

function authenticateRequest(code: string): AuthenticateRequest {
	return { type: 'AUTHENTICATE_REQUEST', payload: { code } };
}

function authenticateSuccess(email: string, accessToken: string): AuthenticateSuccess {
	return { type: 'AUTHENTICATE_SUCCESS', payload: { email, accessToken } };
}

function authenticateFailure(message: string): AuthenticateFailure {
	return { type: 'AUTHENTICATE_FAILURE', payload: { message } };
}
