const { Pool } = require('pg');

// Configuración del cliente con las credenciales proporcionadas
const pool = new Pool({
  user: 'postgres.onzjcgeywoxffsxttdqt',
  host: 'aws-0-us-east-2.pooler.supabase.com',
  database: 'postgres',
  password: 'Laura.velasco-321',
  port: 5432,
});

// Prueba ligera de conexión
pool.query('SELECT NOW()')
  .then(res => console.log('Conectado a la base de datos:', res.rows[0]))
  .catch(err => console.error('Error de conexión a la base de datos:', err));

module.exports = pool;
