import React from 'react';
import cx from 'classnames';
import styles from './Pill.scss';

interface IPillProps {
	type: 'info' | 'danger' | 'success';
	className?: string;
	children?: React.ReactNode;
}

export default class Pill extends React.PureComponent<IPillProps> {
	render() {
		const { type, className, children } = this.props;
		return (
			<div className={cx(styles.root, styles[type], className)}>
				{children}
			</div>
		);
	}
}
