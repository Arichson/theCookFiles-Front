import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateUser from './pages/CreateUser';
import IndividualRecipe from './pages/IndividualRecipes';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import UsersPage from './pages/UsersPage';
import Login from './pages/Login';
import React, {useState} from "react"
export const Datacontext = React.createContext();

// Save the Component, key and path in an array of objects for each Route
// You could write all routes by hand but I'm lazy annd this lets me use
// the map method to just loop over them and make my routes
// SWITCH is used so that it only ever matches one route at a time
// If you don't want to use react router just rewrite the app component to not use it

const routes = [
	{
		Component: Home,
		key: 'Home',
		path: '/'
	},
	{
		Component: Contact,
		key: 'Contact',
		path: '/contact'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: UsersPage,
		key: 'UsersPage',
		path: '/users'
	},
	{
		Component: Login,
		key: 'Login',
		path: '/login'
	}
];

export default function App () {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [token, setToken] = useState("")
	return (
		<Datacontext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken}}>

			<Router>
				<NavBar routes={routes} />
				<Link to="/test"> Test Anchor</Link>
				<button onClick={() => console.log('hello' + process.env.REACT_APP_TEST)}>
					Testtest
				</button>
				<Switch>
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							exact
							component={() => <Component page={key} />}
						></Route>
					))}
					<Route path="/createUser" exact render={() => <CreateUser />} />
					<Route
						path="/:id"
						render={routerProps => {
							return <IndividualRecipe {...routerProps} />;
						}}
					/>
				</Switch>
			</Router>
		</Datacontext.Provider>

	)
}
