// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../lib/database')

export default function handler(req, res) {
  if (req.method === 'GET') {
    const recipes = db.prepare('SELECT * FROM recipes ORDER BY title').all();
      res.status(200).json(recipes)
  }
}
