
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"


export default function EachUserRecipes ({recipe, userInfo, setSavedRecipes}) {
    const [theRecipe, setTheRecipe] = useState(recipe)
    const [theUsersData, setTheUsersData] = useState(userInfo)

    const deleteARecipe = async (e, theID) => {
        e.preventDefault();

        let newRecipeList = []
        theUsersData.recipes.forEach((recipe) =>{
            if(recipe._id === theID){
                console.log("skipped " + theID)
            } else {
                newRecipeList.push(recipe)
            }
        })
        // newRecipeList[0] ? newRecipeList = newRecipeList : newRecipeList = []
        console.log(newRecipeList)
        const editedUserData = {...theUsersData, recipes: newRecipeList}
        console.log(editedUserData)
        try{
            const res = await fetch(`http://localhost:8000/users/${theUsersData._id}`,
                {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + window.localStorage.getItem("token")
                    },
                    body: JSON.stringify(editedUserData) ///// fix this 
                  
                }
            );
            const editedData = res.json();
            console.log(editedData)
            setTheRecipe(newRecipeList)
            setTheUsersData(editedUserData)
            setSavedRecipes(newRecipeList)
            console.log(theUsersData)
            
        } catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
        setTheRecipe(recipe)
        setTheUsersData(userInfo)
    }, [recipe])
    return(
        <li className="eachRecipe">

            <button className="w-6 h-6 border-black border-2 flex items-center justify-center absolute bg-gray-100 rounded hover:bg-red-300" onClick={(e) => {deleteARecipe(e, recipe._id)}} >X</button>
                <Link
                    to={'/' + theRecipe.id}
                    className="w-60 h-60 bg-cover flex items-end bg-no-repeat border-black border-2 box-border m-2 rounded"
                    style={{ backgroundImage: `url(${theRecipe.image})` }}
                    >
                    <p className="text-center flex items-center align-center w-full static bottom-0 bg-white bg-opacity-50 align-middle justify-center h-20 border-t-2 border-black">{theRecipe.title}</p>
                </Link>

            
          
        </li>
    )
}