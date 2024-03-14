import pg from 'pg'
const { Client } = pg;

/* setup db connection */
const connectionString = 'postgresql://web:web@sharefolio_postgres:5432/sharefolio';
const client = new Client({ connectionString });

export default client;