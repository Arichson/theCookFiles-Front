import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Home(props) {
	// const [recipeData, setRecipeData] = useState([]);
	const [testing, setTesting] = useState({
		results: [
			{
				id: 716426,
				title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
				image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 715594,
				title: 'Homemade Garlic and Basil French Fries',
				image: 'https://spoonacular.com/recipeImages/715594-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 715497,
				title: 'Berry Banana Breakfast Smoothie',
				image: 'https://spoonacular.com/recipeImages/715497-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 644387,
				title: 'Garlicky Kale',
				image: 'https://spoonacular.com/recipeImages/644387-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 715497,
				title: 'Berry Banana Breakfast Smoothie',
				image: 'https://spoonacular.com/recipeImages/715497-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 644387,
				title: 'Garlicky Kale',
				image: 'https://spoonacular.com/recipeImages/644387-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 715497,
				title: 'Berry Banana Breakfast Smoothie',
				image: 'https://spoonacular.com/recipeImages/715497-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 644387,
				title: 'Garlicky Kale',
				image: 'https://spoonacular.com/recipeImages/644387-312x231.jpg',
				imageType: 'jpg'
			},
			{
				id: 715392,
				title: 'Chicken Tortilla Soup (Slow Cooker)',
				image: 'https://spoonacular.com/recipeImages/715392-312x231.jpg',
				imageType: 'jpg'
			}
		]
	});
	const [maxAmountOnPage, setMaxAmountOnPage] = useState(20);
	const [amountShown, setAmountShown] = useState(1);
	const API_KEY = process.env.REACT_APP_SPOON_KEY;
	// process.env.REACT_APP_SPOON_KEY;
	// const fetchAllData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${maxAmountOnPage}`
	// 		);
	// 		const data = await response.json();
	// 		setTesting(data);
	// 		console.log('Fetched');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// useEffect(() => {
	// 	fetchAllData();
	// }, []);
	// useEffect(() => {
	// 	fetchAllData();
	// }, [maxAmountOnPage]);
	return (
		<div className="HomePage">
			<h1>This is the {props.page} page</h1>
			<p>Showing {amountShown} items</p> {/* FIX THIS PART */}
			<span>
				<button onClick={() => setMaxAmountOnPage(20)}>Show 20 items</button>
				<button onClick={() => setMaxAmountOnPage(40)}>Show 40 items</button>
				<button onClick={() => setMaxAmountOnPage(60)}>Show 60 items</button>
				<button onClick={() => setMaxAmountOnPage(80)}>Show 80 items</button>
			</span>
			<button onClick={() => console.log(process.env.REACT_APP_SPOON_KEY)}>Show it</button>
			<button onClick={() => console.log(process.env.REACT_APP_TEST)}>
				Test
			</button>
			<button onClick={() => console.log(process.env.TESTED)}>
				askdjfhkawehrf
			</button>
			<div className="recipeContainer">
				{testing.results.map((recipe, index) => {
					return (
						<Link
							to={'/' + recipe.id}
							className="eachRecipe"
							style={{ backgroundImage: `url(${recipe.image})` }}
							key={index}
						>
							<p className="recipeName">{recipe.title}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
