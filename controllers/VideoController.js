const { validateVideo } = require("../utils/validators.js");

const prisma = require("../prisma/client/index.js");

const all = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      where: {
        user_id: Number(req.userId),
      },
      select: {
        id: true,
        name: true,
        video_id: true,
        user_id: true,
        category: true,
      },
    });

    res.status(200).send({
      success: true,
      message: "Get all videos",
      videos,
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
    const validation = validateVideo;
    const { name, video_id, category_id } = await validation.validateAsync(
      req.body
    );

    const video = await prisma.video.create({
      data: {
        name,
        video_id,
        user_id: req.userId,
        category_id,
      },
    });

    res.status(200).send({
      success: true,
      message: "Video created successfully",
      data: video,
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

    const video = await prisma.video.findUnique({
      where: {
        id: Number(id),
        user_id: Number(req.userId),
      },
      select: {
        id: true,
        name: true,
        video_id: true,
        user_id: true,
        category: true,
      },
    });

    res.status(200).send({
      success: true,
      message: `Get video by id ${id}`,
      data: video,
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
    const validation = validateVideo;
    const { name, video_id, category_id } = await validation.validateAsync(
      req.body
    );

    const { id } = req.params;

    const video = await prisma.video.update({
      where: {
        id: Number(id),
        user_id: Number(req.userId),
      },
      data: {
        name,
        video_id,
        category_id,
      },
    });

    res.status(200).send({
      success: true,
      message: `Update video successfully`,
      data: video,
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

    await prisma.video.delete({
      where: {
        id: Number(id),
        user_id: Number(req.userId),
      },
    });

    res.status(200).send({
      success: true,
      message: `Delete video successfully`,
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
