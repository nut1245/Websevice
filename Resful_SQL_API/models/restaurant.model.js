const sql = require("./db");
//constructor
const Restaurant = function (restaurant){  //ใช้ arrow function ไม่สามารถกำหนด คอนสเต็คเตอร์ได้
    //Attributes
    this.id = restaurant.id;
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.imageurl = restaurant.imageurl;
};

//Method insert Data
Restaurant.create = (newRestaurant, result) =>{
    //INSERT INTO restaurants SET id, name , type ,imageurl Values ("1","KFC","FastFood","url")
    sql.query("INSERT INTO restaurants SET ?",newRestaurant,(err, res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;
        }
        console.log("created restaurant:",{id:res.insertId, ...newRestaurant});
        result(null,{ id: res.insertId, ...newRestaurant});
    })
};

//Get data byId
Restaurant.getById = (restaurantId, result) =>{
    //SELECT * FROM restaurants where id = restaurantId
    sql.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`,
    (err, res)=>{
        if(err){  //ถ้ามี error ค่าข้อมูลจะว่าง
            console.log("error ",err);
            result(err, null);
            return;
        }
        if(res.length){ //ถ้าหากเจอข้อมูล
            result(null, res[0]); //ส่งข้อมูล array ตำแหน่งที่ 1 กลับมา
            return;
        }
        //restaurant not found  with this Id
        result({kind: "not_found"}, null);
        }
    );
};

//Get All restaurantrant
Restaurant.getAll = (result ) =>{
    //SELECT * FROM restaurants
    sql.query("SELECT * FROM restaurants", (err, res)=>{
        if(err){  //ถ้ามี error ค่าข้อมูลจะว่าง
            console.log("error ",err);
            result(err, null);
            return;
        }
        result(null ,res);
    });
};

//Update Restaurant Data
Restaurant.updateById = (id, restaurant,result) =>{
//UPDATE restaurant SET name = "name" ,type = "type", imageurl = "imageurl" WHERE id = "id"
sql.query(
    "UPDATE restaurants SET name = ? ,type = ?, imageurl = ? WHERE id = ?",
    [restaurant.name, restaurant.type, restaurant.imageurl, id],
    (err,res)=>{
        if(err){  //ถ้ามี error ค่าข้อมูลจะว่าง
            console.log("error ",err);
            result(err, null);
            return;
        }

        if(res.affectedRows == 0){ //เช็คแถวที่อัพเดท
            result({ kind: "not_found"}, null)
            return;
        }
        //Restaurant data is updated
        result(null, {id:id, ...restaurant });
        }
    );
};

//Delete restaurant by Id
Restaurant.removeById = (id,result) =>{
//DELETE FROM restaurants WHERE id = ?
sql.query("DELETE FROM restaurants WHERE id = ?", id , (err, res)=>{
    if(err){
        console.log("error ",err);
            result(err, null);
            return;
    }
    if(res.affectedRows == 0){ //เช็คแถวที่อัพเดท
        result({ kind: "not_found"}, null)
        return;
    }

    console.log("Delete restaurant with id : ", id);
    result(null, res);

});
};

Restaurant.removeAll = () =>{

};

module.exports = Restaurant;