import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileForm, { IProfileFormProps } from './ProfileForm';
import { Gender } from '~/models';
import '~/index.css';

export default {
	title: 'Pages/Profile/ProfileForm',
	component: ProfileForm
} as Meta;

const Template: Story<IProfileFormProps> = props =>
	<ProfileForm {...props} />;

export const BlankProfile = Template.bind({});
BlankProfile.args = {
	initialValue: {
		targetWeightInPounds: undefined,
		birthDate: undefined,
		gender: undefined,
		heightInInches: undefined
	},
	isSaving: false
};

export const FilledIn = Template.bind({});
FilledIn.args = {
	initialValue: {
		targetWeightInPounds: 200,
		birthDate: '1980-01-01',
		gender: Gender.Male,
		heightInInches: 70
	},
	isSaving: false
};

export const Saving = Template.bind({});
Saving.args = {
	initialValue: {
		targetWeightInPounds: 200,
		birthDate: '1980-01-01',
		gender: Gender.Male,
		heightInInches: 70
	},
	isSaving: true
};
