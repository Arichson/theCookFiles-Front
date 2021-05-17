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
	const [pageNumber, setPageNumber] = useState(0)
	const [amountShown, setAmountShown] = useState(1);
	const theOffset = maxAmountOnPage*pageNumber
	const API_KEY = process.env.REACT_APP_SPOON_KEY;
	const fetchAllData = async () => {
		try {
			const response = await fetch(
				`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${maxAmountOnPage}&offset=${theOffset > 900? 900 : theOffset}`
			);
			const data = await response.json();
			setTesting(data);
			console.log('Fetched');
		} catch (error) {
			console.log(error);
		}
	};
	const pagesArray = []
	for(let i = 0; i < Math.ceil(1000/maxAmountOnPage); i++){
		pagesArray.push(i)
	}

	useEffect(() => {
		fetchAllData();
	}, []);
	useEffect(() => {
		fetchAllData();
	}, [maxAmountOnPage]);
	useEffect(() => {
		fetchAllData();
	}, [pageNumber]);

	return (
		<div className="HomePage">
			<h1>Welcome {window.localStorage.username? window.localStorage.username : "guest"}</h1>
			<p>Showing {amountShown} of {1000} items</p> {/* FIX THIS PART */}
			<span>Page { pageNumber + 1 + " "}</span>
			<ul>
				{
					pagesArray.map((number) => {
						return (
							<span key={number} onClick={()=>setPageNumber(number)}>Page {number + 1} </span>
						)
					})
				}
			</ul>
			<span>
				<button onClick={() => setMaxAmountOnPage(20)}>Show 20 items</button>
				<button onClick={() => setMaxAmountOnPage(40)}>Show 40 items</button>
				<button onClick={() => setMaxAmountOnPage(60)}>Show 60 items</button>
				<button onClick={() => setMaxAmountOnPage(80)}>Show 80 items</button>
				<button onClick={() => setMaxAmountOnPage(100)}>Show 100 items</button>
			</span>
			<div className="recipeContainer">
				{testing.results.map((recipe, index) => {
					return (
						<li key={index} className="eachRecipe">
							<Link
								to={'/' + recipe.id}
								className="recipeLink"
								style={{ backgroundImage: `url(${recipe.image})` }}
								>
								<p className="recipeName">{recipe.title}</p>
							</Link>
						</li>
					);
				})}
			</div>
		</div>
	);
}
