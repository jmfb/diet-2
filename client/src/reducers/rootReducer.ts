import { combineReducers } from 'redux';
import error, { IErrorState } from './error';
import auth, { IAuthState } from './auth';

export interface IState {
	error: IErrorState;
	auth: IAuthState;
}

export default combineReducers<IState>({
	error,
	auth
});
