module.exports = app => {
    const user = require("../controller/userController.js");

    var router = require("express").Router();
    router.get("/test", user.test);
    // // Create a new Tutorial
    router.post("/add", user.create);
    router.post("/login", user.login);

    // // Retrieve all user
    router.get("/all", user.findAll);

    // // Retrieve all published user
    // router.get("/published", user.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", user.findOne);

    // // Update a Tutorial with id
    router.put("/:id", user.update);

    // // Delete a Tutorial with id
    router.delete("/:id", user.delete);

    // // Delete all user
    router.delete("/", user.deleteAll);

    app.use('/user', router);
};