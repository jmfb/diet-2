import React from 'react';
import { Story, Meta } from '@storybook/react';
import Statistics, { IStatisticsProps } from './Statistics';
import { Gender } from '~/models';
import '~/index.css';

export default {
	title: 'Pages/Profile/Statistics',
	component: Statistics
} as Meta;

const Template: Story<IStatisticsProps> = props => <Statistics {...props} />;

export const Default = Template.bind({});
Default.args = {
	weightInPounds: 250,
	profile: {
		targetWeightInPounds: 200,
		birthDate: '1980-01-01',
		gender: Gender.Male,
		heightInInches: 70
	}
};
