const {todoSchema}=require("../models/todoSchema")
const {userSchema}=require("../models/userSchema")

const validateTodo= (req,res,next)=>{
    const result=todoSchema.validate(req.body)
    if(result.error){
        console.log(result.error.details);
        res.send({
            message:"not validated",
            success : "false",
            data: result.error.details
        })
    }else{
        console.log(res.value);
        next();
    }
}

const validateUser= (req,res,next)=>{
    const result=userSchema.validate(req.body)
    if(result.error){
        console.log(result.error.details);
        res.send({
            message:"not validated",
            success : "false",
            data: result.error.details
        })
    }else{
        console.log(res.value);
        next();
    }
}
 module.exports = { validateTodo,validateUser };