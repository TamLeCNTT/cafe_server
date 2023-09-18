const sql = require("./db.js");
let bcrypt = require('bcrypt')
// constructor
const user = function (user) {
    this.userId = user.userId;
    this.username = user.username;
    this.password = user.password;
    this.roleId = user.roleId;
};


user.create = (newuser, result) => {
    bcrypt.hash(newuser.password, 10, async (err, hash) => {
        //Mã hóa mật khẩu trước khi lưu vào db
        if (err) { return next(err); }

        newuser.password = hash
        sql.query("INSERT INTO user SET ?", newuser, (err, res) => {
            if (err) {

                result(err, null);
                return;
            }


            result(null, { id: res.insertId, ...newuser });
        });
    })


};
user.login = (newuser, result) => {

    sql.query(`SELECT * FROM user WHERE username='${newuser.username}'`, async (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(null);
            return;
        }
        else {
            if (res[0] != null) {
                let comparePass = await bcrypt.compare(newuser.password, res[0].password);

                if (comparePass) {
                    result(null, res[0]);
                }
                else
                    result(null)
            }
            else {
                result(null)
            }

        }


    });



};

user.findById = (id, result) => {
    sql.query(`SELECT * FROM user WHERE userId = ${id}`, (err, res) => {
        if (err) {

            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

user.getAll = (emei, result) => {
    let query = "SELECT * FROM user";

    if (emei) {
        query += ` WHERE userId LIKE '%${emei}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

user.getAllgiaovien = result => {
    sql.query("SELECT * FROM emei WHERE giaovien=true", (err, res) => {
        if (err) {

            result(null, err);
            return;
        }


        result(null, res);
    });
};

user.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET username = ?, password = ?, roleId = ? WHERE userId = ?",
        [user.emei, user.sdt, user.giaovien, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

user.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE userId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

user.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} emei`);
        result(null, res);
    });
};

module.exports = user;
