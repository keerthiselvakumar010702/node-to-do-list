const Joi = require('joi')

const userSchema = Joi.object({
    id:Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    phone:Joi.number().required(),
    username:Joi.string().min(4).required()
});

module.exports={userSchema};