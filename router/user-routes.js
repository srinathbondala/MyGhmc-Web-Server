const express=require("express");
const{ houseregister,driverregister,adminregister}=require("../controllers/registration-controllers")
const{userlogin,adminlogin,driverlogin,verifyToken,getUser,refreshToken }=require("../controllers/login-controllers")
const router=express.Router();

router.post("/house/register",houseregister);
router.post("/driver/register",driverregister);
router.post("/admin/register",adminregister);
router.post("/house/login",userlogin,verifyToken,getUser);
router.post("/house/refresh",verifyToken,getUser);
module.exports =router;