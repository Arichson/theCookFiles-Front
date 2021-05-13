import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {Datacontext} from "../App"

export default function Login(props) {
	const {isLoggedIn, setIsLoggedIn, token, setToken} = useContext(Datacontext)
	const [showPW, setShowPW] = useState(false);
	const [loginForm, setLoginForm] = useState({
	  username: "",
	  password: ""
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ ...loginForm })
			});
			const data = await response.json();
			
			if (data.token) {
			window.localStorage.setItem("token", data.token);
			window.localStorage.setItem("username", data.username);
			setIsLoggedIn(true);
			console.log(window.localStorage)
			}
		} catch (error) {
			console.error(error);
		}
	};


	const handleLoginChange = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
		console.log(loginForm)
	};

	const getUserData = async () => {
		try {
			const response = await fetch(
			`http://localhost:8000/users/${window.localStorage.getItem(
				"username"
			)}`,
			{
				method: "GET",
				headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			);
			const data = await response.json();
			// setTheUserName(window.localStorage.getItem("username"))
			// setUserData(data)
			console.log(window.localStorage)
		} catch(err) {
			console.log(err)
		}
	}


	return (
		<div className="Login">
			<h1>This is the {props.page} page</h1>
			<form onSubmit={handleLogin}>
				<h2>Login</h2>
				<span>Username: </span>
				<input
					onChange={handleLoginChange}
					type="text"
					placeholder="username"
					name="username"
				/>
				<br />
				<span>Password: </span>
				<input
					onChange={handleLoginChange}
					type={showPW ? 'text' : 'password'}
					placeholder="password"
					name="password"
				/>
				<p onClick={() => setShowPW(!showPW)}>Show Password</p>
				<br />
				<input type="submit" />
			</form>
			<p>Don't have an account? </p>
			<Link to="/createUser">Create new user?</Link>
		</div>
	);
}
