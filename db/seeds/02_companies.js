const faker = require("faker");

const createFakeCompanies = () => ({
  user_id: 1,
  company_name: faker.company.companyName()
});
exports.seed = function(knex) {
  const fakeCompanies = [];
  const desiredCompanies = 7;
  for (let i = 0; i < desiredCompanies; i++) {
    fakeCompanies.push(createFakeCompanies());
  }
  // Inserts seed entries
  return knex("companies").insert(fakeCompanies);
};
