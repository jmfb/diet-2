import React from 'react';
import { connect } from 'react-redux';
import Home from '~/pages/Home';
import { IProfile, IWeightModel } from '~/models';
import IState from '~/redux/IState';
import { IWeightsState, saveWeight, loadAllWeights } from '~/redux/weights';
import { getProfile } from '~/redux/profile';

interface IHomeContainerStateProps {
	weights: IWeightsState;
	loadProfile: boolean;
	profile?: IProfile;
	today: string;
}

interface IHomeContainerDispatchProps {
	saveWeight(weight: IWeightModel): void;
	loadAllWeights(): void;
	getProfile(): void;
}

type IHomeContainerProps =
	IHomeContainerStateProps &
	IHomeContainerDispatchProps;

function mapStateToProps(state: IState): IHomeContainerStateProps {
	const { weights, profile: { isLoading, profile }, heartbeat: { today } } = state;
	const loadProfile = !profile && !isLoading;
	return {
		weights,
		loadProfile,
		profile,
		today
	};
}

const mapDispatchToProps: IHomeContainerDispatchProps = {
	saveWeight,
	loadAllWeights,
	getProfile
};

class HomeContainer extends React.PureComponent<IHomeContainerProps> {
	componentDidMount() {
		const { weights: { isLoading, isLoaded }, loadAllWeights, loadProfile, getProfile } = this.props;
		if (!isLoading && !isLoaded) {
			loadAllWeights();
		}
		if (loadProfile) {
			getProfile();
		}
	}

	render() {
		const { weights, profile, today } = this.props;
		return (
			<Home
				{...{weights, profile, today}}
				onSaveWeight={this.handleSaveWeight}
				/>
		);
	}

	handleSaveWeight = (date: string, weightInPounds: number) => {
		const { saveWeight } = this.props;
		saveWeight({ date, weightInPounds });
	};
}

export default connect<
	IHomeContainerStateProps,
	IHomeContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(HomeContainer);
