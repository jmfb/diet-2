import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PageLoading } from '~/components';
import { IState, authSlice } from '~/redux';
import queryString from 'query-string';

export default function AuthenticationContainer() {
	const dispatch = useDispatch();
	const { authenticate } = bindActionCreators(authSlice.actions, dispatch);
	const location = useLocation();
	const email = useSelector((state: IState) => state.auth.email);
	const { code } = queryString.parse(location.search) as { code: string };

	useEffect(() => {
		authenticate(code);
	}, [code]);

	if (email !== undefined || !code) {
		return <Navigate to='/' />;
	}

	return (
		<main>
			<section>
				<PageLoading message='Authenticating...' />
			</section>
		</main>
	);
}
