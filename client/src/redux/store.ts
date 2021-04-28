import { configureStore } from '@reduxjs/toolkit';
import error from './error';
import auth from './auth';
import heartbeat from './heartbeat';
import weights from './weights';
import profile from './profile';
import IState from './IState';

export function createStore() {
	return configureStore({
		reducer: {
			error,
			auth,
			heartbeat,
			weights,
			profile
		}
	});
};

type IStateValid =
	(<T>() => T extends IState ? 0 : 1) extends
	(<T>() => T extends ReturnType<ReturnType<typeof createStore>['getState']> ? 0 : 1) ?
		unknown :
		never;

((unused: IStateValid) => { /* Assertion: createStore().getState(): IState */ })(void 0);
