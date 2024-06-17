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

    if (product.stocks === 0) {
      return res.json({
        status: false,
        msg: "Product is out of stock",
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
    console.log(error);
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

exports.getById = async (req, res) => {
  try {
    const data = await prisma.transactions.findUnique({
      where: {
        id_transactions: Number(req.params.id),
      },
      include: {
        users: {
          select: {
            username: true,
            full_name: true,
            email: true,
            phone: true,
            role: true,
          },
        },
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

exports.edit = async (req, res) => {
  try {
    const { username, productId, quantity, date, status } = req.body;
    let total = 0;

    const newQty = Number(quantity);

    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    const product = await prisma.products.findUnique({
      where: {
        id_product: Number(productId),
      },
    });

    const transaction = await prisma.transactions.findUnique({
      where: {
        id_transactions: Number(req.params.id),
      },
    });

    if (!user) {
      return res.json({
        status: false,
        msg: "User does not exist",
      });
    }

    if (!product) {
      return res.json({
        status: false,
        msg: "Product not found",
      });
    }

    if (!transaction) {
      return res.json({
        status: false,
        msg: "Transaction not found",
      });
    }

    if (newQty === 0) {
      return res.json({
        status: false,
        msg: "Quantity can't be 0",
      });
    }

    if (newQty > product.stocks + transaction.quantity) {
      return res.json({
        status: false,
        msg: `You can only add ${product.stocks} quantity to the transaction`,
      });
    }

    total = product.price * newQty;

    // Check if old quantity is the same as the new quantity
    const qtyDifference = newQty - transaction.quantity;

    if (qtyDifference !== 0) {
      // Quantity changed, update product stocks
      await prisma.products.update({
        where: {
          id_product: Number(productId),
        },
        data: {
          stocks:
            qtyDifference > 0
              ? { decrement: qtyDifference }
              : { increment: -qtyDifference },
        },
      });
    }

    // Update the transaction regardless of whether the quantity changed
    await prisma.transactions.update({
      where: {
        id_transactions: Number(req.params.id),
      },
      data: {
        username: username,
        id_product: Number(productId),
        quantity: newQty,
        total_price: total,
        date: new Date(date),
        status: status,
      },
    });

    return res.json({
      status: true,
      msg: "Transaction edited successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong updating Transaction",
      error: error,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id_transactions: Number(req.params.id),
      },
    });

    if (!transaction) {
      return res.json({
        status: false,
        msg: "Transaction Not Found",
      });
    }

    await prisma.products.update({
      where: {
        id_product: transaction.id_product,
      },
      data: {
        stocks: {
          increment: transaction.quantity,
        },
      },
    });

    await prisma.transactions.delete({
      where: {
        id_transactions: Number(req.params.id),
      },
    });

    return res.json({
      status: true,
      msg: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong deleting Transaction",
    });
  }
};

exports.highest = async (req, res) => {
  try {
    const data = await prisma.transactions.findMany({
      where: {
        status: { not: "Cancelled" },
      },
      orderBy: {
        total_price: "desc",
      },
      take: 5,
      include: {
        products: true,
      },
    });

    return res.json({
      status: true,
      msg: "Request Success",
      results: data,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      msg: "Something went wrong getting Transaction",
      error: error,
    });
  }
};

exports.transactionsCount = async (req, res) => {
  try {
    const data = await prisma.transactions.count();

    if (!data) {
      return res.json({
        status: false,
        msg: "Total transactions Data Not Found",
      });
    }

    return res.json({
      status: true,
      msg: "Request Success",
      total_transactions: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};
