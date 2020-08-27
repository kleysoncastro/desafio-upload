import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const listAllTransaction = await this.find();
    const { income, outcome } = listAllTransaction.reduce(
      (accumulador, transaction) => {
        switch (transaction.type) {
          case 'outcome':
            accumulador.outcome += Number(transaction.value);
            break;

          case 'income':
            accumulador.income += Number(transaction.value);

          default:
            break;
        }
        return accumulador;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }
}

export default TransactionsRepository;
