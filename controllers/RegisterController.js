const { validateRegister } = require("../utils/validators.js");
const bycrypt = require("bcryptjs");

const prisma = require("../prisma/client/index.js");

const register = async (req, res) => {
  try {
    const validation = validateRegister;
    const { name, email, password } = await validation.validateAsync(req.body);

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).send({
      success: true,
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.details || error.message,
    });
  }
};

module.exports = { register };
