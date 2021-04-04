import React from 'react';
import styles from './Card.scss';
import cx from 'classnames';

interface ICardProps {
	className?: string;
	children?: React.ReactNode;
}

export default class Card extends React.PureComponent<ICardProps> {
	render() {
		const { className, children } = this.props;
		return (
			<div className={cx(styles.root, className)}>
				{children}
			</div>
		);
	}
}
