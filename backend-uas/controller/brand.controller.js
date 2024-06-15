const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    const { id_brand, name } = req.body;

    const brandExist = await prisma.brands.findUnique({
      where: {
        id_brand: id_brand,
      },
    });

    if (brandExist) {
      return res.json({
        status: false,
        msg: "Brand already exist",
      });
    }

    await prisma.brands.create({
      data: {
        id_brand: id_brand.toUpperCase(),
        name: name,
      },
    });

    return res.json({
      status: true,
      msg: "Brand added successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong creating Brand",
      error: error,
    });
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await prisma.brands.findMany();

    return res.json({
      status: true,
      msg: "Request Success",
      results: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong getting Brand",
      error: error,
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id_brand, name } = req.body;
    await prisma.brands.update({
      data: {
        name: name,
      },
      where: {
        id_brand: id_brand,
      },
    });

    return res.json({
      status: true,
      msg: "Brand edited successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong editing Brand",
      error: error,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { id_brand } = req.body;
    await prisma.brands.delete({
      where: {
        id_brand: id_brand,
      },
    });

    return res.json({
      status: true,
      msg: "Brand deleted successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong deleting Brand",
      error: error,
    });
  }
};
