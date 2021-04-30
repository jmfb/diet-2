import React from 'react';
import { Story, Meta } from '@storybook/react';
import WeightGraph, { IWeightGraphProps } from './WeightGraph';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightGraph',
	component: WeightGraph
} as Meta;

const Template: Story<IWeightGraphProps> = props =>
	<WeightGraph {...props} />;

export const NoData = Template.bind({});
NoData.args = {
	startDate: '2020-01-01',
	targetWeightInPounds: 200,
	weightsInPounds: []
};

export const Data = Template.bind({});
Data.args = {
	startDate: '2020-01-01',
	targetWeightInPounds: undefined,
	weightsInPounds: [250, 245, 246, 240, 230, 235, 220]
};

export const DataWithGoal = Template.bind({});
DataWithGoal.args = {
	startDate: '2020-01-01',
	targetWeightInPounds: 200,
	weightsInPounds: [250, 245, 246, 240, 230, 235, 220]
};
