import React from 'react';
import styles from './Row.css';

interface IRowProps {
	label: string;
	children: React.ReactNode;
}

export default function Row(props: IRowProps) {
	const { label, children } = props;
	return (
		<div className={styles.root}>
			<span className={styles.label}>{label}</span>
			{children}
		</div>
	);
}
