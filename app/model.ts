import './db';
import {Document, Schema, Model, model} from "mongoose";


export const ProfileSchema = new Schema({
  id: Number,
  email: String,
  first_name: String,
  last_name: String,
  avatar: String
}, {timestamps: true});

ProfileSchema.index({id: 1}, {unique: 1});
ProfileSchema.index({email: 1}, {unique: 1});

ProfileSchema.statics.findByName = async function(name: string): Promise<IProfileDocument[]> {
  let query: {$or?: any[]} = {};
  if (name) {
    const qname = new RegExp(`^${name.toLowerCase()}`, 'i');
    query.$or = [{first_name: qname}, {last_name: qname}];
  }

  return await ProfileModel.find(query);
};

export interface IProfileDocument extends Document {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IProfileModel extends Model<IProfileDocument> {
  findByName(name: string): Promise<IProfileDocument[]>;
}

export const ProfileModel: IProfileModel = model<IProfileDocument, IProfileModel>("profile", ProfileSchema);
