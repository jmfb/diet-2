import React from 'react';
import SignInButton from './SignInButton';
import { PageLoading } from '~/components';

export interface ISignInProps {
	isSigningIn: boolean;
	onClickSignIn(): void;
}

export default function SignIn(props: ISignInProps) {
	const { isSigningIn, onClickSignIn } = props;
	return (
		<main>
			<section>
				<h1>Nutritional Science</h1>
				<h2>Meal Planning, Weight Tracking, and More</h2>
				<p>Please sign in with any of your Google accounts.</p>
				<SignInButton
					type='dark'
					isDisabled={isSigningIn}
					onClick={onClickSignIn}
				/>
				{isSigningIn && (
					<PageLoading message='Redirecting to Google sign-in page...' />
				)}
			</section>
		</main>
	);
}
