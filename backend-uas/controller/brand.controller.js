const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    const { id_brand, name, keterangan } = req.body;

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
        keterangan: keterangan,
      },
    });

    return res.json({
      status: true,
      msg: "Brand added successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      status: false,
      msg: "Something went wrong creating Brand",
      error: error.message,
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
    const { id_brand, name, keterangan } = req.body;
    await prisma.brands.update({
      data: {
        name: name,
        keterangan: keterangan,
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
    console.log(error);
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
    if (error.code === "P2003") {
      // Handle the foreign key constraint error
      return res.json({
        status: false,
        msg: "Cannot delete brand. It is referenced in another table.",
      });
    } else {
      return res.json({
        status: false,
        msg: "Error deleting brand data",
      });
    }
  }
};

exports.brandsCount = async (req, res) => {
  try {
    const data = await prisma.brands.count();

    if (!data) {
      return res.json({
        status: false,
        msg: "Total Brands Data Not Found",
      });
    }

    return res.json({
      status: true,
      msg: "Request Success",
      total_brands: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};
