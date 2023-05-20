import { Finances, TypeTransaction } from "./finances";

describe("Finances", () => {
  let sut = new Finances();

  beforeEach(() => {
    sut = new Finances();
  });

  it("should create new transaction with type leave in my finances", async () => {
    const newFinances = {
      name: "Ifood",
      description: "sushi",
      value: 36,
      type: TypeTransaction.LEAVE,
    };

    const transactionCreated = await sut.createTransaction(newFinances);

    expect(transactionCreated).toHaveProperty("id");
    expect(transactionCreated.name).toBe("Ifood");
    expect(transactionCreated.description).toBe("sushi");
    expect(transactionCreated.value).toBe(36);
    expect(transactionCreated.type).toBe(TypeTransaction.LEAVE);
  });

  it("should create new transaction with type enter in my finances", async () => {
    const newFinances = {
      name: "Salario",
      description: "meu salario mensal",
      value: 4000,
      type: TypeTransaction.ENTER,
    };

    const transactionCreated = await sut.createTransaction(newFinances);

    expect(transactionCreated).toHaveProperty("id");
    expect(transactionCreated.name).toBe("Salario");
    expect(transactionCreated.description).toBe("meu salario mensal");
    expect(transactionCreated.value).toBe(4000);
    expect(transactionCreated.type).toBe(TypeTransaction.ENTER);
  });

  it("should throw error when create transaction with value zero", async () => {
    const newFinances = {
      name: "error",
      description: "deve gerar um error",
      value: 0,
      type: TypeTransaction.ENTER,
    };

    await expect(sut.createTransaction(newFinances)).rejects.toThrow(
      "Transaction value not be zero"
    );
  });

  it("should get balance not transaction created", async () => {
    const balance = await sut.getBalance();

    expect(balance).toBe(0);
  });

  it("should get balance with transaction created", async () => {
    const enterTransaction = {
      name: "Salario",
      description: "meu salario mensal",
      value: 4000,
      type: TypeTransaction.ENTER,
    };

    const leaveTransaction = {
      name: "Ifood",
      description: "sushi",
      value: 36,
      type: TypeTransaction.LEAVE,
    };

    await sut.createTransaction(enterTransaction);
    await sut.createTransaction(leaveTransaction);

    const balance = await sut.getBalance();

    expect(balance).toBe(3964);
  });

  it("should get all transaction with type leave", async () => {
    const enterTransaction = {
      name: "Salario",
      description: "meu salario mensal",
      value: 4000,
      type: TypeTransaction.ENTER,
    };

    const leaveTransactionIfood = {
      name: "Ifood",
      description: "sushi",
      value: 36,
      type: TypeTransaction.LEAVE,
    };

    const leaveTransactionShopping = {
      name: "Shopping",
      description: "compras",
      value: 128,
      type: TypeTransaction.LEAVE,
    };

    await sut.createTransaction(enterTransaction);
    await sut.createTransaction(leaveTransactionIfood);
    await sut.createTransaction(leaveTransactionShopping);

    const balance = await sut.getTransactionByType(TypeTransaction.LEAVE);

    expect(balance).toBe(164);
  });
});
