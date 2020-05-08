import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sesssionsRouter = Router();
const sessionsController = new SessionsController();

sesssionsRouter.post('/', sessionsController.create);

export default sesssionsRouter;
