const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const data = req.body;

    const userExist = await prisma.users.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userExist) {
      return res.json({
        status: false,
        msg: "Username already exist",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(data.password, salt);
      data.password = hashedPassword;

      await prisma.users.create({
        data: {
          ...data,
          username: data.username.toLowerCase(),
        },
      });

      return res.json({
        status: true,
        msg: "Registration successful",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const userExist = await prisma.users.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (userExist) {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        userExist.password
      );

      if (isPasswordCorrect) {
        const data = {
          username: userExist.username,
          full_name: userExist.full_name,
          email: userExist.email,
          role: userExist.role,
        };

        return res.json({
          status: true,
          msg: "Login Successful",
          results: data,
        });
      } else {
        return res.json({
          status: false,
          msg: "Incorrect Password",
        });
      }
    } else {
      return res.json({
        status: false,
        msg: "Username doesn't exist",
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.users.findMany({
      select: {
        username: true,
        full_name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    if (!data) {
      return res.json({
        status: false,
        msg: "Users Data Not Found",
      });
    }

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

exports.usersCount = async (req, res) => {
  try {
    const data = await prisma.users.count({
      where: {
        role: 2,
      },
    });

    if (!data) {
      return res.json({
        status: false,
        msg: "Total Users Data Not Found",
      });
    }

    return res.json({
      status: true,
      msg: "Request Success",
      total_users: data,
    });
  } catch (error) {
    return res.json({
      status: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};
