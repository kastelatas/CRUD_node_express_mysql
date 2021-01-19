const express = require("express");
const userController = require("../controllers/userController.js");
const verify = require('../verifytoken');
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/postuser", verify, userController.postUser);
userRouter.get("/:id", userController.oneUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.patch("/:id", userController.updatePost);

module.exports = userRouter;