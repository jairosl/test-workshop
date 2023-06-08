import {
  Finances,
  InMemoryTransactionRepository,
  TypeTransaction,
} from "./finances";

const financesFactory = () => {
  const memory = new InMemoryTransactionRepository();
  const finances = new Finances(memory);

  return finances;
};

describe("Finances", () => {
  const sut = {
    finances: financesFactory(),
  };

  beforeEach(() => {
    sut.finances = financesFactory();
  });
  it("should create transaction", async () => {
    const { finances } = sut;

    const transaction = {
      name: "salario",
      value: 5000,
      type: TypeTransaction.ENTER,
      description: "",
    };

    const createdTransaction = await finances.create(transaction);

    expect(createdTransaction.name).toBe("salario");
    expect(createdTransaction).toHaveProperty("id");
  });
  it("should not create transaction with value zero", async () => {
    const { finances } = sut;

    const transaction = {
      name: "salario",
      value: 0,
      type: TypeTransaction.ENTER,
      description: "",
    };

    await expect(finances.create(transaction)).rejects.toThrow("value with 0");
  });

  it("should get summary", async () => {
    const { finances } = sut;

    const transaction = {
      name: "salario",
      value: 5000,
      type: TypeTransaction.ENTER,
      description: "",
    };

    await finances.create(transaction);
    const summary = await finances.getSummary();

    expect(summary).toBe(5000);
  });

  it("should get summary with value negative", async () => {
    const { finances } = sut;

    const transaction = {
      name: "ifood",
      value: 200,
      type: TypeTransaction.LEAVE,
      description: "",
    };

    await finances.create(transaction);
    const summary = await finances.getSummary();

    expect(summary).toBe(-200);
  });

  it("should get summary with two transactions", async () => {
    const { finances } = sut;

    const transactionLeave = {
      name: "ifood",
      value: 200,
      type: TypeTransaction.LEAVE,
      description: "",
    };
    const transactionEnter = {
      name: "salario",
      value: 5000,
      type: TypeTransaction.ENTER,
      description: "",
    };

    await finances.create(transactionLeave);
    await finances.create(transactionEnter);
    const summary = await finances.getSummary();

    expect(summary).toBe(4800);
  });
});
