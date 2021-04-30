import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.css';

export interface IHeaderProps {
	email: string;
}

export default function Header(props: IHeaderProps) {
	const { email } = props;
	return (
		<header className={styles.root}>
			<nav className={styles.links}>
				<div className={styles.left}>
					<NavLink exact to='/' activeClassName={styles.active}>Home</NavLink>
				</div>
				<div className={styles.right}>
					<NavLink to='/profile' activeClassName={styles.active}>{email}</NavLink>
					<NavLink to='/sign-out' activeClassName={styles.active}>Sign Out</NavLink>
				</div>
			</nav>
		</header>
	);
}
