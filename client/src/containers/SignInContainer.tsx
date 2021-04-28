import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '~/pages/SignIn';
import IState from '~/redux/IState';
import { getAuthenticationUrl } from '~/redux/auth';
import { signOut } from '~/redux/signOut';

export default function signInContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(signOut());
	}, []);

	const { isSigningIn, url } = useSelector((state: IState) => state.auth);
	if (url !== undefined) {
		return (
			<Redirect to={url} />
		);
	}

	const handleSignInClicked = () => {
		dispatch(getAuthenticationUrl());
	};

	return (
		<SignIn
			{...{isSigningIn, url}}
			onClickSignIn={handleSignInClicked}
			/>
	);
}
