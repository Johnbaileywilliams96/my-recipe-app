const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(process.cwd(), 'recipes.db'));

// Create Users table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        instructions TEXT NOT NULL,
        prep_time INTEGER,
        cook_time INTEGER,
        servings INTEGER,
        user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        protein_per_100g DECIMAL,
        carbs_per_100g DECIMAL,
        calories_per_100g DECIMAL,
        fat_per_100g DECIMAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS recipe_ingredients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL,
        quantity DECIMAL,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS recipe_likes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS recipe_comments(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        comment TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
`);

console.log('Database connected and tables created');

module.exports = db;

// Seed some sample ingredients
const sampleIngredients = [
    { name: 'Chicken Breast', protein: 31, carbs: 0, calories: 165, fat: 3.6 },
    { name: 'Brown Rice', protein: 2.6, carbs: 23, calories: 111, fat: 0.9 },
    { name: 'Broccoli', protein: 2.8, carbs: 7, calories: 34, fat: 0.4 },
    { name: 'Salmon', protein: 25, carbs: 0, calories: 208, fat: 13 },
    { name: 'Sweet Potato', protein: 1.6, carbs: 20, calories: 86, fat: 0.1 }
  ];
  
  const insertIngredient = db.prepare(
    'INSERT OR IGNORE INTO ingredients (name, protein_per_100g, carbs_per_100g, calories_per_100g, fat_per_100g) VALUES (?, ?, ?, ?, ?)'
  );
  
  sampleIngredients.forEach(ing => {
    insertIngredient.run(ing.name, ing.protein, ing.carbs, ing.calories, ing.fat);
  });
  
  // Seed a test user
  const bcrypt = require('bcrypt');
  const testPassword = bcrypt.hashSync('password123', 10);
  db.prepare('INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)').run('test@example.com', testPassword);
  
  // Seed a sample recipe
  const recipeResult = db.prepare(
    'INSERT OR IGNORE INTO recipes (title, description, instructions, prep_time, cook_time, servings, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(
    'High Protein Chicken Bowl',
    'A healthy chicken and rice bowl packed with protein',
    '1. Cook chicken. 2. Prepare rice. 3. Steam broccoli. 4. Combine and serve.',
    15,
    25,
    2,
    1
  );
  
  // Link ingredients to recipe
  if (recipeResult.lastInsertRowid) {
    db.prepare('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, ?)').run(1, 1, 200); // 200g chicken
    db.prepare('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, ?)').run(1, 2, 150); // 150g rice
    db.prepare('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, ?)').run(1, 3, 100); // 100g broccoli
  }
  
  console.log('Database connected, tables created, and sample data seeded');