const {Auth} = require('../database');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.home = (req, res) => {
    Auth.findAll().then(logins => res.json(logins))
}



exports.postRegister = async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send({status: 400, message: error.details[0].message});

    //Существует ли такой email в базе
    const emailExist = await Auth.findOne({where: {login: req.body.login}});
    if (emailExist) return res.status(400).send('Login already exists');

    //Хеширование пароля
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);

    await Auth.create({
        login: req.body.login,
        password:hashPassword
    }).then(reqq => {
        res.send({message: 'Goood', res: reqq})
    })
        .catch(err => {
            res.sendStatus(400).send({message: err})
        })
}


exports.postLogin = async (req,res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send({status: 400, message: error.details[0].message});

    //Существует ли такой email в базе
    const user = await Auth.findOne({where: {login: req.body.login}});
    if (!user) return res.status(400).send('Login is wrong');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Создать токен
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({user,token});


}

exports.registEE = async (req, res) => {
     res.send('EEEEE')
}