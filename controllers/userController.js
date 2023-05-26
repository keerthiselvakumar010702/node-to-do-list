const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const { queryExecuter }= require("../utils/connection")

const signUp=async(req,res,next)=>{
   const {id,email,password,phone,username}=req.body;
   const newUser={
    id,
    email,
    password,
    phone,
    username,
   };

   try{
    let sql=`select * from user where id=?`;
    let values=req.body.id;
    console.log(values);
    const [result]=await queryExecuter(sql,values);
    console.log(result);

    if(result.length!=0){
        res.send({
            message : "User already exists! Try login",
            data:result,
        });
    }else{
        res.send({
            message:"New user",
        });
        next();
        console.log("user created");
    }
   }catch(error){
    new errorHandler(401,false,error.message,{},res);
   }
};

const login=async (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    const newUser={
        email,
        password
    };
    let token;
    try{
        if(email && password){
            token = jwt.sign(
                { password: password , email: email },
                "secretkey",
                { expiresIn: "24h" }
              );
            console.log(token);
        }else{
            res.send({
                message:"details not provided"
              })
        }
    }catch(error){
        new errorHandler(401,false,error.message,{},res)
    }
    res.status(201).json({
        success:true,
        data:{email:newUser.email,password:newUser.password,token:token},
    });
}

const create=async(req,res)=>{
    try{
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const username = req.body.username;

        bcrypt.hash(password,10,async(err,hash)=>{
            let sql="insert into user (id,email,password,phone,username) values (?,?,?,?,?)";
            let values=[id,email,hash,phone,username];
            const[result]=await queryExecuter(sql,values);
          //  res.send(result);
        });
    }catch(error){
        new errorHandler(401,false,error.message,{},res)
    }

};

module.exports={login,signUp,create};