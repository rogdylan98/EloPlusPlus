'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      {
        body: 'What is a new top lane champion that I should learn?',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'Does anyone have good practice tips for rocket league?',
        userId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        body: 'How do I improve at chess?',
        userId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
