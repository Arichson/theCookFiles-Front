import { useState, useEffect } from "react";
import EachUserRecipes from "./EachUserRecipes"



export default function UserRecipes ({userInfo}) {
    const [savedRecipes, setSavedRecipes] = useState([{
        id: "716426",
        image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
        title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        _id: "609c64f55b306922352a6b0c"
    }])

    useEffect(()=> {

        setSavedRecipes(userInfo.recipes)

    }, [userInfo])

    return (
        <div>
            {savedRecipes?
                savedRecipes.length > 0?

                <ul className="flex flex-wrap justify-around items-stretch w-full h-full">
                {savedRecipes.map((recipe, index) => {
                    return(
                        <EachUserRecipes key={index} userInfo={userInfo} recipe={recipe} setSavedRecipes={setSavedRecipes}/>
                        )
                    })}
                </ul>
                :
                <p>You have no items saved</p>
            :
            <p>Loading</p>
            }
        </div>
    )
}