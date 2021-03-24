import {
	ReadLocalStorageSuccess,
	ReadLocalStorageFailure
} from '~/actions/ReadLocalStorage';
import {
	GetAuthenticationUrlRequest,
	GetAuthenticationUrlSuccess,
	GetAuthenticationUrlFailure
} from '~/actions/GetAuthenticationUrl';
import { SignOutSuccess } from '~/actions/SignOut';
import {
	AuthenticateRequest,
	AuthenticateSuccess
} from '~/actions/Authenticate';

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

type HandledActions =
	ReadLocalStorageSuccess |
	ReadLocalStorageFailure |
	GetAuthenticationUrlRequest |
	GetAuthenticationUrlSuccess |
	GetAuthenticationUrlFailure |
	SignOutSuccess |
	AuthenticateRequest |
	AuthenticateSuccess;

export default function auth(state = initialState, action: HandledActions): IAuthState {
	switch (action.type) {
		case 'READ_LOCAL_STORAGE_SUCCESS': {
			const { payload: { email, accessToken } } = action;
			return {
				...state,
				email,
				accessToken,
				redirectToSignIn: false
			};
		}
		case 'READ_LOCAL_STORAGE_FAILURE':
			return { ...state, redirectToSignIn: true };
		case 'GET_AUTHENTICATION_URL_REQUEST':
			return { ...state, isSigningIn: true };
		case 'GET_AUTHENTICATION_URL_SUCCESS': {
			const { payload: { url } } = action;
			return { ...state, isSigningIn: false, url };
		}
		case 'GET_AUTHENTICATION_URL_FAILURE':
			return { ...state, isSigningIn: false };
		case 'SIGN_OUT_SUCCESS':
			return initialState;
		case 'AUTHENTICATE_REQUEST':
			return {
				...state,
				redirectToSignIn: false,
				isSigningIn: false,
				url: undefined
			};
		case 'AUTHENTICATE_SUCCESS': {
			const { payload: { email, accessToken } } = action;
			return {
				...state,
				email,
				accessToken
			};
		}
		default:
			return state;
	}
}
