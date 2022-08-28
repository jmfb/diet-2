import React from 'react';
import { Story, Meta } from '@storybook/react';
import WeightChange, { IWeightChangeProps } from './WeightChange';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightChange',
	component: WeightChange
} as Meta;

const Template: Story<IWeightChangeProps> = props => (
	<span style={{ display: 'inline-block' }}>
		<WeightChange {...props} />
	</span>
);

export const None = Template.bind({});
None.args = {
	targetWeightInPounds: undefined,
	weightsInPounds: []
};

export const JustOne = Template.bind({});
JustOne.args = {
	targetWeightInPounds: undefined,
	weightsInPounds: [200]
};

export const DefaultWithGain = Template.bind({});
DefaultWithGain.args = {
	targetWeightInPounds: 200,
	weightsInPounds: [220, 230]
};

export const DefaultWithLoss = Template.bind({});
DefaultWithLoss.args = {
	targetWeightInPounds: 200,
	weightsInPounds: [220, 210]
};

export const DefaultWithNoChange = Template.bind({});
DefaultWithNoChange.args = {
	targetWeightInPounds: 200,
	weightsInPounds: [220, 220]
};

export const GoalToLoseWithGain = Template.bind({});
GoalToLoseWithGain.args = {
	targetWeightInPounds: 200,
	weightsInPounds: [220, 230]
};

export const GoalToLoseWithLoss = Template.bind({});
GoalToLoseWithLoss.args = {
	targetWeightInPounds: 200,
	weightsInPounds: [220, 210]
};

export const GoalToLoseWithNoChange = Template.bind({});
GoalToLoseWithNoChange.args = {
	targetWeightInPounds: 200,
	weightsInPounds: [220, 220]
};

export const GoalToGainWithGain = Template.bind({});
GoalToGainWithGain.args = {
	targetWeightInPounds: 250,
	weightsInPounds: [220, 230]
};

export const GoalToGainWithLoss = Template.bind({});
GoalToGainWithLoss.args = {
	targetWeightInPounds: 250,
	weightsInPounds: [220, 210]
};

export const GoalToGainWithNoChange = Template.bind({});
GoalToGainWithNoChange.args = {
	targetWeightInPounds: 250,
	weightsInPounds: [220, 220]
};
