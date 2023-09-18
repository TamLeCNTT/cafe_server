const sql = require("./db.js");
let bcrypt = require('bcrypt')
// constructor
const Oder = function (oder) {
    this.oderId = oder.oderId;
    this.soban = oder.soban;
    this.trangthai = oder.trangthai;
    this.soluong = oder.soluong;
    this.productId = oder.productId;
    this.ngay = oder.ngay;
};


Oder.create = (newoder, result) => {

    sql.query("INSERT INTO oder SET ?", newoder, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }


        result(null, { id: res.insertId, ...newoder });
    });



};

Oder.findById = (id, result) => {
    sql.query(`SELECT * FROM oder WHERE oderId = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res[0]);
            return;
        }

        // not found oder with the id
        result({ kind: "not_found" }, null);
    });
};
Oder.findbyBan = (id, result) => {
    sql.query(`SELECT * FROM oder WHERE soban = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res);
            return;
        }

        // not found oder with the id
        result({ kind: "not_found" }, null);
    });
};

Oder.getAll = (emei, result) => {
    let query = "SELECT * FROM oder";

    if (emei) {
        query += ` WHERE oderId LIKE '%${emei}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

Oder.getAllgiaovien = result => {
    sql.query("SELECT * FROM emei WHERE giaovien=true", (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

Oder.updateById = (id, oder, result) => {
    sql.query(
        "UPDATE oder SET soban = ?, trangthai = ?, ngay = ?, productId = ?,soluong=? WHERE oderId = ?",
        [oder.soban, oder.trangthai, oder.ngay, oder.productId, oder.soluong, id],
        (err, res) => {
            if (err) {

                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found oder with the id
                result({ kind: "not_found" }, null);
                return;
            }


            result(null, { id: id, ...oder });
        }
    );
};

Oder.remove = (id, result) => {
    sql.query("DELETE FROM oder WHERE oderId = ?", id, (err, res) => {
        if (err) {

            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found oder with the id
            result({ kind: "not_found" }, null);
            return;
        }


        result(null, res);
    });
};

Oder.removeAll = result => {
    sql.query("DELETE FROM oder", (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

module.exports = Oder;
