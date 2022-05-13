require('dotenv').config();

const express = require('express');
const router = require('./routers');
const { sequelize } = require('./models');
const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.✅ -> 💻 ');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

dbConnect();

app.listen(PORT, () => {
  console.log('App Listen to: ', PORT);
});
