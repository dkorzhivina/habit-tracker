const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './server/.env' });

async function testDb() {
  const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: true
  });

  try {
    await sequelize.authenticate();
    console.log('Connection successful');
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    await sequelize.close();
  }
}

testDb();
