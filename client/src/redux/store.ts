import { configureStore } from '@reduxjs/toolkit';
import * as errorDuck from './error.duck';
import * as authDuck from './auth.duck';
import * as diagnosticsDuck from './diagnostics.duck';
import * as weightsDuck from './weights.duck';
import * as profileDuck from './profile.duck';
import IState from './IState';

export function createStore() {
	return configureStore<IState>({
		reducer: {
			[errorDuck.name]: errorDuck.reducer,
			[authDuck.name]: authDuck.reducer,
			[diagnosticsDuck.name]: diagnosticsDuck.reducer,
			[weightsDuck.name]: weightsDuck.reducer,
			[profileDuck.name]: profileDuck.reducer
		}
	});
};
