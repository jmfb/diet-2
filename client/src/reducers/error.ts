import { DismissError } from '~/actions/DismissError';
import { GetAuthenticationUrlFailure } from '~/actions/GetAuthenticationUrl';
import { AuthenticateFailure } from '~/actions/Authenticate';
import { ReportError } from '~/actions/ReportError';

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
	AuthenticateFailure;

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
		case 'GET_AUTHENTICATION_URL_FAILURE': {
			const { payload: { message } } = action;
			return {
				...state,
				showError: true,
				action: 'Getting authentication URL',
				message
			};
		}
		case 'AUTHENTICATE_FAILURE': {
			const { payload: { message } } = action;
			return {
				...state,
				showError: true,
				action: 'Authenticating',
				message
			};
		}
		default:
			return state;
	}
}
