import * as React from 'react';
import { withRouter, Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

interface IApplicationContainerState {
	redirectToLogin: boolean;
}

class ApplicationContainer extends React.Component<RouteComponentProps, IApplicationContainerState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			redirectToLogin: false
		};
	}

	componentWillMount() {
		if (localStorage.getItem('name') == null) {
			localStorage.removeItem('token');
		}
		if (localStorage.getItem('token') == null) {
			this.setState({ redirectToLogin: true });
		}
	}

	render() {
		const { history } = this.props;
		const { redirectToLogin } = this.state;
		if (redirectToLogin) {
			const redirectTo = {
				pathname: '/login',
				state: { returnTo: history.location.pathname }
			};
			return (
				<Redirect to={redirectTo} />
			);
		}
		return (
			<div>Hello World</div>
		);
	}
}

export default withRouter(ApplicationContainer);
