import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // tudo
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category_id } = request.body;
  const transe = new CreateTransactionService();
  const user = await transe.execute({ title, type, value, category_id });
  console.log(user);
  return response.json(user);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
