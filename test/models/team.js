'use strict';

var validateName = {
  len:[20,150],
  notEmpty: true
}

module.exports = function (Sequelize) {
    return {
        model: {
          teamId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          name: { type: Sequelize.STRING(150), allowNull: false, unique: true , validate: validateName }
        },
        options:{
          freezeTableName: true
        }
    };
};
