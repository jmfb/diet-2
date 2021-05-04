import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageLoading from '~/components/PageLoading';
import { IState, authDuck } from '~/redux';
import queryString from 'query-string';

export default function AuthenticationContainer() {
	const dispatch = useDispatch();
	const location = useLocation();
	const email = useSelector((state: IState) => state.auth.email);
	const { code } = queryString.parse(location.search) as { code: string; };

	useEffect(() => {
		dispatch(authDuck.actions.authenticate(code));
	}, [code]);

	if (email !== undefined || !code) {
		return (
			<Redirect to='/' />
		);
	}
	return (
		<main>
			<section>
				<PageLoading message='Authenticating...' />
			</section>
		</main>
	);
}
