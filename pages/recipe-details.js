import { useEffect, useState } from "react"

export default function recipeDetails() {
    const [recipeDetails, setRecipeDetails] = useState([])

    useEffect(() => {
        getRecipeData()
    }, [])


    const getRecipeData = async () => {
        const response = await fetch('/api/recipe_ingredients')
        const data = await response.json();
        setRecipeDetails(data)
    }

    return (
        <div>
            <h1>hello</h1>
            {recipeDetails.map((recipeDetail) => (
                <div>
                    <h1>{recipeDetail.ingredient_name}</h1>
                    <h2>{recipeDetail.quantity}</h2>
                </div>
            ))}
        </div>
        )
}