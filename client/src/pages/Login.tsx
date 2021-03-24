import React from 'react';
import SignInButton from '~/components/SignInButton';
import PageLoading from '~/components/PageLoading';
import styles from './Login.scss';

interface ILoginProps {
	isSigningIn: boolean;
	onClickSignIn(): void;
}

export default class Login extends React.PureComponent<ILoginProps> {
	render() {
		const { isSigningIn, onClickSignIn } = this.props;
		return (
			<main>
				<section>
					<h1>Nutritional Science Login</h1>
					<h2>Meal Planning, Weight Tracking, and More</h2>
					<p>Please sign in with any of your Google accounts.</p>
					<SignInButton style='dark' disabled={isSigningIn} onClick={onClickSignIn} />
					<div className={styles.banners}>
						{isSigningIn &&
							<PageLoading message='Redirecting to sign in page...' />
						}
					</div>
				</section>
			</main>
		);
	}
}
