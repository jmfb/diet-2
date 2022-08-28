import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authDuck } from '~/redux';

export default function SignOutContainer() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authDuck.actions.signOut());
	}, []);

	return <Redirect to='/sign-in' />;
}
