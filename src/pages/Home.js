import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Home(props) {
	// const [recipeData, setRecipeData] = useState([]);
	const [testing, setTesting] = useState({
		results: [
			{
				id: 716426,
				title: '',
				image: '',
			},
		]
	});
	const [maxAmountOnPage, setMaxAmountOnPage] = useState(20);
	const [pageNumber, setPageNumber] = useState(0)
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
	const mappingOfPagesArray = () => {
		return (
			pagesArray.map((number) => {
				return (
					<li className="w-20 text-center cursor-pointer" key={number} onClick={()=>setPageNumber(number)}>Page {number + 1} </li>
				)
			})
		)
	}
	// useEffect(() => {
	// 	fetchAllData();
	// }, []);
	// useEffect(() => {
	// 	fetchAllData();
	// }, [maxAmountOnPage]);
	// useEffect(() => {
	// 	fetchAllData();
	// }, [pageNumber]);

	return (
		<div className="HomePage">
			<h1 className="ml-5 text-xl">Welcome <b>{window.localStorage.username? window.localStorage.username : "guest"} </b></h1>
			

			<ul className="flex flex-wrap justify-around items-stretch w-full">
				{
					mappingOfPagesArray()
				}
			</ul>
			<div className="border-b-2 border-t-2 border-black">
				<button className="border-2 border-black m-2 w-32 rounded" onClick={() => setMaxAmountOnPage(20)}>Show 20 items</button>
				<button className="border-2 border-black m-2 w-32 rounded" onClick={() => setMaxAmountOnPage(40)}>Show 40 items</button>
				<button className="border-2 border-black m-2 w-32 rounded" onClick={() => setMaxAmountOnPage(60)}>Show 60 items</button>
				<button className="border-2 border-black m-2 w-32 rounded" onClick={() => setMaxAmountOnPage(80)}>Show 80 items</button>
				<button className="border-2 border-black m-2 w-32 rounded" onClick={() => setMaxAmountOnPage(100)}>Show 100 items</button>
				<p className="m-full text-center"><span>Page { pageNumber + 1 + " "}</span> | <span>Showing {maxAmountOnPage} of {1000} items</span></p>
			</div>
			<div className="flex flex-wrap justify-around items-stretch w-full h-full mb-10">
				{testing.results.map((recipe, index) => {
					return (
						<li key={index} className="flex  flex-wrap justify-around items-stretch w-60 h-60 m-1">
							<Link
								to={'/' + recipe.id}
								className="w-60 h-60 bg-cover flex items-end bg-no-repeat border-black border-2 box-border rounded m-2"
								style={{ backgroundImage: `url(${recipe.image})` }}
							>
								<p className="text-center flex items-center align-center w-full static bottom-0 bg-white bg-opacity-50 align-middle justify-center h-20 border-t-2 border-black">{recipe.title}</p>
							</Link>
						</li>
					);
				})}
			</div>
			<ul className="flex flex-wrap justify-around items-stretch w-full">
				{
					mappingOfPagesArray()
				}
			</ul>
		</div>
	);
}
