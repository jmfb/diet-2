import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '~/pages/SignIn';
import IState from '~/redux/IState';
import { getAuthenticationUrl } from '~/redux/auth';
import { signOut } from '~/redux/signOut';

export default function SignInContainer() {
	const dispatch = useDispatch();
	const { isSigningIn, url } = useSelector((state: IState) => state.auth);

	useEffect(() => {
		dispatch(signOut());
	}, []);

	const handleSignInClicked = () => {
		dispatch(getAuthenticationUrl());
	};

	if (url !== undefined) {
		return (
			<Redirect to={url} />
		);
	}

	return (
		<SignIn
			{...{isSigningIn, url}}
			onClickSignIn={handleSignInClicked}
			/>
	);
}
