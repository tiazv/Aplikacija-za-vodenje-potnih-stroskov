const UserController = require("../controllers/userController");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe("dodajUporabnika", () => {
  it("should return a 400 error if required fields are missing", async () => {
    const req = {
      body: {
        ime: "Janez",
        priimek: "Novak",
        email: "janez.novak@gmail.com",
        tip: "delavec"
      },
    };

    const res = mockResponse();

    await UserController.dodajUporabnika(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Vsa polja morajo biti izpolnjena",
    });
  });

  it("should hash the password and call User.add when all fields are present", async () => {
    const req = {
      body: {
        ime: "Janez",
        priimek: "Novak",
        email: "janez.novak@gmail.com",
        geslo: "password123",
        tip: "delavec",
      },
    };

    const res = mockResponse();

    const hashedPassword = "hashedpassword123";
    jest.spyOn(bcrypt, "hash").mockResolvedValue(hashedPassword);
    jest.spyOn(User, "add").mockResolvedValue({
      message: "Uspešna registracija",
      uporabnik: { ime: "Janez", priimek: "Novak", email: "janez.novak@gmail.com", geslo: hashedPassword, tip: "delavec" },
    });

    await UserController.dodajUporabnika(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(User.add).toHaveBeenCalledWith("Janez", "Novak", "janez.novak@gmail.com", hashedPassword, "delavec");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      uporabnik: {
        message: "Uspešna registracija",
        uporabnik: { ime: "Janez", priimek: "Novak", email: "janez.novak@gmail.com", geslo: hashedPassword, tip: "delavec" },
      },
    });
  });
});
