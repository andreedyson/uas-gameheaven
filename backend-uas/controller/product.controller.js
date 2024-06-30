const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { deleteImage } = require("../uploadconfig");

exports.insert = async (req, res) => {
  try {
    const { name, category, brand, price, description, stocks } = req.body;

    await prisma.products.create({
      data: {
        name: name,
        category: Number(category),
        brand: brand,
        description: description,
        price: Number(price),
        stocks: Number(stocks),
        image: req.file.filename,
      },
    });

    return res.json({
      status: true,
      msg: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      msg: "Something went wrong creating Product",
      error: error,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.products.findMany({
      include: {
        categories: true,
        brands: true,
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
      msg: "Something went wrong getting Product",
      error: error,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await prisma.products.findFirst({
      include: {
        categories: true,
        brands: true,
      },
      where: {
        id_product: Number(req.params.id),
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
      msg: "Something went wrong getting Product",
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { name, category, brand, price, description, stocks } = req.body;
    let image;

    if (req.file) {
      image = req.file.filename;
    }

    await prisma.products.update({
      where: {
        id_product: Number(req.params.id),
      },
      data: {
        name: name,
        category: Number(category),
        brand: brand,
        description: description,
        price: Number(price),
        stocks: Number(stocks),
        image: image,
      },
    });

    return res.json({
      status: true,
      msg: "Product edited successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong editing Product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id_product: Number(req.params.id),
      },
    });

    if (!product) {
      return res.json({
        status: false,
        msg: "Product Not Found",
      });
    }

    await prisma.products.delete({
      where: {
        id_product: Number(req.params.id),
      },
    });

    deleteImage(product.image);

    return res.json({
      status: true,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2003") {
      // Handle the foreign key constraint error
      return res.json({
        status: false,
        msg: "Cannot delete product. It is referenced in another table.",
      });
    } else {
      return res.json({
        status: false,
        msg: "Error deleting product data",
      });
    }
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const data = await prisma.products.findMany({
      where: {
        category: Number(req.params.category),
      },
      include: {
        categories: true,
        brands: true,
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
      msg: "Something went wrong",
      error: error,
    });
  }
};

exports.productsCount = async (req, res) => {
  try {
    const data = await prisma.products.count();

    if (!data) {
      return res.json({
        status: false,
        msg: "Total Products Data Not Found",
      });
    }

    return res.json({
      status: true,
      msg: "Request Success",
      total_products: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};
