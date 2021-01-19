const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const AuthModel = require('./models/auth');
const ImagesModel = require('./models/images');
const ProfileModel = require('./models/profile');
const BlogModel = require('./models/blog');
const sequelize = new Sequelize("usersdb", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

const User = UserModel(sequelize, Sequelize)
const Auth = AuthModel(sequelize, Sequelize)
const Images = ImagesModel(sequelize, Sequelize)
const Profile = ProfileModel(sequelize, Sequelize)
const Blog = BlogModel(sequelize, Sequelize)

User.hasMany(Images, {as: "images", foreignKey: 'usersId'})
User.hasMany(Profile, {as: "profile", foreignKey: 'usersId'})

Images.belongsTo(User, {as: "User", foreignKey: 'usersId'})
Profile.belongsTo(User, {as: "User", foreignKey: 'usersId'})



sequelize.sync()
    .then(() => {
        console.log(`Connected....`)
    })



module.exports = {
    User,
    Auth,
    Images,
    Profile,
    Blog,
}