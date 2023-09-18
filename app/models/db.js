var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csdl_2"
});






con.connect(function (err) {
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    //cabin
    // var cabin = "CREATE TABLE cabin (cabinId INT AUTO_INCREMENT PRIMARY KEY,giaovien VARCHAR(50) NOT NULL,songuoi INT,buoi INT,ngay DATE);";
    // con.query(cabin, function (err) {
    //     if (err) throw err;
    //     console.log('Tao cabin thanh cong');
    // });
    // var product = "CREATE TABLE role (roleId INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL);";
    // con.query(product, function (err) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });

    // var categories = "CREATE TABLE user (userId INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(50) NOT NULL,password VARCHAR(250) NOT NULL, roleId INT NOT NULL, FOREIGN KEY (roleId) REFERENCES role(roleId));";
    // con.query(categories, function (err, res) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });
    // var product = "CREATE TABLE product (productID INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,price INT,SoLuong INT,categoryId INT);";
    // con.query(product, function (err) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });

    // var oder = "CREATE TABLE oder (oderId INT AUTO_INCREMENT PRIMARY KEY,soban INT,trangthai INT,soluong INT,productId INT,ngay VARCHAR(10) );";
    // con.query(oder, function (err) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });
    // var odersave = "CREATE TABLE odersave (odersaveId INT AUTO_INCREMENT PRIMARY KEY,soban INT,soluong INT,productId INT,ngay VARCHAR(10) );";
    // con.query(odersave, function (err) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });
    // var getproduct = "CREATE TABLE getproduct (getproductId INT AUTO_INCREMENT PRIMARY KEY,price REAL,soluong INT,productId INT,ngay VARCHAR(10) );";
    // con.query(getproduct, function (err) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });
    // console.log("Connected!");
    // var cohuu = "CREATE TABLE cohuu (cohuuId INT AUTO_INCREMENT PRIMARY KEY,sokmdem REAL,sokmngay REAL,soxe VARCHAR(10),giaovien VARCHAR(255),lotrinh INT,ngay VARCHAR(10) );";
    // con.query(cohuu, function (err) {
    //     if (err) throw err;
    //     console.log('Tao product thanh cong');
    // });
    // console.log("Connected!");
});

module.exports = con

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('csdl_2', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

// const connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// connectDB();