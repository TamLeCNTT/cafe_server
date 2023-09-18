const Tutorial = require("../models/cohuuModel.js");
exports.test = (req, res) => {

    res.send("hello1");

};

// Create and Save a new Tutorial
exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const cohuu = new Tutorial({
        soxe: req.body.soxe,
        sokmngay: req.body.sokmngay,
        sokmdem: req.body.sokmdem,
        lotrinh: req.body.lotrinh,
        giaovien: req.body.giaovien,
        ngay: req.body.ngay
    });

    // Save Tutorial in the database
    Tutorial.create(cohuu, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const emei = req.query.emei;

    Tutorial.getAll(emei, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cohuus."
            });
        else res.send(data);
    });
};
exports.findbymonth = (req, res) => {

    Tutorial.findbymonth(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cabin with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Cabin with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
exports.findbyyear = (req, res) => {

    Tutorial.findbyyear(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Cabin with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Cabin with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
exports.findbyday = (req, res) => {
    Tutorial.findbyday(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send([]);
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
exports.findbythanday = (req, res) => {
    Tutorial.findbythanday(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send([]);
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
// 
// Find a single Tutorial by Id
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};
exports.findbyBan = (req, res) => {
    Tutorial.findbyBan(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send([]);
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


// find all giaovien Tutorials
exports.findAllgiaovien = (req, res) => {
    Tutorial.getAllgiaovien((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cohuus."
            });
        else res.send(data);
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }



    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all cohuus."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};