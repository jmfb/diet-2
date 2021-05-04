import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '~/pages/SignIn';
import { IState, authDuck } from '~/redux';

export default function SignInContainer() {
	const dispatch = useDispatch();
	const { isSigningIn, url } = useSelector((state: IState) => state.auth);

	useEffect(() => {
		dispatch(authDuck.actions.signOut());
	}, []);

	const handleSignInClicked = () => {
		dispatch(authDuck.actions.getAuthenticationUrl());
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
