const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("../middleware");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");

const router = express.Router();

const signupBody = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Username alredy teken, try with anther user name",
    });
  }
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  //-----------creat a new account-------------

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

//----------------for signin---------------------//

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid user data",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});

//----------------for update user-----------------------

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);
  res.status(200).json({
    message: "Updated successfully",
  });
});

//--------------------filter user----------------------------------

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
