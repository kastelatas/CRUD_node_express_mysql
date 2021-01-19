module.exports = (sequelize, Sequelize) => {
    return sequelize.define("blog", {
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
        content: {
            type: Sequelize.STRING,
            allowNull: true
        }

    },
        {
            freezeTableName: true,
            timestamps: false
        });
}