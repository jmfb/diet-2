import React, { lazy, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import NewerVersionPrompt from './NewerVersionPrompt';
import { IState, authSlice, diagnosticsSlice } from '~/redux';
import { useInterval } from '~/hooks';

// eslint-disable-next-line @typescript-eslint/naming-convention
const AsyncHomeContainer = lazy(
	() =>
		import(
			/* webpackChunkName: 'HomeContainer' */ '~/containers/HomeContainer'
		)
);
// eslint-disable-next-line @typescript-eslint/naming-convention
const AsyncProfileContainer = lazy(
	() =>
		import(
			/* webpackChunkName: 'ProfileContainer' */ '~/containers/ProfileContainer'
		)
);
// eslint-disable-next-line @typescript-eslint/naming-convention
const AsyncSignOutContainer = lazy(
	() =>
		import(
			/* webpackChunkName: 'SignOutContainer' */ '~/containers/SignOutContainer'
		)
);

export default function ApplicationContainer() {
	const dispatch = useDispatch();
	const { readLocalStorage } = bindActionCreators(
		authSlice.actions,
		dispatch
	);
	const { heartbeat } = bindActionCreators(
		diagnosticsSlice.actions,
		dispatch
	);
	const redirectToSignIn = useSelector(
		(state: IState) => state.auth.redirectToSignIn
	);
	const url = useSelector((state: IState) => state.auth.url);
	const email = useSelector((state: IState) => state.auth.email);
	const bundleVersion = useSelector(
		(state: IState) => state.diagnostics.bundleVersion
	);
	const serverBundleVersion = useSelector(
		(state: IState) => state.diagnostics.serverBundleVersion
	);

	useEffect(() => {
		readLocalStorage();
	}, []);

	useInterval(() => {
		heartbeat();
	}, 60_000);

	const handleRefreshClicked = () => {
		history.go(0);
	};

	if (redirectToSignIn && url === undefined) {
		return <Navigate to='/sign-in' />;
	}

	if (email === undefined) {
		return null;
	}

	return (
		<>
			<Header {...{ email }} />
			<main>
				<section>
					<Routes>
						<Route
							path='/'
							element={<AsyncHomeContainer />}
						/>
						<Route
							path='/profile'
							element={<AsyncProfileContainer />}
						/>
						<Route
							path='/sign-out'
							element={<AsyncSignOutContainer />}
						/>
						<Route
							path='*'
							element={<Navigate to='/' />}
						/>
					</Routes>
					<NewerVersionPrompt
						{...{
							bundleVersion,
							serverBundleVersion
						}}
						onClickRefresh={handleRefreshClicked}
					/>
				</section>
			</main>
		</>
	);
}
