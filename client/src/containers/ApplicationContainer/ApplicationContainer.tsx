import React, { lazy, useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import NewerVersionPrompt from './NewerVersionPrompt';
import { IState, authDuck, diagnosticsDuck } from '~/redux';
import useInterval from '~/hooks/useInterval';

const asyncHomeContainer = lazy(() =>
	import(/* webpackChunkName: 'HomeContainer' */ '~/containers/HomeContainer'));
const asyncProfileContainer = lazy(() =>
	import(/* webpackChunkName: 'ProfileContainer' */ '~/containers/ProfileContainer'));
const asyncSignOutContainer = lazy(() =>
	import(/* webpackChunkName: 'SignOutContainer' */ '~/containers/SignOutContainer'));

export default function ApplicationContainer() {
	const dispatch = useDispatch();
	const isHeartbeatInProgress = useSelector((state: IState) => state.diagnostics.isHeartbeatInProgress);
	const redirectToSignIn = useSelector((state: IState) => state.auth.redirectToSignIn);
	const url = useSelector((state: IState) => state.auth.url);
	const email = useSelector((state: IState) => state.auth.email);
	const bundleVersion = useSelector((state: IState) => state.diagnostics.bundleVersion);
	const serverBundleVersion = useSelector((state: IState) => state.diagnostics.serverBundleVersion);

	useEffect(() => {
		dispatch(authDuck.actions.readLocalStorage());
	}, []);

	useInterval(() => {
		if (!isHeartbeatInProgress) {
			dispatch(diagnosticsDuck.actions.heartbeat());
		}
	}, 60_000);

	const handleRefreshClicked = () => {
		window.location.reload(true);
	};

	if (redirectToSignIn && url === undefined) {
		return (
			<Redirect to='/sign-in' />
		);
	}

	if (email === undefined) {
		return null;
	}

	return (
		<>
			<Header {...{email}} />
			<main>
				<section>
					<Switch>
						<Route exact path='/' component={asyncHomeContainer} />
						<Route path='/profile' component={asyncProfileContainer} />
						<Route path='/sign-out' component={asyncSignOutContainer} />
					</Switch>
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
