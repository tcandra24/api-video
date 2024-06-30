const prisma = require("../prisma/client/index.js");

const all = async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        email: "asc",
      },
    });

    res.status(200).send({
      success: true,
      message: "Get all users",
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  all,
};
