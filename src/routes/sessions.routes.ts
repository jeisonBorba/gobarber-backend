import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sesssionsRouter = Router();

sesssionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sesssionsRouter;
