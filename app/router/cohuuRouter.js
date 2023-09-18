module.exports = app => {
    const cohuu = require("../controller/cohuuController.js");

    var router = require("express").Router();
    router.get("/test", cohuu.test);
    // // Create a new Tutorial
    router.post("/add", cohuu.create);


    // // Retrieve all cohuu
    router.get("/all", cohuu.findAll);
    router.get("/ngay/:id", cohuu.findbyday);
    router.get("/honngay/:id", cohuu.findbythanday);
    router.get("/thang/:id", cohuu.findbymonth);
    router.get("/nam/:id", cohuu.findbyyear);
    // // Retrieve all published cohuu
    // router.get("/published", cohuu.findAllPublished);

    // // Retrieve a single Tutorial with id
    router.get("/:id", cohuu.findOne);
    router.get("/ban/:id", cohuu.findbyBan);
    // // Update a Tutorial with id
    router.put("/:id", cohuu.update);

    // // Delete a Tutorial with id
    router.delete("/:id", cohuu.delete);

    // // Delete all cohuu
    router.delete("/", cohuu.deleteAll);

    app.use('/cohuu', router);
};