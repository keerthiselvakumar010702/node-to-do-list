const errorHandler = require("../middleware/errorHandler");
const { queryExecuter }= require("../utils/connection")

const todocreate = async (req,res,next)=>{
    
        
        const todo_id=req.body.todo_id;
        const task=req.body.task;
        const completed=req.body.completed;
        const user_id=req.user_id;
        
        
       try{
        let sql="insert into todo(todo_id,task,completed,user_id,createdAt) Values (?,?,?,?,?)";
        let values=[todo_id,task,completed,user_id,NOW()];
        const [result] =await queryExecuter(sql,values);
        res.send({
            message : "todo values inserted",
            data:result
        });
       } catch(error){
        new errorHandler(401,false,error.message,{},res);
       }
    };
   

      const todoread = async(req,res)=>{
        try{
            let sql=`select * from todo where todo_id=?`;
            let values=req.params.todo_id;
            const [result] =await queryExecuter(sql,values);
            res.send({
                message : "todo values fetched",
                data:result
            });
           } catch(error){
            new errorHandler(401,false,error.message,{},res);
           }
        };
       
          const todoupdate = async (req,res,next)=>{
            try{
                
                const todo_id=req.body.todo_id;
                const task=req.body.task;
                const completed=req.body.completed;
                
                let sql=`update todo set todo_id=?,task=?,completed=? where todo_id=?`;
                let values=[todo_id,task,completed,req.params.todo_id];
                const [result] =await queryExecuter(sql,values);
            res.send({
                message : "todo values updated",
                data:result
            });
           } catch(error){
            new errorHandler(401,false,error.message,{},res);
           }
        };
                
         
           
              const tododelete = async (req,res)=>{
                try{
                    let sql=`delete from todo where todo_id=?`;
                    let values=req.params.todo_id;
                    const [result] =await queryExecuter(sql,values);
                    res.send({
                        message : "todo values deleted",
                        data:result
                    });
                   } catch(error){
                    new errorHandler(401,false,error.message,{},res);
                   }
                };
               
               

      module.exports={todocreate,todoread,todoupdate,tododelete};
