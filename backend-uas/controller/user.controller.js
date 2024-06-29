const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    let { username, full_name, phone, email, password } = req.body;

    const validUsername = username.replace(/\s+/g, "").trim().toLowerCase();

    if (!username || !full_name || !phone || !password) {
      return res.json({
        status: false,
        msg: "Please filled out the form completely.",
      });
    }

    const userExist = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (userExist) {
      return res.json({
        status: false,
        msg: "Username already exist",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      x;
      const hashedPassword = bcrypt.hashSync(password, salt);
      password = hashedPassword;

      await prisma.users.create({
        data: {
          username: validUsername,
          full_name: full_name,
          phone: phone,
          email: email,
          password: password,
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

    if (!req.body.username | !req.body.password) {
      return res.json({
        status: false,
        msg: "Please filled out the form completely",
      });
    }

    if (userExist) {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        userExist.password
      );

      console.log(isPasswordCorrect);

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
