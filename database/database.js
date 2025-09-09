const sqlite3 = require('sqlite3').verbose();

// Criando o banco de dados ou abrindo se já existir
const db = new sqlite3.Database('./pets.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Criar a tabela pets (se não existir)
    db.run(`
      CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        species TEXT,
        adopted BOOLEAN
      );
    `);
  }
});

module.exports = db;
