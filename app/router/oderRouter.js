module.exports = app => {
    const oder = require("../controller/oderController.js");

    var router = require("express").Router();
    router.get("/test", oder.test);
    // // Create a new Tutorial
    router.post("/add", oder.create);


    // // Retrieve all oder
    router.get("/all", oder.findAll);

    // // Retrieve all published oder
    // router.get("/published", oder.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", oder.findOne);
    router.get("/ban/:id", oder.findbyBan);
    // // Update a Tutorial with id
    router.put("/:id", oder.update);

    // // Delete a Tutorial with id
    router.delete("/:id", oder.delete);

    // // Delete all oder
    router.delete("/", oder.deleteAll);

    app.use('/oder', router);
};