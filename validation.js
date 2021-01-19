const Joi = require('@hapi/joi');


module.exports.registerValidation = (data) => {
    const schema = Joi.object({
        login: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
}

module.exports.loginValidation = (data) => {
    const schema = Joi.object({
        login: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
}
