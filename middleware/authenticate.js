const jwt = require("jsonwebtoken");
const express=require("express");

const getme=async function (req, res,next){

    try{
      let token = req.headers.authorization.split(' ')[1];
       //console.log(token);
      
      if(token){
        
      const decodedToken = jwt.verify(token,"secretkey" );
     console.log(decodedToken);
     req.email=decodedToken.email;
     req.password=decodedToken.password;
     console.log(decodedToken.email);
     next();
     
      }
  }
    catch(err){
      res.send({
          Success: false,
          message: "catch",
          data: err.message
      })
    return;
    }
  
  }

  module.exports={getme};