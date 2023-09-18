const sql = require("./db.js");
let bcrypt = require('bcrypt')
// constructor
const Oder = function (odersave) {
    this.odersaveId = odersave.odersaveId;
    this.soban = odersave.soban;

    this.soluong = odersave.soluong;
    this.productId = odersave.productId;
    this.ngay = odersave.ngay;
};


Oder.create = (newodersave, result) => {

    sql.query("INSERT INTO odersave SET ?", newodersave, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }


        result(null, { id: res.insertId, ...newodersave });
    });



};

Oder.findById = (id, result) => {
    sql.query(`SELECT * FROM odersave WHERE odersaveId = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res[0]);
            return;
        }

        // not found odersave with the id
        result({ kind: "not_found" }, null);
    });
};
Oder.months = (id, result) => {
    sql.query(`SELECT * FROM odersave c WHERE MONTH(STR_TO_DATE(c.ngay,'%Y-%m-%d')) like MONTH(STR_TO_DATE('${id}','%Y-%m-%d')) and YEAR(STR_TO_DATE(c.ngay,'%Y-%m-%d')) like YEAR(STR_TO_DATE('${id}','%Y-%m-%d'))`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found cabin with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted cabin with id: ", id);
        result(null, res);
    });
};
Oder.year = (id, result) => {
    sql.query(`SELECT * FROM odersave c WHERE  YEAR(STR_TO_DATE(c.ngay,'%Y-%m-%d')) like YEAR(STR_TO_DATE('${id}','%Y-%m-%d'))`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found cabin with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted cabin with id: ", id);
        result(null, res);
    });
};
Oder.findbyNgay = (id, result) => {
    sql.query(`SELECT * FROM odersave WHERE ngay like '${id}'`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res);
            return;
        }

        // not found odersave with the id
        result({ kind: "not_found" }, null);
    });
};
Oder.findbyBan = (id, result) => {
    sql.query(`SELECT * FROM odersave WHERE soban = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res);
            return;
        }

        // not found odersave with the id
        result({ kind: "not_found" }, null);
    });
};
Oder.getAll = (emei, result) => {
    let query = "SELECT * FROM odersave";

    if (emei) {
        query += ` WHERE odersaveId LIKE '%${emei}%'`;
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

Oder.updateById = (id, odersave, result) => {
    sql.query(
        "UPDATE odersave SET soban = ?, ngay = ?, productId = ?,soluong=? WHERE odersaveId = ?",
        [odersave.soban, odersave.ngay, odersave.productId, odersave.soluong, id],
        (err, res) => {
            if (err) {

                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found odersave with the id
                result({ kind: "not_found" }, null);
                return;
            }


            result(null, { id: id, ...odersave });
        }
    );
};

Oder.remove = (id, result) => {
    sql.query("DELETE FROM odersave WHERE odersaveId = ?", id, (err, res) => {
        if (err) {

            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found odersave with the id
            result({ kind: "not_found" }, null);
            return;
        }


        result(null, res);
    });
};

Oder.removeAll = result => {
    sql.query("DELETE FROM odersave", (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

module.exports = Oder;
