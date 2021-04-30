import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PageLoading from '~/components/PageLoading';
import IState from '~/redux/IState';
import { authenticate } from '~/redux/auth';
import queryString from 'query-string';

export default function AuthenticationContainer() {
	const dispatch = useDispatch();
	const email = useSelector((state: IState) => state.auth.email);

	useEffect(() => {
		const { code } = queryString.parse(location.search) as { code: string; };
		dispatch(authenticate(code));
	}, []);

	if (email !== undefined) {
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
