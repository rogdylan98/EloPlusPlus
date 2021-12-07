'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.hasMany(models.Answer, {
      foreignKey: 'questionId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Question.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Question;
};
