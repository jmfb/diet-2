import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '~/pages';
import { IState, authSlice } from '~/redux';

export default function SignInContainer() {
	const dispatch = useDispatch();
	const { signOut, getAuthenticationUrl } = bindActionCreators(
		authSlice.actions,
		dispatch
	);
	const isSigningIn = useSelector((state: IState) => state.auth.isSigningIn);
	const url = useSelector((state: IState) => state.auth.url);

	useEffect(() => {
		signOut();
	}, []);

	if (url !== undefined) {
		return <Navigate to={url} />;
	}

	return (
		<SignIn
			{...{
				isSigningIn,
				url
			}}
			onClickSignIn={getAuthenticationUrl}
		/>
	);
}
