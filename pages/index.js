import Link from "next/link";
import { useEffect, useState } from "react"

export default function Home() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchRecipes();
}, [])


const fetchRecipes = async () => {
  const response = await fetch ('/api/recipes');
  const data = await response.json();
  setRecipes(data)
}


console.log("hello")

  return (
    <div>
      <p>Hello</p>
      <div>
        {recipes.map((recipe) => (
          <div>
            <Link href='/recipe-details'>
              <h1>{recipe.title}</h1>
            </Link>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}