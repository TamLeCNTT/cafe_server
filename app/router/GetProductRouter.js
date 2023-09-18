module.exports = app => {
    const product = require("../controller/GetProductController.js");

    var router = require("express").Router();
    router.get("/test", product.test);
    // // Create a new Tutorial
    router.post("/add", product.create);


    // // Retrieve all product
    router.get("/all", product.findAll);

    // // Retrieve all published product
    // router.get("/published", product.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", product.findOne);


    // // Update a Tutorial with id
    router.put("/:id", product.update);

    // // Delete a Tutorial with id
    router.delete("/:id", product.delete);

    // // Delete all product
    router.delete("/", product.deleteAll);

    app.use('/getproduct', router);
};