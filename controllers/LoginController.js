const { validateLogin } = require("../utils/validators.js");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma/client/index.js");

const login = async (req, res) => {
  try {
    const validation = validateLogin;
    const { email, password } = await validation.validateAsync(req.body);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const checkPassword = await bycrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: passwordUser, ...userWithoutPassword } = user;

    res.status(200).send({
      success: true,
      message: "Login successfully",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { login };
