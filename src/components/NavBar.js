import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {Datacontext} from "../App"

const NavBar = props => {
	const {isLoggedIn, setIsLoggedIn, token, setToken} = useContext(Datacontext)
	console.log(isLoggedIn)

	const handleLogout = () => {
		window.localStorage.clear();
		setIsLoggedIn(false);
		console.log(window.localStorage)
	};
	return (
		<nav className="NavBar">
			{props.routes.map(({ key, path }) => {
				return key !== 'Login' ? (
					<Link key={key} to={path}>
						{key}
					</Link>
				) : (
					''
				);
			})}
			{isLoggedIn ? (
				<button
					onClick={handleLogout}
				>
					LogOut
				</button>
			) : (
				<Link to={'/login'}>Login</Link>
			)}
		</nav>
	);
};

export default NavBar;
