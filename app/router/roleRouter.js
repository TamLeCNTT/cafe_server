module.exports = app => {
    const role = require("../controller/roleController.js");

    var router = require("express").Router();
    router.get("/test", role.test);
    // // Create a new Tutorial
    router.post("/add", role.create);

    // // Retrieve all role
    router.get("/all", role.findAll);

    // // Retrieve all published role
    // router.get("/published", role.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", role.findOne);

    // // Update a Tutorial with id
    router.put("/:id", role.update);

    // // Delete a Tutorial with id
    router.delete("/:id", role.delete);

    // // Delete all role
    router.delete("/", role.deleteAll);

    app.use('/role', router);
};