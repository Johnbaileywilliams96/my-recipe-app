const db = require('../../lib/database')

export default function handler(req, res) {
  if (req.method === 'GET') {
    const recipe_ingredients = db.prepare('SELECT recipe_ingredients.id, recipe_ingredients.recipe_id, recipe_ingredients.ingredient_id, recipe_ingredients.quantity, recipes.title as recipe_name, ingredients.name as ingredient_name FROM recipe_ingredients LEFT JOIN recipes ON recipe_ingredients.recipe_id = recipes.id LEFT JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id').all();
    
    res.status(200).json(recipe_ingredients)
  }
}