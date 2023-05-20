import { randomUUID } from "node:crypto";

export enum TypeTransaction {
  LEAVE = "Leave",
  ENTER = "Enter",
}

interface Transaction {
  id: string;
  name: string;
  description: string;
  value: number;
  type: TypeTransaction;
}

interface ICreateTransaction {
  name: string;
  description: string;
  value: number;
  type: TypeTransaction;
}

export class Finances {
  private transactions: Transaction[] = [];

  async createTransaction(transaction: ICreateTransaction) {
    if (transaction.value === 0)
      throw new Error("Transaction value not be zero");

    const id = randomUUID();
    const newTransaction = {
      id,
      ...transaction,
    };
    this.transactions.push(newTransaction);

    return newTransaction;
  }

  async getBalance(): Promise<number> {
    const balance = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === TypeTransaction.ENTER) {
        acc += transaction.value;
      } else {
        acc -= transaction.value;
      }
      return acc;
    }, 0);

    return balance;
  }

  async getTransactionByType(type: TypeTransaction) {
    const filterTransactionByType = this.transactions.filter(
      (transaction) => transaction.type === type
    );

    const total = filterTransactionByType.reduce((acc, transaction) => {
      return (acc += transaction.value);
    }, 0);

    return total;
  }
}
