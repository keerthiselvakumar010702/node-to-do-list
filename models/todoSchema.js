const joi=require("joi");

const todoSchema=joi.object({
    todo_id:joi.number().required,
    task:joi.string().required(),
    completed:joi.number()
})

module.exports={todoSchema}