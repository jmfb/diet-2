import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { signOut } from '~/redux/signOut';

export default function SignOutContainer() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(signOut());
	}, []);

	return (
		<Redirect to='/sign-in' />
	);
}
