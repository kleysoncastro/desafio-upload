import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = new TransactionsRepository();
    const transationSaveIndb = await transactionsRepository.handleTransaction({
      title,
      type,
      value,
      category,
    });

    return transationSaveIndb;
  }
}

export default CreateTransactionService;
