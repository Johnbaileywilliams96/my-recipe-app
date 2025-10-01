const db = require('../../../lib/database')

export default function handler(req, res) {
  const id = req.query.id
  
  if (req.method === 'GET') {
    const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id)
    res.status(200).json(recipe)
  }
  else if (req.method === 'DELETE') {
    db.prepare('DELETE FROM recipes WHERE id = ?').run(id)
    res.status(200).json({ message: 'recipe deleted'})
  }
}