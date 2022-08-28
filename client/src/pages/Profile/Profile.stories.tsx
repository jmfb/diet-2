import React from 'react';
import { Story, Meta } from '@storybook/react';
import Profile, { IProfileProps } from './Profile';
import { Gender } from '~/models';
import '~/index.css';

export default {
	title: 'Pages/Profile/Page',
	component: Profile
} as Meta;

const Template: Story<IProfileProps> = props => (
	<main>
		<section>
			<Profile {...props} />
		</section>
	</main>
);

export const Default = Template.bind({});
Default.args = {
	profile: undefined,
	weightInPounds: undefined,
	isSaving: false
};

export const BlankProfile = Template.bind({});
BlankProfile.args = {
	profile: {
		targetWeightInPounds: undefined,
		birthDate: undefined,
		gender: undefined,
		heightInInches: undefined
	},
	weightInPounds: undefined,
	isSaving: false
};

export const FilledIn = Template.bind({});
FilledIn.args = {
	profile: {
		targetWeightInPounds: 200,
		birthDate: '1980-01-01',
		gender: Gender.Male,
		heightInInches: 70
	},
	weightInPounds: undefined,
	isSaving: false
};

export const Saving = Template.bind({});
Saving.args = {
	profile: {
		targetWeightInPounds: 200,
		birthDate: '1980-01-01',
		gender: Gender.Male,
		heightInInches: 70
	},
	weightInPounds: undefined,
	isSaving: true
};

export const WithStatistics = Template.bind({});
WithStatistics.args = {
	profile: {
		targetWeightInPounds: 200,
		birthDate: '1980-01-01',
		gender: Gender.Male,
		heightInInches: 70
	},
	weightInPounds: 250,
	isSaving: false
};
