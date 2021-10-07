const express = require('express');
const router = express.Router();
const User = require("../models/user.model");

//Create a User restaurant
// http://localhost:5000/apis/Users
router.post("/users",(req,res) =>{
    const newUser = new User({
        Firstname:req.body.Firstname,
        Lastname:req.body.Lastname,
        Sex:req.body.Sex,
        Day:req.body.Day,
        Month:req.body.Month,
        Year:req.body.Year,
        PhoneMunber:req.body.PhoneMunber,
        Email:req.body.Email,
        Address:req.body.Address,
        Province:req.body.Province,
        District:req.body.District,
        postcode:req.body.postcode,
        imageurl:req.body.imageurl,
    });

    //Save to database
    User.create(newUser,(err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User restaurant"
            })
        else res.send(data);
    })
    
});

//Get user restaurant by ID
// http://localhost:5000/apis/Users/1
router.get('/users/:id', (req,res)=>{
    const userId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    User.getById(userId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `User not found with this id ${userId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error retriveving with this id " + userId,
            })
            }
        }
        else
        {
            res.send(data);
        }
    });
});

//Get All User restaurant
// http://localhost:5000/apis/Users
router.get('/users',(req,res) => {
    User.get((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Come err occurred while retrieving user restaurants",
            });
        }
        else{
            res.send(data);
        }
    });
});

//Updata user Data
// http://localhost:5000/apis/Users/1
router.put("/users/:id",(req,res)=>{
    const userId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){//เช็คค่าว่าง
        res.status(400).send({
            message : "Content can not empty"
        });
    }
    User.updateById(userId, new User(req.body), (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User not found with this id ${userId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error updating user data with this id " + userId,
            });
            }
        }
        else
        {
            res.send(data);
        }
    });
});

//Delete restaurant by Id
// http://localhost:5000/apis/Users/1
router.delete("/users/:id", (req,res)=>{
    const userId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    User.removeById(userId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `User not found with this id ${userId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error deleting user data with this id " + userId,
            });
            }
        }
        else
        {
            res.send({message: "User is deleted successfully"});
        }
    })
})

module.exports = router;