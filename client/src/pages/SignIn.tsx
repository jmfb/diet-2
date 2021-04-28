import React from 'react';
import SignInButton from '~/components/SignInButton';
import PageLoading from '~/components/PageLoading';

interface ISignInProps {
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
				<SignInButton style='dark' disabled={isSigningIn} onClick={onClickSignIn} />
				{isSigningIn &&
					<PageLoading message='Redirecting to Google sign-in page...' />
				}
			</section>
		</main>
	);
}
