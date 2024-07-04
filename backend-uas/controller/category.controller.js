const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    const { name } = req.body;
    await prisma.categories.create({
      data: {
        name: name,
      },
    });

    return res.json({
      status: true,
      msg: "Category added successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong creating Category",
      error: error,
    });
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await prisma.categories.findMany({});

    return res.json({
      status: true,
      msg: "Request Success",
      results: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong getting Category",
      error: error,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await prisma.categories.findUnique({
      where: {
        id_category: Number(req.params.id),
      },
    });

    return res.json({
      status: true,
      msg: "Request Success",
      results: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong getting Category",
      error: error,
    });
  }
};

exports.edit = async (req, res) => {
  try {
    await prisma.categories.update({
      data: req.body,
      where: {
        id_category: Number(req.params.id),
      },
    });

    return res.json({
      status: true,
      msg: "Category edited successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong editing Category",
      error: error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await prisma.categories.delete({
      where: {
        id_category: Number(req.params.id),
      },
    });

    return res.json({
      status: true,
      msg: "Category deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2003") {
      // Handle the foreign key constraint error
      return res.json({
        status: false,
        msg: "Cannot delete category. It is referenced in another table.",
      });
    } else {
      return res.json({
        status: false,
        msg: "Error deleting category data",
      });
    }
  }
};
