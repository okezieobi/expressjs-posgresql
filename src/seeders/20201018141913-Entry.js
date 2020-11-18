import testUtils from '../tests/utils';

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Entries', [
      {
        id: testUtils.entry.mock.id,
        title: testUtils.entry.mock.title,
        body: testUtils.entry.mock.body,
        UserId: testUtils.user.mock2.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Entries', null, {});
  },
};
