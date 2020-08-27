import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const getTransaction = getRepository(Transaction);
    const transaction = await getTransaction.findOne(id);

    if (!transaction) throw new AppError('Transaction no exists');

    await getTransaction.remove(transaction);
  }
}

export default DeleteTransactionService;
