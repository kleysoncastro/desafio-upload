import { EntityRepository, Repository, getRepository } from 'typeorm';

import Category from '../models/Category';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title?: string;
  type?: 'income' | 'outcome';
  value?: number;
  category?: string;
  category_id?: string;
}
@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
  }

  private async HandleTransation({
    title,
    type,
    value,
    category_id,
  }: Request): Promise<Transaction> {
    const getTransation = getRepository(Transaction);
    const transation = getTransation.create({
      title,
      type,
      value,
      category_id,
    });

    console.log('----------- HandleTransation');
    console.log(transation);

    await getTransation.save(transation);

    return transation;
  }

  public async createTransaction({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const getCategory = getRepository(Category);
    const hasCategory = await getCategory.findOne({
      where: { title: category },
    });
    console.log('---------------------');
    console.log(hasCategory);
    if (!hasCategory) {
      console.log('-------------- if linha 56');
      const newCategory = getCategory.create({
        title: category,
      });
      await getCategory.save(newCategory);
      const saveCategory = await this.HandleTransation({
        title,
        type,
        value,
        category_id: newCategory.id,
      });
      return saveCategory;
    }

    const saveCategory = await this.HandleTransation({
      title,
      type,
      value,
      category_id: hasCategory.id,
    });

    return saveCategory;
  }
}

export default TransactionsRepository;
