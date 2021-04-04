import {
	GetProfileRequest,
	GetProfileSuccess,
	GetProfileFailure
} from '~/actions/GetProfile';
import {
	SaveProfileRequest,
	SaveProfileSuccess,
	SaveProfileFailure
} from '~/actions/SaveProfile';
import { IProfile } from '~/models';

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

type HandledActions =
	GetProfileRequest |
	GetProfileSuccess |
	GetProfileFailure |
	SaveProfileRequest |
	SaveProfileSuccess |
	SaveProfileFailure;

export default function profile(state = initialState, action: HandledActions): IProfileState {
	switch (action.type) {
		case 'GET_PROFILE_REQUEST':
			return {
				...state,
				isLoading: true
			};
		case 'GET_PROFILE_SUCCESS': {
			const { payload: { profile } } = action;
			return {
				...state,
				isLoading: false,
				profile
			};
		}
		case 'GET_PROFILE_FAILURE':
			return {
				...state,
				isLoading: false
			};
		case 'SAVE_PROFILE_REQUEST':
			return {
				...state,
				isSaving: true
			};
		case 'SAVE_PROFILE_SUCCESS': {
			const { payload: { profile } } = action;
			return {
				...state,
				isSaving: false,
				profile
			};
		}
		case 'SAVE_PROFILE_FAILURE':
			return {
				...state,
				isSaving: false
			};
		default:
			return state;
	}
}
