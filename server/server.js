
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Проверка подключения к БД с повторными попытками
const connectToDatabase = async (attempts = 5) => {
  // Ensure password is properly handled as string
  db.sequelize.config.password = String(process.env.DB_PASSWORD);
  
  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`Attempting to connect to PostgreSQL (Attempt ${i})...`);
      console.log(`Connecting to: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
      await db.sequelize.authenticate();
      console.log('PostgreSQL connected successfully');
      return true;
    } catch (err) {
      console.error(`Attempt ${i} failed:`, err);
      if (i < attempts) {
        console.log('Waiting 5 seconds before retry...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  throw new Error('Could not connect to database after multiple attempts');
};

// Синхронизация моделей
const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sequelize.sync({ alter: true });
      console.log('Database synchronized');
    }
  } catch (err) {
    console.error('Database sync error:', err);
  }
};

// Маршруты
try {
  app.use('/api/users', require('./routes/user.routes'));
} catch (err) {
  console.error('Failed to load user routes:', err);
  process.exit(1);
}

try {
  app.use('/api/habits', require('./routes/habit.routes')); 
} catch (err) {
  console.error('Failed to load habit routes:', err);
  process.exit(1);
}

// Обработка 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Запуск сервера
const startServer = async () => {
  try {
    await connectToDatabase();
    await syncDatabase();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

startServer();