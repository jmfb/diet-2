import IAction from './IAction';
import { IState } from '~/reducers/rootReducer';

export type SignOutSuccess = IAction<'SIGN_OUT_SUCCESS', {}>;

export function signOut() {
	return (dispatch: Function, getState: () => IState) => {
		localStorage.removeItem('email');
		localStorage.removeItem('accessToken');
		dispatch(signOutSuccess());
	};
}

function signOutSuccess(): SignOutSuccess {
	return { type: 'SIGN_OUT_SUCCESS', payload: {} };
}
