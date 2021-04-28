import React from 'react';
import { connect } from 'react-redux';
import Profile from '~/pages/Profile';
import { IProfile } from '~/models';
import IState from '~/redux/IState';
import { IProfileState, getProfile, setProfile } from '~/redux/profile';

interface IProfileContainerStateProps {
	profile: IProfileState;
}

interface IProfileContainerDispatchProps {
	getProfile(): void;
	setProfile(profile: IProfile): void;
}

type IProfileContainerProps =
	IProfileContainerStateProps &
	IProfileContainerDispatchProps;

function mapStateToProps(state: IState): IProfileContainerStateProps {
	const { profile } = state;
	return {
		profile
	};
}

const mapDispatchToProps: IProfileContainerDispatchProps = {
	getProfile,
	setProfile
};

class ProfileContainer extends React.PureComponent<IProfileContainerProps> {
	componentDidMount() {
		const { profile: { isLoading, profile }, getProfile } = this.props;
		const loadProfile = !profile && !isLoading;
		if (loadProfile) {
			getProfile();
		}
	}

	render() {
		const { profile: { profile, isSaving }, setProfile } = this.props;
		return (
			<Profile
				{...{profile, isSaving}}
				onSave={setProfile}
				/>
		);
	}
}

export default connect<
	IProfileContainerStateProps,
	IProfileContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(ProfileContainer);
