import { uuid } from 'uuidv4';

class Transaction {
  id: string;

  title: string;

  type: 'income' | 'outcome';

  value: number;

  category_id: string;

  created_at: Date;

  updated_at: Date;

  constructor({ title, type, value, category_id }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.type = type;
    this.value = value;
    this.category_id = category_id;
  }
}

export default Transaction;
