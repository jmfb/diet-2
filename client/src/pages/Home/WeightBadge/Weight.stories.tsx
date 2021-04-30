import React from 'react';
import { Story, Meta } from '@storybook/react';
import Weight, { IWeightProps } from './Weight';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightBadge/Weight',
	component: Weight
} as Meta;

const Template: Story<IWeightProps> = props =>
	<Weight {...props} />;

export const Default = Template.bind({});
Default.args = {
	startingWeight: 250,
	mostRecentWeight: 220
};
