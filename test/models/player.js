'use strict';

var validateName = {
  len:[20,150],
  notEmpty: true
}

module.exports = function(Sequelize) {
    return {
        model: {
          playerId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          name: { type: Sequelize.STRING(150), allowNull: false, unique: true , validate: validateName }
        },
        relations: [{
          relationType: 'belongsTo',
          relatedModel: 'team',
          options: { as: 'teamId', foreignKey: 'fk_player_team' }
        }],
        options:{
          freezeTableName: true
        }
    };
};
