const routes = require("express").Router()

const userController = require("../contollers/UserController")
const { route } = require("./RoleRoutes")
routes.get("/users",userController.getAllUsers)
routes.get("/user/:id",userController.getUserbyId)
routes.post("/user",userController.addUser)
routes.delete("/user/:id",userController.deleteUser)
routes.post("/login",userController.loginuser)
routes.post("/signup",userController.signup)

module.exports=routes