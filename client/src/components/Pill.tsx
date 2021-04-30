import React from 'react';
import cx from 'classnames';
import styles from './Pill.css';

export interface IPillProps {
	type: 'info' | 'danger' | 'success';
	className?: string;
	children?: React.ReactNode;
}

export default function Pill(props: IPillProps) {
	const { type, className, children } = props;
	return (
		<div className={cx(styles.root, styles[type], className)}>
			{children}
		</div>
	);
}
