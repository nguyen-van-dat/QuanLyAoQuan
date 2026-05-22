const Joi = require('joi');

const clothesJoiSchema_add = Joi.object({
    name: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    type: Joi.string().required(),
    season: Joi.string().required()
});

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = {
    clothesJoiSchema_add,
    createUserSchema,
    loginSchema
};