import IAction from './IAction';
import { IState } from '~/reducers/rootReducer';

export type LogOutSuccess = IAction<'LOG_OUT_SUCCESS', {}>;

export function logOut() {
	return (dispatch: Function, getState: () => IState) => {
		localStorage.removeItem('email');
		localStorage.removeItem('accessToken');
		dispatch(logOutSuccess());
	};
}

function logOutSuccess(): LogOutSuccess {
	return { type: 'LOG_OUT_SUCCESS', payload: {} };
}
