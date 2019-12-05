const {expect} = require('chai');
const {getProfiles} = require('../scripts/lib');


describe('Request', () => {
  it('getProfiles page 1', async function() {
    const profiles = await getProfiles();
    console.log(profiles, 'PROFILES');

    expect(profiles).to.be.an('array');
    expect(profiles[0]).to.have.keys([ "avatar", "email", "last_name", "first_name", "id"]);
  });
});
