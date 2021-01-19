module.exports = (sequelize, Sequelize) => {
    return sequelize.define("images", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        usersId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }

    });
}


