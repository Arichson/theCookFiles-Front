import React, { useState, useContext} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {Datacontext} from "../App"

export default function Login(props) {
	const history = useHistory();
	const {isLoggedIn, setIsLoggedIn} = useContext(Datacontext)
	const [showPW, setShowPW] = useState(false);
	const [notALoginAccount, setNotALoginAccount] = useState("")
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: ""
	});

	const checkUser = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("https://the-cook-files-api.herokuapp.com/users")
			const data = await response.json();
			console.log(data)
			const theUser = data.filter(users => users.username === loginForm.username)
			console.log(theUser)
			theUser[0] ? handleLogin(e) : setNotALoginAccount("The User Name or Password is incorrect.")

		} catch (error) {
			console.error(error);
		}
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("https://the-cook-files-api.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ ...loginForm })
			});
			const data = await response.json();
			console.log(data)
			
			if (data.token) {
			window.localStorage.setItem("token", data.token);
			window.localStorage.setItem("username", data.username);
			window.localStorage.setItem("id", data.id)
			setIsLoggedIn(true);
			console.log(window.localStorage)
			history.push("/")
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLoginChange = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
		console.log(loginForm)
	};

	return (
		<div className="border-black border-2 fixed bg-gray-400 m-20 p-5 rounded">
			<form onSubmit={checkUser}>
				<h1>Login</h1>
				<div>
				{notALoginAccount}
				</div>
				<span>Username: </span>
				<input
					onChange={handleLoginChange}
					type="text"
					placeholder="username"
					name="username"
					className="border-blue border-2 p-1 rounded m-1"
				/>
				<br />
				<span>Password: </span>
				<input
					onChange={handleLoginChange}
					type={showPW ? 'text' : 'password'}
					placeholder="password"
					name="password"
					className="border-blue border-2 p-1 rounded m-1"
				/>
				<p className="border-black border-2 rounded w-32 text-center m-2 inline bg-gray-100 p-1 cursor-pointer" onClick={() => setShowPW(!showPW)}>Show Password</p>
				<br />
				<input className="border-black border-2 rounded w-20 text-center m-2 cursor-pointer" type="submit" />
			</form>
			<p>Don't have an account? </p>
			<Link to="/createUser" className="border-black border-2 rounded w-32 text-center inline bg-gray-100 p-1 cursor-pointer">Create new user?</Link>
		</div>
	);
}
