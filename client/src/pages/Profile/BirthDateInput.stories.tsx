import React from 'react';
import { Story, Meta } from '@storybook/react';
import BirthDateInput, { IBirthDateInputProps } from './BirthDateInput';
import '~/index.css';

export default {
	title: 'Pages/Profile/BirthDateInput',
	component: BirthDateInput
} as Meta;

const Template: Story<IBirthDateInputProps> = props =>
	<BirthDateInput {...props} />;

export const Default = Template.bind({});

export const WithValue = Template.bind({});
WithValue.args = {
	value: '1980-01-01'
};
