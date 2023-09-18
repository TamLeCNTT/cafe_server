module.exports = app => {
    const odersave = require("../controller/odersaveController.js");

    var router = require("express").Router();
    router.get("/test", odersave.test);
    // // Create a new Tutorial
    router.post("/add", odersave.create);


    // // Retrieve all odersave
    router.get("/all", odersave.findAll);

    // // Retrieve all published odersave
    // router.get("/published", odersave.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", odersave.findOne);
    router.get("/ban/:id", odersave.findbyBan);
    router.get("/ngay/:id", odersave.findbyNgay);
    // // Update a Tutorial with id
    router.put("/:id", odersave.update);

    // // Delete a Tutorial with id
    router.delete("/:id", odersave.delete);
    router.get("/month/:id", odersave.months);
    router.get("/year/:id", odersave.year);
    // // Delete all odersave
    router.delete("/", odersave.deleteAll);

    app.use('/odersave', router);
};