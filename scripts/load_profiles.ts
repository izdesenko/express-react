import {getProfiles} from './lib';

getProfiles()
  .catch((err: any) => console.log('Error:: ', err))
  .then(() => process.exit());
