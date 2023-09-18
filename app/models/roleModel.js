const sql = require("./db.js");

// constructor
const role = function (role) {
    this.roleId = role.roleId;
    this.name = role.name;

};

role.create = (newrole, result) => {
    sql.query("INSERT INTO role SET ?", newrole, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created role: ", { id: res.insertId, ...newrole });
        result(null, { id: res.insertId, ...newrole });
    });
};

role.findById = (id, result) => {
    sql.query(`SELECT * FROM role WHERE roleId = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found role: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found role with the id
        result({ kind: "not_found" }, null);
    });
};

role.getAll = (emei, result) => {
    let query = "SELECT * FROM role";

    if (emei) {
        query += ` WHERE roleId LIKE '%${emei}%'`;
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

role.getAllgiaovien = result => {
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

role.updateById = (id, role, result) => {
    sql.query(
        "UPDATE role SET name = ? WHERE roleId = ?",
        [role.emei, role.sdt, role.giaovien, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found role with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated role: ", { id: id, ...role });
            result(null, { id: id, ...role });
        }
    );
};

role.remove = (id, result) => {
    sql.query("DELETE FROM role WHERE roleId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found role with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted role with id: ", id);
        result(null, res);
    });
};

role.removeAll = result => {
    sql.query("DELETE FROM role", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} emei`);
        result(null, res);
    });
};

module.exports = role;
