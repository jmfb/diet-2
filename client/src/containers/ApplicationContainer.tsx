import React, { lazy, useEffect, useRef } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from '~/components/Header';
import NewerVersionPrompt from '~/components/NewerVersionPrompt';
import IState from '~/redux/IState';
import { readLocalStorage } from '~/redux/auth';
import { signal } from '~/redux/heartbeat';

const asyncHomeContainer = lazy(() =>
	import(/* webpackChunkName: 'HomeContainer' */ './HomeContainer'));
const asyncProfileContainer = lazy(() =>
	import(/* webpackChunkName: 'ProfileContainer' */ './ProfileContainer'));
const asyncSignOutContainer = lazy(() =>
	import(/* webpackChunkName: 'SignOutContainer' */ './SignOutContainer'));

function useInterval(callback: () => void, timeout: number) {
	const callbackRef = useRef(null as typeof callback);
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);
	useEffect(() => {
		const intervalId = window.setInterval(() => callbackRef.current(), timeout);
		return () => window.clearInterval(intervalId);
	}, [timeout]);
}

export default function applicationContainer() {
	const dispatch = useDispatch();
	const isHeartbeatInProgress = useSelector((state: IState) => state.heartbeat.isHeartbeatInProgress);

	useEffect(() => {
		dispatch(readLocalStorage());
	}, []);

	useInterval(() => {
		if (!isHeartbeatInProgress) {
			console.log('heartbeat...');
			dispatch(signal());
		}
	}, 60_000);

	const redirectToSignIn = useSelector((state: IState) => state.auth.redirectToSignIn);
	const url = useSelector((state: IState) => state.auth.url);
	if (redirectToSignIn && url === undefined) {
		return (
			<Redirect to='/sign-in' />
		);
	}

	const email = useSelector((state: IState) => state.auth.email);
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
					<NewerVersionPrompt />
				</section>
			</main>
		</>
	);
}
