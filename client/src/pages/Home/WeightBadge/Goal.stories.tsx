import React from 'react';
import { Story, Meta } from '@storybook/react';
import Goal, { IGoalProps } from './Goal';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightBadge/Goal',
	component: Goal
} as Meta;

const Template: Story<IGoalProps> = props => <Goal {...props} />;

export const Default = Template.bind({});
Default.args = {
	mostRecentWeight: 220,
	targetWeightInPounds: 200
};
