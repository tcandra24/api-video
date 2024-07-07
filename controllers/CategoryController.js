const { validateCategory } = require("../utils/validators.js");

const prisma = require("../prisma/client/index.js");

const all = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).send({
      success: true,
      message: "Get all categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const store = async (req, res) => {
  try {
    const validation = validateCategory;
    const { name } = await validation.validateAsync(req.body);

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(200).send({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.details || error.message,
    });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).send({
      success: true,
      message: `Get category by id ${id}`,
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const validation = validateCategory;
    const { name } = await validation.validateAsync(req.body);

    const { id } = req.params;

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    res.status(200).send({
      success: true,
      message: `Update category successfully`,
      data: category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.details || error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).send({
      success: true,
      message: `Delete category successfully`,
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
  store,
  show,
  update,
  destroy,
};
