import { DismissError } from '~/actions/DismissError';
import { GetAuthenticationUrlFailure } from '~/actions/GetAuthenticationUrl';
import { AuthenticateFailure } from '~/actions/Authenticate';
import { ReportError } from '~/actions/ReportError';
import { HeartbeatFailure } from '~/actions/Heartbeat';
import { SaveWeightFailure } from '~/actions/SaveWeight';
import { LoadAllWeightsFailure } from '~/actions/LoadAllWeights';
import { GetProfileFailure } from '~/actions/GetProfile';
import { SaveProfileFailure } from '~/actions/SaveProfile';

export interface IErrorState {
	showError: boolean;
	action?: string;
	context?: string;
	message?: string;
}

const initialState: IErrorState = {
	showError: false,
	action: undefined,
	context: undefined,
	message: undefined
};

type HandledActions =
	DismissError |
	ReportError |
	GetAuthenticationUrlFailure |
	AuthenticateFailure |
	HeartbeatFailure |
	SaveWeightFailure |
	LoadAllWeightsFailure |
	GetProfileFailure |
	SaveProfileFailure;

export default function error(state = initialState, action: HandledActions): IErrorState {
	switch (action.type) {
		case 'DISMISS_ERROR':
			return {
				...state,
				showError: false,
				action: undefined,
				context: undefined,
				message: undefined
			};
		case 'REPORT_ERROR': {
			const { payload: { action: errorAction, context, message } } = action;
			return {
				...state,
				showError: true,
				action: errorAction,
				context,
				message
			};
		}
		case 'GET_AUTHENTICATION_URL_FAILURE':
			return getErrorState(state, 'Getting authentication URL', action);
		case 'AUTHENTICATE_FAILURE':
			return getErrorState(state, 'Authenticating', action);
		case 'HEARTBEAT_FAILURE':
			return getErrorState(state, 'Heartbeat', action);
		case 'SAVE_WEIGHT_FAILURE': {
			const { payload: { date, weightInPounds } } = action;
			return getErrorState(state, 'Saving weight', action, { date, weightInPounds });
		}
		case 'LOAD_ALL_WEIGHTS_FAILURE':
			return getErrorState(state, 'Loading weights', action);
		case 'GET_PROFILE_FAILURE':
			return getErrorState(state, 'Loading profile', action);
		case 'SAVE_PROFILE_FAILURE': {
			const { payload: { profile } } = action;
			return getErrorState(state, 'Saving profile', action, { profile });
		}
		default:
			return state;
	}
}

interface IErrorAction {
	payload: {
		message: string;
	};
}

function getErrorState(state: IErrorState, name: string, action: IErrorAction, context?: any): IErrorState {
	const { payload: { message } } = action;
	return {
		...state,
		showError: true,
		action: name,
		message,
		context: context ? JSON.stringify(context) : undefined
	};
}
