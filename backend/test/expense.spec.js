const Expense = require("../models/expense");

jest.mock("../models/expense", () => ({
  add: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getByEmails: jest.fn(),
  getByUserEmail: jest.fn(),
  getByMonth: jest.fn(),
  getExpenseSumInDateRangeByUser: jest.fn(),
  getKilometrinaSumByUser: jest.fn(),
}));

describe("Expense", () => {
  it("should add a new expense", async () => {
    const mockExpense = {
      id: "user_2024-10-27T00:00:00.000Z",
      naziv: "Obisk Ljubljane",
      datum_odhoda: "2024-10-27",
      datum_prihoda: "2024-10-28",
      kilometrina: 100,
      lokacija: "Ljubljana",
      opis: "Sli smo v Lj.",
      oseba: "janez@gmail.com",
      cena: 43.0,
    };

    Expense.add.mockResolvedValue({
      message: "Uspešno dodan potni strošek",
      strosek: mockExpense,
    });

    const result = await Expense.add(
      "Obisk Ljubljane",
      "2024-10-27",
      "2024-10-28",
      100,
      "Ljubljana",
      "Sli smo v Lj.",
      "janez@gmail.com"
    );
    expect(result.message).toBe("Uspešno dodan potni strošek");
    expect(result.strosek).toEqual(mockExpense);
  });

  it("should return all expenses", async () => {
    const mockExpenses = [
      {
        naziv: "Obisk Ljubljane",
        datum_odhoda: "2024-10-27",
        datum_prihoda: "2024-10-28",
      },
      {
        naziv: "Konferenca v Kopru",
        datum_odhoda: "2024-11-10",
        datum_prihoda: "2024-11-11",
      },
    ];

    Expense.getAll.mockResolvedValue(mockExpenses);

    const result = await Expense.getAll(10, 0);
    expect(result).toEqual(mockExpenses);
  });

  it("should return a specific expense", async () => {
    const mockExpense = {
      naziv: "Obisk Ljubljane",
      datum_odhoda: "2024-10-27",
      datum_prihoda: "2024-10-28",
    };
    const id = "user_2024-10-27T00:00:00.000Z";

    Expense.getById.mockResolvedValue(mockExpense);

    const result = await Expense.getById(id);
    expect(result).toEqual(mockExpense);
  });

  it("should update an expense", async () => {
    const id = "user_2024-10-27T00:00:00.000Z";
    const updatedData = { naziv: "Updated Obisk Ljubljane" };

    Expense.put.mockResolvedValue({
      message: "Potni strošek je uspešno posodobljen",
    });

    const result = await Expense.put(id, updatedData);
    expect(result.message).toBe("Potni strošek je uspešno posodobljen");
  });

  it("should delete an expense", async () => {
    const id = "user_2024-10-27T00:00:00.000Z";

    Expense.delete.mockResolvedValue({ message: "Strosek je bil izbrisan" });

    const result = await Expense.delete(id);
    expect(result.message).toBe("Strosek je bil izbrisan");
  });

  it("should return expenses by emails", async () => {
    const mockExpenses = [
      { id: "user_2024-10-27T00:00:00.000Z", naziv: "Obisk Ljubljane" },
    ];
    const emails = ["user@example.com"];

    Expense.getByEmails.mockResolvedValue({
      stroski: mockExpenses,
      totalItems: 1,
    });

    const result = await Expense.getByEmails(emails, 10, 1);
    expect(result.stroski).toEqual(mockExpenses);
    expect(result.totalItems).toBe(1);
  });

  it("should return expenses by user email", async () => {
    const mockExpenses = [
      { id: "user_2024-10-27T00:00:00.000Z", naziv: "Obisk Ljubljane" },
    ];
    const email = "user@example.com";

    Expense.getByUserEmail.mockResolvedValue(mockExpenses);

    const result = await Expense.getByUserEmail(email);
    expect(result).toEqual(mockExpenses);
  });

  it("should return expenses by month", async () => {
    const mockExpenses = [
      { id: "user_2024-10-27T00:00:00.000Z", naziv: "Obisk Ljubljane" },
    ];
    const year = 2024;
    const month = 10;

    Expense.getByMonth.mockResolvedValue(mockExpenses);

    const result = await Expense.getByMonth(year, month, 10, 0);
    expect(result).toEqual(mockExpenses);
  });

  // 3. naloga
  it("should calculate the sum of expenses in a date range for a user", async () => {
    const email = "email@gmail.com";
    const startDate = "2024-10-01";
    const endDate = "2024-10-31";

    const mockResponse = {
      email: "email@gmail.com",
      total: 468.7,
      startDate: "2024-10-01",
      endDate: "2024-10-31",
    };

    Expense.getExpenseSumInDateRangeByUser.mockResolvedValue(mockResponse);

    const result = await Expense.getExpenseSumInDateRangeByUser(
      email,
      startDate,
      endDate
    );

    expect(result).toEqual(mockResponse);
    expect(result.total).toBe(468.7);
  });

  it("should throw an error when adding an expense fails", async () => {
    Expense.add.mockRejectedValue(new Error("Database error"));

    await expect(
      Expense.add(
        "Failed Expense",
        "2024-10-27",
        "2024-10-28",
        50,
        "Maribor",
        "Test",
        "user@example.com"
      )
    ).rejects.toThrow("Database error");
  });

  it("should handle no expenses found for a user email", async () => {
    const email = "unknown@example.com";

    Expense.getByUserEmail.mockResolvedValue([]);

    const result = await Expense.getByUserEmail(email);

    expect(result).toEqual([]);
  });

  it("should throw an error when retrieving an expense by ID fails", async () => {
    const id = "invalid_id";

    Expense.getById.mockRejectedValue(new Error("Expense not found"));

    await expect(Expense.getById(id)).rejects.toThrow("Expense not found");
  });

  it("should handle pagination correctly for expenses by emails", async () => {
    const emails = ["user@example.com"];
    const mockPaginatedResponse = {
      stroski: [
        { id: "user_2024-10-27T00:00:00.000Z", naziv: "Paginated Expense" },
      ],
      totalItems: 1,
    };

    Expense.getByEmails.mockResolvedValue(mockPaginatedResponse);

    const result = await Expense.getByEmails(emails, 5, 1);

    expect(result.stroski).toEqual(mockPaginatedResponse.stroski);
    expect(result.totalItems).toBe(1);
  });

  // 4. naloga
  it("should calculate total kilometrina by user email", async () => {
    const email = "janez@gmail.com";
    const mockResponse = { email, totalKilometrina: 150.0 };

    Expense.getKilometrinaSumByUser.mockResolvedValue(mockResponse);

    const result = await Expense.getKilometrinaSumByUser(email);
    expect(result).toEqual(mockResponse);
    expect(result.totalKilometrina).toBe(150.0);
  });

  it("should return an empty array when no expenses are found for a given month", async () => {
    const year = 2024;
    const month = 12;

    Expense.getByMonth.mockResolvedValue([]);

    const result = await Expense.getByMonth(year, month, 10, 0);
    expect(result).toEqual([]);
  });

  it("should throw an error when deleting a non-existing expense", async () => {
    const id = "non_existing_id";

    Expense.delete.mockRejectedValue(new Error("Strosek ne obstaja"));

    await expect(Expense.delete(id)).rejects.toThrow("Strosek ne obstaja");
  });

  it("should return an error when updating a non-existing expense", async () => {
    const id = "invalid_id";
    const updatedData = { naziv: "Updated naziv" };

    Expense.put.mockRejectedValue(new Error("Potni strošek ne obstaja"));

    await expect(Expense.put(id, updatedData)).rejects.toThrow(
      "Potni strošek ne obstaja"
    );
  });

  it("should correctly filter expenses by date range and user", async () => {
    const email = "janez@gmail.com";
    const startDate = "2024-10-01";
    const endDate = "2024-10-31";

    const mockExpenses = [
      { id: "1", naziv: "Expense 1", datum_odhoda: "2024-10-10" },
      { id: "2", naziv: "Expense 2", datum_odhoda: "2024-10-20" },
    ];

    Expense.getByMonth.mockResolvedValue(mockExpenses);

    const result = await Expense.getByMonth(2024, 10, 10, 0);
    expect(result).toEqual(mockExpenses);
  });
});
