module.exports = app => {
    const category = require("../controller/categoryController.js");

    var router = require("express").Router();
    router.get("/test", category.test);
    // // Create a new Tutorial
    router.post("/add", category.create);

    // // Retrieve all category
    router.get("/all", category.findAll);

    // // Retrieve all published category
    // router.get("/published", category.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", category.findOne);

    // // Update a Tutorial with id
    router.put("/:id", category.update);

    // // Delete a Tutorial with id
    router.delete("/:id", category.delete);

    // // Delete all category
    router.delete("/", category.deleteAll);

    app.use('/category', router);
};