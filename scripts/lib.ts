import axios from 'axios';
import {ProfileModel} from '../app/model';

const API_HOST = 'https://reqres.in/api/';
const PER_PAGE = 2;


export class ProfileDto {
  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  avatar!: string;
};

export const getProfiles = async function (): Promise<void> {
  const profiles = await fetchProfiles();
  await saveProfiles(profiles);
};

const fetchProfiles = async function (page?: number): Promise<ProfileDto[]> {
  const url = new URL(API_HOST + 'users');
  url.searchParams.set('per_page', PER_PAGE.toString());
  if(page) url.searchParams.set('page', page.toString());
  
  const res = await axios.get(url + '');
  const profiles = res.data.data;

  page = page || 1;
  if(res.data.total_pages > page){
    Array.prototype.push.apply(profiles, await fetchProfiles(page + 1));
  }

  return profiles;
};

const saveProfiles = async function(profiles: ProfileDto[]): Promise<void> {
  const res = await ProfileModel.bulkWrite(profiles
    .map((profile: ProfileDto) => ({
      updateOne: {
        filter: { id: profile.id },
        update: profile,
        upsert: true
      }})));

  // console.log(res, 'BULK RES');
  
  return ;
};
