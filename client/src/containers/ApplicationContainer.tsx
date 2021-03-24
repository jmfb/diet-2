import React, { lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Header from '~/components/Header';
import { IState } from '~/reducers/rootReducer';
import { readLocalStorage } from '~/actions/ReadLocalStorage';

const asyncHomeContainer = lazy(() =>
	import(/* webpackChunkName: 'HomeContainer' */ './HomeContainer'));
const asyncProfileContainer = lazy(() =>
	import(/* webpackChunkName: 'ProfileContainer' */ './ProfileContainer'));
const asyncSignOutContainer = lazy(() =>
	import(/* webpackChunkName: 'SignOutContainer' */ './SignOutContainer'));

interface IApplicationContainerStateProps {
	email?: string;
	redirectToLogin: boolean;
	url?: string;
}

interface IApplicationContainerDispatchProps {
	readLocalStorage(): void;
}

type IApplicationContainerProps =
	IApplicationContainerStateProps &
	IApplicationContainerDispatchProps;

function mapStateToProps(state: IState): IApplicationContainerStateProps {
	const { auth: { email, redirectToLogin, url } } = state;
	return { email, redirectToLogin, url };
}

const mapDispatchToProps: IApplicationContainerDispatchProps = {
	readLocalStorage
};

class ApplicationContainer extends React.PureComponent<IApplicationContainerProps> {
	componentDidMount() {
		const { readLocalStorage } = this.props;
		readLocalStorage();
	}

	render() {
		const { email, redirectToLogin, url } = this.props;
		if (redirectToLogin && url === undefined) {
			return (
				<Redirect to='/login' />
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
					</section>
				</main>
			</>
		);
	}
}

export default connect<
	IApplicationContainerStateProps,
	IApplicationContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
