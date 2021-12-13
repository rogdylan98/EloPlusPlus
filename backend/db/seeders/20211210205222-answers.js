'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Answers', [
      {
        body: 'Sample Answer 1',
        userId: 1,
        questionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Sample Answer 2',
        userId: 2,
        questionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Sample Answer 3',
        userId: 2,
        questionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
