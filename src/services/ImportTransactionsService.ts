import { getRepository, In } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface CVSTransaction {
  title: string;
  type: string;
  value: number;
  category: string;
}
class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const categoryRepository = getRepository(Category);
    const transactionRepositoty = getRepository(Transaction);
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transacitons: CVSTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if (!title || !type || !value) return;
      categories.push(category);
      transacitons.push({ title, type, value, category });
    });
    await new Promise(resolve => parseCSV.on('end', resolve));

    const hasCategories = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    const categoriesExistent = hasCategories.map(
      (category: Category) => category.title,
    );

    const addCategory = categories
      .filter(category => !categoriesExistent.includes(category))
      .filter((valeu, index, self) => self.indexOf(valeu) === index);

    const newCategory = categoryRepository.create(
      addCategory.map(title => ({ title })),
    );
    await categoryRepository.save(newCategory);

    const finalCategory = [...newCategory, ...hasCategories];

    const createTransaction = transactionRepositoty.create(
      transacitons.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategory.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionRepositoty.save(createTransaction);
    await fs.promises.unlink(filePath);

    return createTransaction;
  }
}

export default ImportTransactionsService;
