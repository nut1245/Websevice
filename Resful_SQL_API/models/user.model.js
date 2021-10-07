const sql = require("./db");
//constructor
const User = function (user) {  //ใช้ arrow function ไม่สามารถกำหนด คอนสเต็คเตอร์ได้
    //Attributes
    this.UserID = user.UserID;
    this.Firstname = user.Firstname;
    this.Lastname = user.Lastname;
    this.Sex = user.Sex;
    this.Day = user.Day;
    this.Month = user.Month;
    this.Year = user.Year;
    this.PhoneMunber = user.PhoneMunber;
    this.Email = user.Email;
    this.Address = user.Address;
    this.Province = user.Province;
    this.District = user.District;
    this.postcode = user.postcode;
    this.imageurl = user.imageurl;
};

//Insert Data User
User.create = (newUser, result) => {
    //INSERT INTO user SET UserID , Firstname , Lastname , Sex ,.... Values ("1","Yannasit","Santiekachun","url")
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created restaurant:", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    })
};

//Get User byId
User.getById = (userId, result) => {
    //SELECT * FROM users where id = userId
    sql.query(`SELECT * FROM user WHERE UserID  = ${userId}`,
        (err, res) => {
            if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
                console.log("error ", err);
                result(err, null);
                return;
            }
            if (res.length) { //ถ้าหากเจอข้อมูล
                result(null, res[0]); //ส่งข้อมูล array ตำแหน่งที่ 1 กลับมา
                return;
            }
            //restaurant not found  with this Id
            result({ kind: "not_found" }, null);
        }
    );
};

//Get All User restaurantrant
User.get = (result) => {
    //SELECT * FROM user
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
            console.log("error ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

//Update user Data
User.updateById = (UserID, user, result) => {
    sql.query(
        "UPDATE user SET Firstname = ? ,Lastname = ?, Sex = ? , Day = ? , Month = ? , Year = ? , PhoneMunber = ? , Email = ? , Address = ?, Province = ?, District = ?, postcode = ? , imageurl = ? WHERE UserID  = ?",
        [user.Firstname, user.Lastname, user.Sex, user.Day, user.Month,
        user.Year, user.PhoneMunber, user.Email, user.Address, user.Province, 
        user.District,user.postcode, user.imageurl, UserID],
        (err, res) => {
            if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
                console.log("error ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) { //เช็คแถวที่อัพเดท
                result({ kind: "not_found" }, null)
                return;
            }
            //Restaurant data is updated
            result(null, { UserID: UserID, ...user });
        }
    );
};

//Delete user by Id
User.removeById = (UserID, result) => {
    //DELETE FROM restaurants WHERE id = ?
    sql.query("DELETE FROM user WHERE UserID = ?", UserID, (err, res) => {
        if (err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) { //เช็คแถวที่อัพเดท
            result({ kind: "not_found" }, null)
            return;
        }

        console.log("Delete restaurant with id : ", UserID);
        result(null, res);

    });
};

module.exports = User;