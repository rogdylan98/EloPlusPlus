'use strict';

const question = require("./question");

module.exports = (sequelize, DataTypes) => {
  const questionTopic = sequelize.define('questionTopic', {
    topicId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  questionTopic.associate = function(models) {
    // associations can be defined here
    questionTopic.belongsTo(models.Question, {
      foreignKey: 'questionId'
    })
    questionTopic.belongsTo(models.Topic, {
      foreignKey: 'topicId'
    })
  };
  return questionTopic;
};
