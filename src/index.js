const express = require('express');

const app = express();

app.use(
  express.urlencoded({
    extended:false,
  }),
)

app.use(express.json());

require('./controllers/authController')(app);

// const authController = require('./authController.js');
// app.use('/auth', authController);
// rota inicial / endpoint

app.listen(3000);