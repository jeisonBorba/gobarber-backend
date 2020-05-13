import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';

import routes from './routes';
import exceptionHandler from './middlewares/exceptionHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());
app.use(exceptionHandler);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
