import React from 'react';
import styles from './SignInButton.scss';
import cx from 'classnames';

interface ISignInButtonProps {
	disabled: boolean;
	style: 'dark' | 'light';
	className?: string;
	onClick(): void;
}

export default function SignInButton(props: ISignInButtonProps) {
	const { disabled, style, className, onClick } = props;
	return (
		<div
			className={cx(
				styles.root,
				styles[style],
				{ [styles.disabled]: disabled },
				className)}
			onClick={onClick}>
		</div>
	);
}
