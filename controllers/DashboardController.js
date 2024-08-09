const prisma = require("../prisma/client/index.js");

const totalData = async (req, res) => {
  try {
    const [videoCount, categoryCount, userCount] = await prisma.$transaction([
      prisma.video.aggregate({
        _count: true,
        where: {
          user_id: Number(req.userId),
        },
      }),
      prisma.category.aggregate({
        _count: true,
      }),
      prisma.user.aggregate({
        _count: true,
      }),
    ]);

    res.status(200).send({
      success: true,
      message: "Get total data",
      total: {
        video: videoCount._count,
        category: categoryCount._count,
        user: userCount._count,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  totalData,
};
