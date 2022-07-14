import { Model } from 'mongoose';
import GenericModel from './GenericModel';
import { CarDoc } from './schemas/CarsSchemas';

class CarModel extends GenericModel<CarDoc> {
  constructor(modelMongoose: Model<CarDoc>) {
    super(modelMongoose);
    this._model = modelMongoose;
  }
}

export default CarModel;