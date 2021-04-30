import { configureStore } from '@reduxjs/toolkit';
import error from './error';
import auth from './auth';
import heartbeat from './heartbeat';
import weights from './weights';
import profile from './profile';
import IState from './IState';

export function createStore() {
	return configureStore<IState>({
		reducer: {
			error,
			auth,
			heartbeat,
			weights,
			profile
		}
	});
};
