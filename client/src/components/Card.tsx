import React from 'react';
import styles from './Card.scss';
import cx from 'classnames';

interface ICardProps {
	className?: string;
	children?: React.ReactNode;
}

export default function Card(props: ICardProps) {
	const { className, children } = props;
	return (
		<div className={cx(styles.root, className)}>
			{children}
		</div>
	);
}
