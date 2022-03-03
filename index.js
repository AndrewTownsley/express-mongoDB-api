import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models/index.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/session', routes.session);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
