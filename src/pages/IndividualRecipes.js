import React, { useState, useEffect, useContext } from 'react';
import {Datacontext} from "../App"

export default function IndividualRecipe(props) {
	const API_KEY = process.env.REACT_APP_SPOON_KEY;
    const {isLoggedIn, setIsLoggedIn} = useContext(Datacontext)
	const [recipe, setRecipe] = useState({
		vegetarian: "",
		vegan: "",
		glutenFree: "",
		dairyFree: "",
		veryHealthy: "",
		extendedIngredients: [
			{
				id: "",
				aisle: '',
				image: 'broccoli.',
				consistency: '',
				name: '',
				nameClean: '',
				original: '',
				originalString: '',
				originalName: '',
				amount: "",
				unit: '',
				meta: ['', ''],
				metaInformation: ['', ''],
				measures: {
					us: {
						amount: "",
						unitShort: '',
						unitLong: ''
					},
					metric: {
						amount: "",
						unitShort: '',
						unitLong: 's'
					}
				}
			}
		],
		id: "",
		title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
		readyInMinutes: "",
		servings: "",
		image: '',
		summary:
			'',
		instructions:
			"",
		analyzedInstructions: [
			{
				name: '',
				steps: [
					{
						number: 1,
						step:
							'Remove the cauliflower\'s tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of "cauliflower rice."',
						ingredients: [
							{
								id: 10011135,
								name: 'cauliflower florets',
								localizedName: 'cauliflower florets',
								image: 'cauliflower.jpg'
							},
							{
								id: 10111135,
								name: 'cauliflower rice',
								localizedName: 'cauliflower rice',
								image: 'cauliflower.jpg'
							},
							{
								id: 11135,
								name: 'cauliflower',
								localizedName: 'cauliflower',
								image: 'cauliflower.jpg'
							},
							{
								id: 20028,
								name: 'couscous',
								localizedName: 'couscous',
								image: 'couscous-cooked.jpg'
							},
							{
								id: 20444,
								name: 'rice',
								localizedName: 'rice',
								image: 'uncooked-white-rice.png'
							}
						],
						equipment: [
							{
								id: 404771,
								name: 'food processor',
								localizedName: 'food processor',
								image: 'food-processor.png'
							}
						]
					},
				]
			}
		],
		originalId: null,
	});
	const [savedApiID, setSavedApiID] = useState("")
	const theId = props.match.params.id;

	const url = `https://api.spoonacular.com/recipes/${theId}/information?apiKey=${API_KEY}`;

	const checkRecipeIdFromCookFileApi = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch(`http://localhost:8000/users/${window.localStorage.getItem("username")}/recipes`);
			const data = await response.json();
			
			console.log(data);
			const aipID = data.filter(recipes => recipes.id === theId)
			console.log(aipID)
			aipID[0] ? getRecipeIdFromCookFileApi(e) : addRecipeToDatabase(e)
		} catch (error) {
			console.log(error);
		}
	}
	const addRecipeToDatabase = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`http://localhost:8000/users/${window.localStorage.getItem("username")}/recipes`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					///////create a body thats an object containing the information needed to put at the backend
					body: JSON.stringify({
						id: recipe.id,
						title: recipe.title,
						image: recipe.image
					})
				}
			);
			const data = await response.json();
			console.log(data)
			await getRecipeIdFromCookFileApi(e)

		} catch (error) {
			console.error(error);
		}
	}
	const getRecipeIdFromCookFileApi = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch(`http://localhost:8000/users/${window.localStorage.getItem("username")}/recipes`);
			const data = await response.json();
			
			console.log(data);
			const aipID = data.filter(recipes => recipes.id === theId)
			setSavedApiID(aipID[0]._id)
		} catch (error) {
			console.log(error);
		}
	}
	const addRecipeToUser = async (e) => {

		try {
			const response = await fetch(
				`http://localhost:8000/users/${window.localStorage.getItem("username")}/recipes/${savedApiID}`,
				{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
				}
			);
			const data = await response.json();
			console.log(data)

		} catch (error) {
			console.error(error);
		}
	}
	const fetchRecipe = async () => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setRecipe(data);
			console.log('Fetched');
		} catch (error) {
			console.log(error);
		}
	};
	const normalText = /(<([^>]+)>)/ig;

	useEffect(() => {
		fetchRecipe();
	}, [props]);
	useEffect(() => {
		if(savedApiID.split("").length > 0){
			addRecipeToUser()

		}
	}, [savedApiID])
	return (
		<div className="m-10">
			<div className="recipe">
				<h1 className="text-3xl text-center">{recipe.title}</h1>
				<div className="flex justify-between w-full mt-4 mb-4 h-full">
					<img className="w-6/12 border-2 border-black rounded"src={recipe.image} alt={recipe.title + ' picture'} />
					<span className="text-left w-4/12 flex flex-col justify-center text-center align-center content-center">
						<h3 className="h-.5">
							Cooktime: <b>{recipe.readyInMinutes}</b> minutes
						</h3>
						{
							recipe.servings ? 
								<h3 className="h-.5">Serving: <b>{recipe.servings}</b></h3>
								:
								""
						}
						<h3>Vegetarian: <b>{recipe.vegetarian ? "yes" : "no"}</b></h3> 
						<h3>Vegan: <b>{recipe.vegan ? "yes" : "no"}</b></h3> 
						<h3>Gluten Free: <b>{recipe.glutenFree ? "yes" : "no"}</b></h3>
						<h3>Dairy Free: <b>{recipe. dairyFree ? "yes" : "no"}</b></h3>
					</span>
					{isLoggedIn ?
					<div className="flex items-center justify-center w-2/12"><button className="h-10 w-24 rounded border-black border-2" onClick={checkRecipeIdFromCookFileApi}>Add to list</button></div> 
					: ""
					}
			
				</div>
				<div className="border-2 border-black rounded">
					<h4 className="text-center ml-2 mr-2 mb-2 text-lg">Summary</h4>
					<p className="ml-2 mr-2 mb-2">{recipe.summary.replace(normalText, "")}</p>
				</div>
				<ul className="mt-4 border-2 border-black mb-2 rounded">
					<p className="text-center mb-4 ml-2 mr-2 text-lg">Ingredients</p>
					{recipe.extendedIngredients.map((item, index) => {
						return (
							<li key={index} className="mb-2 ml-2 mr-2">
								<p>
									<span>
										<b>{item.name + ': '}</b>
									</span>
									{item.originalString}
								</p>
							</li>
						);
					})}
				</ul>
				{recipe.analyzedInstructions[0] ?
				<div className="border-2 border-black rounded">
					<h4 className="text-center ml-2 mr-2 mb-2 text-lg">Steps</h4>
					<ol>
						{recipe.analyzedInstructions.map((item, index) => {
							{return (
								<li key={index}>
									{item.steps.map((step, other) => {
										return (
											<p className="mb-2 ml-2 mr-2" key={other}><b>{other +1}.</b> {step.step}</p>
											);
										}
										)}
								</li>
							)
						}
					})}
					</ol>
				</div>
					:
					""
				}
			</div>
		</div>
	);
}
