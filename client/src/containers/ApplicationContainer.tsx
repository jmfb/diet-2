import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { IState } from '~/reducers/rootReducer';
import { readLocalStorage } from '~/actions/ReadLocalStorage';

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
			<div>Hello World, {email}</div>
		);
	}
}

export default connect<
	IApplicationContainerStateProps,
	IApplicationContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
