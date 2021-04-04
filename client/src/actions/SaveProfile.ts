import IAction from './IAction';
import ProfileApi from '~/api/ProfileApi';
import { IState } from '~/reducers/rootReducer';
import { IProfile } from '~/models';

export type SaveProfileRequest = IAction<'SAVE_PROFILE_REQUEST', {}>;
export type SaveProfileSuccess = IAction<'SAVE_PROFILE_SUCCESS', { profile: IProfile; }>;
export type SaveProfileFailure = IAction<'SAVE_PROFILE_FAILURE', { message: string; profile: IProfile; }>;

export function saveProfile(profile: IProfile) {
	return async (dispatch: Function, getState: () => IState) => {
		dispatch(saveProfileRequest());
		try {
			const { auth: { accessToken } } = getState();
			await ProfileApi.setProfile(accessToken, profile);
			dispatch(saveProfileSuccess(profile));
		} catch (error) {
			dispatch(saveProfileFailure(error.message, profile));
		}
	};
}

function saveProfileRequest(): SaveProfileRequest {
	return { type: 'SAVE_PROFILE_REQUEST', payload: {} };
}

function saveProfileSuccess(profile: IProfile): SaveProfileSuccess {
	return { type: 'SAVE_PROFILE_SUCCESS', payload: { profile } };
}

function saveProfileFailure(message: string, profile: IProfile): SaveProfileFailure {
	return { type: 'SAVE_PROFILE_FAILURE', payload: { message, profile } };
}
