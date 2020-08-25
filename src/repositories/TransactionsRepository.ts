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

  private async createTransaation({
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

    await getTransation.save(transation);

    return transation;
  }

  private async createCategory({ category }: Request): Promise<Category> {
    const getCategory = getRepository(Category);
    const newCategory = getCategory.create({
      title: category,
    });
    await getCategory.save(newCategory);
    return newCategory;
  }

  private async findCategory({
    category,
  }: Request): Promise<Category | undefined> {
    const getCategory = getRepository(Category);
    const hasCategory = await getCategory.findOne({
      where: { title: category },
    });

    return hasCategory;
  }

  public async handleTransaction({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const hasCategory = await this.findCategory({ category });

    if (!hasCategory) {
      const newCategory = await this.createCategory({ category });

      const saveCategory = await this.createTransaation({
        title,
        type,
        value,
        category_id: newCategory.id,
      });
      return saveCategory;
    }

    const saveCategory = await this.createTransaation({
      title,
      type,
      value,
      category_id: hasCategory.id,
    });

    return saveCategory;
  }
}

export default TransactionsRepository;
