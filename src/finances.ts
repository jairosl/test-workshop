import { randomUUID } from "node:crypto";

export const enum TypeTransaction {
  LEAVE = "leave",
  ENTER = "enter",
}

interface createTransaction {
  name: string;
  value: number;
  type: TypeTransaction;
  description: string;
}

export interface ITransactionRepository {
  save(transaction: createTransaction): Promise<Transaction>;
  summary(): number;
}

interface Transaction {
  id: string;
  name: string;
  value: number;
  type: TypeTransaction;
  description: string;
}

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async save(transaction: createTransaction) {
    const id = randomUUID();
    const newTransaction = {
      id,
      ...transaction,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  summary(): number {
    const summary = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === TypeTransaction.ENTER) {
        acc += transaction.value;
      } else {
        acc -= transaction.value;
      }
      return acc;
    }, 0);

    return summary;
  }
}

export class Finances {
  private repository: ITransactionRepository;

  constructor(repository: ITransactionRepository) {
    this.repository = repository;
  }

  async create(transaction: createTransaction) {
    if (transaction.value === 0) throw new Error("value with 0");

    return this.repository.save(transaction);
  }

  async getSummary() {
    const summary = this.repository.summary();

    return summary;
  }
}
