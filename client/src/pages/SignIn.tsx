import React from 'react';
import SignInButton from '~/components/SignInButton';
import PageLoading from '~/components/PageLoading';

interface ISignInProps {
	isSigningIn: boolean;
	onClickSignIn(): void;
}

export default class SignIn extends React.PureComponent<ISignInProps> {
	render() {
		const { isSigningIn, onClickSignIn } = this.props;
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
}
