const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/", homeController.index);
homeRouter.get("/post/:id", homeController.single);
homeRouter.get("/add-post", homeController.add_postPage);
homeRouter.get("/edit-post/:id", homeController.updateGetPost);
homeRouter.put("/edit-post/:id", homeController.updatePost);
homeRouter.post("/add-post", homeController.add_post);
homeRouter.post("/delete/:id", homeController.deletePost);
homeRouter.post("/upload", homeController.upload);
homeRouter.post("/create", homeController.profile);

module.exports = homeRouter;