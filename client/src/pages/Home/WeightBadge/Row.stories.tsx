import React from 'react';
import { Story, Meta } from '@storybook/react';
import Row, { IRowProps } from './Row';
import '~/index.css';

export default {
	title: 'Pages/Home/WeightBadge/Row',
	component: Row
} as Meta;

const Template: Story<IRowProps> = props => <Row {...props}>Children</Row>;

export const Default = Template.bind({});
Default.args = {
	label: 'Label'
};
