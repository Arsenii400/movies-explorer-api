require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const error = require('./middlewares/errors');
const cors = require('./middlewares/cors');

const { PORT = 3000, NODE_ENV, DB_HOST } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_HOST : 'mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT);
