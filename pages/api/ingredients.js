// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../lib/database')

export default function handler(req, res) {
  if (req.method === 'GET') {
    const ingredients = db.prepare('SELECT * FROM ingredients ORDER BY name').all();
      res.status(200).json(ingredients)
  }

}
