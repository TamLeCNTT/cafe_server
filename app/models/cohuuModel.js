const sql = require("./db.js");
let bcrypt = require('bcrypt')
// constructor
const CoHuu = function (cohuu) {
    this.cohuuId = cohuu.cohuuId;
    this.sokmngay = cohuu.sokmngay;
    this.sokmdem = cohuu.sokmdem;
    this.soxe = cohuu.soxe;
    this.lotrinh = cohuu.lotrinh;
    this.giaovien = cohuu.giaovien;
    this.ngay = cohuu.ngay;
};


CoHuu.create = (newcohuu, result) => {

    sql.query("INSERT INTO cohuu SET ?", newcohuu, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }


        result(null, { id: res.insertId, ...newcohuu });
    });



};
CoHuu.findbymonth = (id, result) => {
    sql.query(`SELECT * FROM cohuu c WHERE MONTH(STR_TO_DATE(c.ngay,'%Y-%m-%d')) like MONTH(STR_TO_DATE('${id}','%Y-%m-%d')) and YEAR(STR_TO_DATE(c.ngay,'%Y-%m-%d')) like YEAR(STR_TO_DATE('${id}','%Y-%m-%d'))`, (err, res) => {
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
CoHuu.findbyyear = (id, result) => {
    sql.query(`SELECT * FROM cohuu c WHERE  YEAR(STR_TO_DATE(c.ngay,'%Y-%m-%d')) like YEAR(STR_TO_DATE('${id}','%Y-%m-%d'))`, (err, res) => {
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
CoHuu.findbyday = (id, result) => {
    sql.query(`SELECT * FROM cohuu WHERE ngay like '${id}'`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res);
            return;
        }

        // not found cohuu with the id
        result({ kind: "not_found" }, null);
    });
};
CoHuu.findbythanday = (id, result) => {
    sql.query(`SELECT * FROM cohuu c WHERE MONTH(STR_TO_DATE(c.ngay,'%Y-%m-%d')) > MONTH(STR_TO_DATE('${id}','%Y-%m-%d')) or DATE(STR_TO_DATE(c.ngay,'%Y-%m-%d')) >= DATE(STR_TO_DATE('${id}','%Y-%m-%d'))`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res);
            return;
        }

        // not found cohuu with the id
        result({ kind: "not_found" }, null);
    });
};
CoHuu.findById = (id, result) => {
    sql.query(`SELECT * FROM cohuu WHERE cohuuId = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res[0]);
            return;
        }

        // not found cohuu with the id
        result({ kind: "not_found" }, null);
    });
};
CoHuu.findbyBan = (id, result) => {
    sql.query(`SELECT * FROM cohuu WHERE soban = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res);
            return;
        }

        // not found cohuu with the id
        result({ kind: "not_found" }, null);
    });
};

CoHuu.getAll = (emei, result) => {
    let query = "SELECT * FROM cohuu";

    if (emei) {
        query += ` WHERE cohuuId LIKE '%${emei}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

CoHuu.getAllgiaovien = result => {
    sql.query("SELECT * FROM emei WHERE giaovien=true", (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

CoHuu.updateById = (id, cohuu, result) => {
    sql.query(
        "UPDATE cohuu SET sokmdem = ?, sokmngay = ?, ngay = ?, giaovien = ?,soxe=?,lotrinh=? WHERE cohuuId = ?",
        [cohuu.sokmdem, cohuu.sokmngay, cohuu.ngay, cohuu.giaovien, cohuu.soxe, cohuu.lotrinh, id],
        (err, res) => {
            if (err) {

                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found cohuu with the id
                result({ kind: "not_found" }, null);
                return;
            }


            result(null, { id: id, ...cohuu });
        }
    );
};

CoHuu.remove = (id, result) => {
    sql.query("DELETE FROM cohuu WHERE cohuuId = ?", id, (err, res) => {
        if (err) {

            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found cohuu with the id
            result({ kind: "not_found" }, null);
            return;
        }


        result(null, res);
    });
};

CoHuu.removeAll = result => {
    sql.query("DELETE FROM cohuu", (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

module.exports = CoHuu;
