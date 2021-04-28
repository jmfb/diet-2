import React, { lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Header from '~/components/Header';
import NewerVersionPrompt from '~/components/NewerVersionPrompt';
import IState from '~/redux/IState';
import { readLocalStorage } from '~/redux/auth';
import { signal } from '~/redux/heartbeat';

const asyncHomeContainer = lazy(() =>
	import(/* webpackChunkName: 'HomeContainer' */ './HomeContainer'));
const asyncProfileContainer = lazy(() =>
	import(/* webpackChunkName: 'ProfileContainer' */ './ProfileContainer'));
const asyncSignOutContainer = lazy(() =>
	import(/* webpackChunkName: 'SignOutContainer' */ './SignOutContainer'));

interface IApplicationContainerStateProps {
	email?: string;
	redirectToSignIn: boolean;
	url?: string;
	isHeartbeatInProgress: boolean;
}

interface IApplicationContainerDispatchProps {
	readLocalStorage(): void;
	signal(): void;
}

type IApplicationContainerProps =
	IApplicationContainerStateProps &
	IApplicationContainerDispatchProps;

function mapStateToProps(state: IState): IApplicationContainerStateProps {
	const {
		auth: { email, redirectToSignIn, url },
		heartbeat: { isHeartbeatInProgress }
	} = state;
	return {
		email,
		redirectToSignIn,
		url,
		isHeartbeatInProgress
	};
}

const mapDispatchToProps: IApplicationContainerDispatchProps = {
	readLocalStorage,
	signal
};

class ApplicationContainer extends React.PureComponent<IApplicationContainerProps> {
	private intervalId: number;

	componentDidMount() {
		const { readLocalStorage } = this.props;
		readLocalStorage();
		this.intervalId = window.setInterval(this.handleInterval, 60_000);
	}

	componentWillUnmount() {
		window.clearInterval(this.intervalId);
	}

	render() {
		const { email, redirectToSignIn, url } = this.props;
		if (redirectToSignIn && url === undefined) {
			return (
				<Redirect to='/sign-in' />
			);
		}
		if (email === undefined) {
			return null;
		}
		return (
			<>
				<Header {...{email}} />
				<main>
					<section>
						<Switch>
							<Route exact path='/' component={asyncHomeContainer} />
							<Route path='/profile' component={asyncProfileContainer} />
							<Route path='/sign-out' component={asyncSignOutContainer} />
						</Switch>
						<NewerVersionPrompt />
					</section>
				</main>
			</>
		);
	}

	handleInterval = () => {
		const { isHeartbeatInProgress, signal } = this.props;
		if (!isHeartbeatInProgress) {
			signal();
		}
	};
}

export default connect<
	IApplicationContainerStateProps,
	IApplicationContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
