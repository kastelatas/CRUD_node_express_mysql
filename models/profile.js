module.exports = (sequelize, Sequelize) => {
    return sequelize.define("profile", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        usersId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }

    });
}


