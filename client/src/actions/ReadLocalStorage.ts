import IAction from './IAction';
import { IState } from '~/reducers/rootReducer';

export type ReadLocalStorageSuccess = IAction<'READ_LOCAL_STORAGE_SUCCESS', { email: string; accessToken: string; }>;
export type ReadLocalStorageFailure = IAction<'READ_LOCAL_STORAGE_FAILURE', {}>;

export function readLocalStorage() {
	return (dispatch: Function, getState: () => IState) => {
		const email = localStorage.getItem('email');
		if (email === null) {
			localStorage.removeItem('accessToken');
		}
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken === null) {
			dispatch(readLocalStorageFailure());
		} else {
			dispatch(readLocalStorageSuccess(email, accessToken));
		}
	};
}

function readLocalStorageFailure(): ReadLocalStorageFailure {
	return { type: 'READ_LOCAL_STORAGE_FAILURE', payload: {} };
}

function readLocalStorageSuccess(email: string, accessToken: string): ReadLocalStorageSuccess {
	return { type: 'READ_LOCAL_STORAGE_SUCCESS', payload: { email, accessToken } };
}
