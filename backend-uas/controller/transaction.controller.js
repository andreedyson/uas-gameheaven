const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.insert = async (req, res) => {
  try {
    const { username, productId, quantity, date, status } = req.body;
    let total = 0;

    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.json({
        status: false,
        msg: "User does not exist",
      });
    }

    const product = await prisma.products.findUnique({
      where: {
        id_product: Number(productId),
      },
    });

    if (!product) {
      return res.json({
        status: false,
        msg: "Product not found",
      });
    }

    if (Number(quantity) > product.stocks) {
      return res.json({
        status: false,
        msg: `Quantity should be less than ${product.stocks} item`,
      });
    }

    total = product.price * Number(quantity);

    await prisma.transactions.create({
      data: {
        username: username,
        id_product: Number(productId),
        quantity: Number(quantity),
        total_price: total,
        date: new Date(date),
        status: status,
      },
    });

    await prisma.products.update({
      where: {
        id_product: Number(productId),
      },
      data: {
        stocks: {
          decrement: Number(quantity),
        },
      },
    });

    return res.json({
      status: true,
      msg: "Transaction added successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong creating Transaction",
      error: error,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.transactions.findMany({
      include: {
        users: true,
        products: true,
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
      msg: "Something went wrong getting Transaction",
      error: error,
    });
  }
};
