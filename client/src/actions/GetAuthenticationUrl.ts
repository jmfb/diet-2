import IAction from './IAction';
import { IState } from '~/reducers/rootReducer';
import AuthApi from '~/api/AuthApi';

export type GetAuthenticationUrlRequest = IAction<'GET_AUTHENTICATION_URL_REQUEST', {}>;
export type GetAuthenticationUrlSuccess = IAction<'GET_AUTHENTICATION_URL_SUCCESS', { url: string; }>;
export type GetAuthenticationUrlFailure = IAction<'GET_AUTHENTICATION_URL_FAILURE', { message: string; }>;

export function getAuthenticationUrl() {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(getAuthenticationUrlRequest());
		try {
			const url = await AuthApi.getAuthenticationUrl();
			dispatch(getAuthenticationUrlSuccess(url));
			window.location.href = url;
		} catch (error) {
			dispatch(getAuthenticationUrlFailure(error.message));
		}
	};
}

function getAuthenticationUrlRequest(): GetAuthenticationUrlRequest {
	return { type: 'GET_AUTHENTICATION_URL_REQUEST', payload: {} };
}

function getAuthenticationUrlSuccess(url: string): GetAuthenticationUrlSuccess {
	return { type: 'GET_AUTHENTICATION_URL_SUCCESS', payload: { url } };
}

function getAuthenticationUrlFailure(message: string): GetAuthenticationUrlFailure {
	return { type: 'GET_AUTHENTICATION_URL_FAILURE', payload: { message } };
}
