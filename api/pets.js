const db = require('../database/database.js');

module.exports = (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    db.all("SELECT * FROM pets WHERE adopted = 0", [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(rows);
    });
  } else if (method === 'POST') {
    const { name, age, species } = req.body;

    // Adicionando log para verificar os dados recebidos no POST
    console.log('Recebendo dados do pet:', req.body);  // Adicionando log

    if (!name || !age || !species) {
      return res.status(400).json({ error: 'Por favor, forneça o nome, idade e espécie do pet.' });
    }

    const stmt = db.prepare("INSERT INTO pets (name, age, species, adopted) VALUES (?, ?, ?, ?)");
    stmt.run(name, age, species, 0, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
        name,
        age,
        species,
        adopted: false
      });
    });
  } else if (method === 'PATCH') {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: 'Por favor, forneça o ID do pet para adoção.' });
      return;
    }

    const stmt = db.prepare("UPDATE pets SET adopted = 1 WHERE id = ?");
    stmt.run(id, function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Pet não encontrado.' });
        return;
      }
      res.status(200).json({ message: `Pet com ID ${id} adotado com sucesso!` });
    });
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
};
