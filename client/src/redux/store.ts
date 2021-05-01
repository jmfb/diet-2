import { configureStore } from '@reduxjs/toolkit';
import error from './error';
import auth from './auth';
import diagnostics from './diagnostics';
import weights from './weights';
import profile from './profile';
import IState from './IState';

export function createStore() {
	return configureStore<IState>({
		reducer: {
			error,
			auth,
			diagnostics,
			weights,
			profile
		}
	});
};
