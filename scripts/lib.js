const axios = require('axios');

const mongoose = require('mongoose');
const API_HOST = 'https://reqres.in/api/';
const PER_PAGE = 2;
const ProfileModel = require('../app/model');

const lib = module.exports = {
  getProfiles: async () => {
    const profiles = await lib.fetchProfiles();
    await lib.saveProfiles(profiles);
  },
  
	fetchProfiles: async page => {
		const url = new URL(API_HOST + 'users');
		url.searchParams.set('per_page', PER_PAGE);

		if(page) url.searchParams.set('page', page);
		const res = await axios.get(url + '');
		const profiles = res.data.data;

		page = page || 1;
		if(res.data.total_pages > page){
			Array.prototype.push.apply(profiles, await lib.fetchProfiles(page + 1));
		}

		return profiles;
	},

  saveProfiles: async profiles => {
    await mongoose.model('profile').insertMany(profiles);
  }
};
