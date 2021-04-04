import IAction from './IAction';
import ProfileApi from '~/api/ProfileApi';
import { IState } from '~/reducers/rootReducer';
import { IProfile } from '~/models';

export type GetProfileRequest = IAction<'GET_PROFILE_REQUEST', {}>;
export type GetProfileSuccess = IAction<'GET_PROFILE_SUCCESS', { profile: IProfile; }>;
export type GetProfileFailure = IAction<'GET_PROFILE_FAILURE', { message: string; }>;

export function getProfile() {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(getProfileRequest());
		try {
			const { auth: { accessToken } } = getState();
			const profile = await ProfileApi.getProfile(accessToken);
			dispatch(getProfileSuccess(profile));
		} catch (error) {
			dispatch(getProfileFailure(error.message));
		}
	};
}

function getProfileRequest(): GetProfileRequest {
	return { type: 'GET_PROFILE_REQUEST', payload: {} };
}

function getProfileSuccess(profile: IProfile): GetProfileSuccess {
	return { type: 'GET_PROFILE_SUCCESS', payload: { profile } };
}

function getProfileFailure(message: string): GetProfileFailure {
	return { type: 'GET_PROFILE_FAILURE', payload: { message } };
}
