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
    await queryInterface.bulkInsert('Users', [
      {
        id: testUtils.user.mock2.id,
        fullName: testUtils.user.mock2.fullName,
        username: testUtils.user.mock2.username,
        email: testUtils.user.mock2.email,
        password: testUtils.user.mock2.hashedPassword,
        type: 'Client',
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
    await queryInterface.bulkDelete('Users', null, {});
  },
};
