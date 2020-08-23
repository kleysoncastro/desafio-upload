// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category_id,
  }: Transaction): Promise<Transaction> {
    const transacao = new Transaction({ title, type, value, category_id });
    return transacao;
  }
}

export default CreateTransactionService;
