import { isObject } from 'class-validator';
import { Types } from 'mongoose';

export const MongoId = (id?: string): Types.ObjectId => new Types.ObjectId(id);

export const toJSON = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const toRaw = (obj: { [x: string]: any }): any => {
  const raw: { [x: string]: string } = {};

  for (const [key, value] of Object.entries(obj)) {
    if (isObject(value)) raw[key] = JSON.stringify(value);
    else raw[key] = value;

    if (!raw[key]) delete raw[key];
  }

  return raw;
};
