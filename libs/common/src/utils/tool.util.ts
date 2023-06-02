import { Types } from 'mongoose';

export const MongoId = (id?: string): Types.ObjectId => new Types.ObjectId(id);

export const toJSON = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
