const {Images} = require("../database");
const {User} = require('../database')
const jwt = require('jsonwebtoken')
exports.deleteUser = (req, res) => {
    const username = req.params.id;
    User.destroy({
        where: {
            id: username
        }
    }).then((user) => {
        res.json(user)
    });
}

exports.updatePost = (req, res) => {
    const id = req.params.id;
    User.update({name: req.body.name, age: req.body.age}, {
        where: {
            id: id
        }
    }).then(user => {
        res.json(user)
    })
}

exports.oneUser = async (req, res) => {
    const id = req.params.id;
    const expand = req.query.expand ? req.query.expand.substring(1, req.query.expand.length - 1).split(',') : '';

    const user = await User.findOne({
        where: {
            id: id
        },
        include: expand
    })
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
    res.header('auth-toekn', token).send({
        token,
        user
    })
}

exports.getUsers = async (req, res) => {
    const accessExpand = ['images', 'profile', 'ere']
    let queryExpand = req.query.expand && req.query.expand.substring(1, req.query.expand.length - 1).split(',');
    let expand = [];
    if (queryExpand !== undefined) {
        for (let queryExpandValues of Object.values(queryExpand)) {
            let filter = accessExpand.filter(value => value === queryExpandValues);
            if (filter.toString().length !== 0) {
                expand.push(filter.toString())
            }
        }
    }

    await User.findAll({
        // limit: 5,
        // offset: 0,
        include: expand
    }).then(users => res.json(users))
}

exports.postUser = (req, res) => {
    const username = req.body.name;
    const userage = req.body.age;
    User.create({
        name: username,
        age: userage
    }).then(users => res.json(users))
}