import React from 'react';
import { connect } from 'react-redux';
import Home from '~/pages/Home';
import { IWeightsState } from '~/reducers/weights';
import { IState } from '~/reducers/rootReducer';
import { saveWeight } from '~/actions/SaveWeight';
import { loadAllWeights } from '~/actions/LoadAllWeights';

interface IHomeContainerStateProps {
	weights: IWeightsState;
}

interface IHomeContainerDispatchProps {
	saveWeight(date: string, weightInPounds: number): void;
	loadAllWeights(): void;
}

type IHomeContainerProps =
	IHomeContainerStateProps &
	IHomeContainerDispatchProps;

function mapStateToProps(state: IState): IHomeContainerStateProps {
	const { weights } = state;
	return { weights };
}

const mapDispatchToProps: IHomeContainerDispatchProps = {
	saveWeight,
	loadAllWeights
};

class HomeContainer extends React.PureComponent<IHomeContainerProps> {
	componentDidMount() {
		const { weights: { isLoading, isLoaded }, loadAllWeights } = this.props;
		if (!isLoading && !isLoaded) {
			loadAllWeights();
		}
	}

	render() {
		const { weights, saveWeight } = this.props;
		return (
			<Home
				{...{weights}}
				onSaveWeight={saveWeight}
				/>
		);
	}
}

export default connect<
	IHomeContainerStateProps,
	IHomeContainerDispatchProps
>(mapStateToProps, mapDispatchToProps)(HomeContainer);
