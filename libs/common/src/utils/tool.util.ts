import { Types } from 'mongoose';

export const MongoId = (id?: string): Types.ObjectId => new Types.ObjectId(id);
