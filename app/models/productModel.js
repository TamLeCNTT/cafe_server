const sql = require("./db.js");
let bcrypt = require('bcrypt')
// constructor
const Product = function (product) {
    this.productId = product.productId;
    this.name = product.name;
    this.price = product.price;
    this.SoLuong = product.SoLuong;
    this.categoryId = product.categoryId;
};


Product.create = (newproduct, result) => {

    sql.query("INSERT INTO product SET ?", newproduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created product: ", { id: res.insertId, ...newproduct });
        result(null, { id: res.insertId, ...newproduct });
    });



};

Product.findById = (id, result) => {
    sql.query(`SELECT * FROM product WHERE productID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.getAll = (emei, result) => {
    let query = "SELECT * FROM product";

    if (emei) {
        query += ` WHERE productId LIKE '%${emei}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("emei: ", res);
        result(null, res);
    });
};

Product.getAllgiaovien = result => {
    sql.query("SELECT * FROM emei WHERE giaovien=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("emei: ", res);
        result(null, res);
    });
};

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE product SET name = ?, price = ?, SoLuong = ?, categoryId = ? WHERE productID = ?",
        [product.name, product.price, product.SoLuong, product.categoryId, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found product with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
        }
    );
};

Product.remove = (id, result) => {
    sql.query("DELETE FROM product WHERE productId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found product with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted product with id: ", id);
        result(null, res);
    });
};

Product.removeAll = result => {
    sql.query("DELETE FROM product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} emei`);
        result(null, res);
    });
};

module.exports = Product;
