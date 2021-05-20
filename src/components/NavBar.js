import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import {Datacontext} from "../App"

const NavBar = props => {
	const {isLoggedIn, setIsLoggedIn} = useContext(Datacontext)
	console.log(isLoggedIn)

	const handleLogout = () => {
		window.localStorage.clear();
		setIsLoggedIn(false);
		console.log(window.localStorage)
	};
	return (
		<nav className="flex justify-around bg-gray-500 p-3">
			{props.routes.map(({ key, path }) => {
				return key !== 'Login' ? (
					<Link className="hover:text-green-500" key={key} to={path}>
						{key}
					</Link>
				) : (
					''
				);
			})}
			{isLoggedIn ? (
				<button
					onClick={handleLogout}
					className="hover:text-green-500"
				>
					LogOut
				</button>
			) : (
				<Link className="hover:text-green-500" to={'/login'}>Login</Link>
			)}
		</nav>
	);
};

export default NavBar;
