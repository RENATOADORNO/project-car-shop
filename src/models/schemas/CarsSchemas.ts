import { Schema, model, Document } from 'mongoose';
import type { Car } from '../../interfaces/CarInterface';

export interface CarDoc extends Car, Document {}

const carSchema = new Schema<CarDoc>(
  {
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: Boolean,
    buyValue: {
      type: Number,
      required: true,
    },
    doorsQty: {
      type: Number,
      required: true,
    },
    seatsQty: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

export const carMongooseModel = model<CarDoc>('car', carSchema);
