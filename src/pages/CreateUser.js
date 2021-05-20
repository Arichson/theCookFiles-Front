import React, { useEffect, useState } from 'react';

export default function CreateUser(props) {
	const [showPW, setShowPW] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [userInfo, setUserInfo] = useState(
		{
			username: "",
			password: "",
			bio: "empty",
			firstName: "empty",
			lastName: "empty",
			birthday: "empty",
			recipes: []
		}
	)

	const createNewUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8000/register`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
                }
            );
            const data = await response.json();
            console.log(userInfo)
            console.log(data)
            await setUserInfo({
				username: "",
				password: "",
				bio: "empty",
				firstName: "empty",
				lastName: "empty",
				birthday: "empty",
				recipes: []
			});
        } catch (error) {
            console.error(error);
        }
    }
	useEffect(() =>{
		setUserInfo({
			username: username,
    		password: password,
			bio: "empty",
			firstName: "empty",
			lastName: "empty",
			birthday: "empty",
			recipes: []
		})
		console.log(userInfo)
	},[username])
	useEffect(() =>{
		setUserInfo({
			username: username,
    		password: password,
			bio: "empty",
			firstName: "empty",
			lastName: "empty",
			birthday: "empty",
			recipes: []
		})
		console.log(userInfo)
	},[password])

	return (
		<div className="border-black border-2 fixed bg-gray-400 m-20 p-5 rounded">
			<form onSubmit={e => {createNewUser(e)}}>
				<h1>Create New User</h1>
				<span>Username: </span>
				<input
					onChange={e => {
						setUsername(e.target.value);
					}}
					type="text"
					placeholder="username"
					className="border-blue border-2 p-1 rounded m-1"
				/>
				<br />
				<span>Password: </span>
				<input
					onChange={e => {
						setPassword(e.target.value);
					}}
					type={showPW ? 'text' : 'password'}
					placeholder="password"
					className="border-blue border-2 p-1 rounded m-1"
				/>
				<p className="border-black border-2 rounded w-32 text-center m-2 inline bg-gray-100 p-1 cursor-pointer" onClick={() => setShowPW(!showPW)}>Show Password</p>
				<br />
				<input className="border-black border-2 rounded w-20 text-center m-2 cursor-pointer" type="submit" />
			</form>
		</div>
	);
}
